import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const MoodPage = () => {
    const [moods, setMoods] = useState([]);
    const [mood, setMood] = useState('');

    useEffect(() => {
        fetch('/api/mood')
            .then(response => response.json())
            .then(data => setMoods(data));
    }, []);

    const handleAddMood = () => {
        fetch('/api/mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mood })
        }).then(() => {
            setMood('');
            fetch('/api/mood')
                .then(response => response.json())
                .then(data => setMoods(data));
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mood Tracking
            </Typography>
            <TextField
                label="Your Mood"
                value={mood}
                onChange={e => setMood(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddMood}>
                Log Mood
            </Button>
            <List>
                {moods.map(m => (
                    <ListItem key={m.id} divider>
                        <ListItemText primary={`${m.mood} - ${new Date(m.timestamp).toLocaleString()}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default MoodPage;
