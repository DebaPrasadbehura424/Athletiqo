import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill in both fields",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/userLogin",
        { email, password }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to your account.",
        }).then(() => {
          const token = response.data.token;
          cookies.set("token", token);
          navigate("/progress");
        });
      }
    } catch (err) {
      setError("Invalid email or password");
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
      });
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md font-semibold transition duration-300 hover:bg-green-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="ml-3 w-full bg-gray-300 text-white py-3 rounded-md font-semibold transition duration-300 hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-green-500 font-semibold hover:text-green-600"
          >
            Create one here
          </NavLink>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <NavLink
            to="/forgot-password"
            className="text-green-500 font-semibold hover:text-green-600"
          >
            Forgot Password?
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
