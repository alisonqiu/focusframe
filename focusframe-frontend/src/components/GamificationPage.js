import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const GamificationPage = () => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch('/api/points')
            .then(response => response.json())
            .then(data => setPoints(data.points));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gamification
            </Typography>
            <Typography variant="h6">
                Points: {points}
            </Typography>
        </Container>
    );
};

export default GamificationPage;
