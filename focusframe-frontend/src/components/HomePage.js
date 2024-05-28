import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const HomePage = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                FocusFrame
            </Typography>
            <List>
                <ListItem>
                    <Link href="/tasks">
                        <ListItemText primary="Task Prioritization" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/gamification">
                        <ListItemText primary="Gamification" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/mood">
                        <ListItemText primary="Mood Tracking" />
                    </Link>
                </ListItem>
            </List>
        </Container>
    );
};

export default HomePage;
