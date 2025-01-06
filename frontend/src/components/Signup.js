import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post("https://chatbot-main-60na.onrender.com/api/auth/signup", {
        username,
        password,
      });
      setSuccess(response.data.message || "Signup successful!");
      setFormData({ username: "", password: "", confirmPassword: "" });
  
      if (response.data.message === "User created successfully" || response.data.message === "Signup successful!") {
        // Automatically log the user in by saving the user data to localStorage
        localStorage.setItem("userId", response.data.userId);
        // Assuming the backend returns a token upon signup (you may need to adjust this)
        localStorage.setItem("authToken", response.data.token); 
  
        // Redirect to home page
        navigate("/"); // Redirecting to the home page
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };
  


  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Create an account
          </h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Signup
            </button>
          </form>
          <p className="text-sm font-light text-gray-500 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
