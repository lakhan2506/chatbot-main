import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ChatInterface from "./components/ChatInterface";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (userId && token) {
            axios
                .get(`https://chatbot-main-60na.onrender.com/api/chat/history/${userId}`)
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
                        <ProtectedRoute>
                            <ChatInterface chatHistory={chatHistory} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
