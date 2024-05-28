import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('high');

    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const handleAddTask = () => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, priority })
        }).then(() => {
            setTitle('');
            setPriority('high');
            fetch('/api/tasks')
                .then(response => response.json())
                .then(data => setTasks(data));
        });
    };

    const handleDeleteTask = (id) => {
        fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            .then(() => {
                fetch('/api/tasks')
                    .then(response => response.json())
                    .then(data => setTasks(data));
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Task Prioritization
            </Typography>
            <TextField
                label="Task Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Priority"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                fullWidth
                margin="normal"
                select
                SelectProps={{
                    native: true,
                }}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task
            </Button>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id} divider>
                        <ListItemText primary={`${task.title} - ${task.priority}`} />
                        <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TasksPage;
