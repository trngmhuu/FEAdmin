import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../views/loginPage/LoginPage';
import HomePage from '../views/HomePage/HomePage';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;