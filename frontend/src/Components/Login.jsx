/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosInstance";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/students/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login successfull", response.data);

      const token = response.data.token;
      const id = response.data.id;
      const role = response.data.role;
    //   const username = response.data.username;
      
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    //   localStorage.setItem('username', username);
      console.log("token: ", token);

      //cookie approach

      /*
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=").map(c => c.trim());
        acc[name] = value;
        return acc;
      }, {});
  
      if (cookies.token) {
        localStorage.setItem("cookieToken", cookies.token);
        console.log("Token stored in local storage from cookie: ", cookies.token);
      }*/

      navigate("/");
    } catch (error) {
      console.log("Error Logging in", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm">email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-950 rounded-md hover:bg-indigo-800 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
