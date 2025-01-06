import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ChatInterface from "./components/ChatInterface";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId"); 
        
        if (token) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
        console.log(token);
        if (userId && token) {
            axios
                .get(`http://localhost:5000/api/chat/history/${userId}`)
                .then((response) => {
                    setChatHistory(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching chat history:", error);
                });
        }
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/chat"
                    element={
                        isUserLoggedIn ? (
                            <ChatInterface chatHistory={chatHistory} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
