import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken)
        if (authToken) {
            navigate("/chat"); 
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to the E-commerce Sales Chatbot</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Our chatbot helps you find the best products and answers your queries with ease. Click the button below to start chatting!
            </p>
            <button
                onClick={handleNavigate}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
                Start Chat
            </button>
        </div>
    );
};

export default Home;
