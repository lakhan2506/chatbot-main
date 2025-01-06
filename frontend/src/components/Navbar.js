import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const navLinks = (
        <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            {/* Home Link */}
            <li className="p-2 font-semibold text-blue-gray-800">
                <Link to="/" className="hover:text-blue-500">
                    Home
                </Link>
            </li>
            
            {/* For Non-Logged In Users (Login and Signup) */}
            {!isLoggedIn ? (
                <>
                    <li className="p-2 font-medium text-blue-gray-700">
                        <Link to="/login" className="hover:text-blue-600 transition duration-300">
                            Login
                        </Link>
                    </li>
                    <li className="p-2 font-medium text-blue-gray-700">
                        <Link to="/signup" className="hover:text-blue-600 transition duration-300">
                            Signup
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    {/* For Logged In Users (Chat and Logout) */}
                    <li className="p-2 font-medium text-blue-gray-700">
                        <Link to="/chat" className="hover:text-green-500 transition duration-300">
                            Chat
                        </Link>
                    </li>
                    <li className="p-2 font-medium text-red-600">
                        <button
                            onClick={handleLogout}
                            className="bg-none hover:text-red-700 transition duration-300 focus:outline-none"
                        >
                            Logout
                        </button>
                    </li>
                </>
            )}
        </ul>
    );

    return (
        <nav className="sticky top-0 z-10 bg-white shadow-md w-full px-4 py-4 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                {/* Logo / Title */}
                <h1 className="text-xl font-medium text-blue-gray-800">
                    E-commerce Sales Chatbot
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-blue-gray-800 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="mt-4 lg:hidden">
                    <div className="flex flex-col gap-2">{navLinks}</div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
