import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TasksPage from './components/TasksPage';
import GamificationPage from './components/GamificationPage';
import MoodPage from './components/MoodPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/gamification" element={<GamificationPage />} />
                <Route path="/mood" element={<MoodPage />} />
            </Routes>
        </Router>
    );
};

export default App;
