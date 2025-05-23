import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import registerhere from "../images/registers.jpg";
import axios from "axios";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const navigate = useNavigate();
  // const url = "http://localhost:5000";
  const url = "https://athletiqo-backend.vercel.app";

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://athletiqo-backend.vercel.app/user/userRegister`,
        formData
      );

      Swal.fire({
        title: "Registration Successful!",
        text: "You have been successfully registered.",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        const token = response.data.token;
        const userId = response.data.id;
        const goalId = response.data.goalId;
        const planId = response.data.planId;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("goalId", goalId);
        sessionStorage.setItem("planId", planId);
        localStorage.setItem("token", token);
        navigate("/progress");
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      Swal.fire({
        title: "Registration Failed!",
        text: "There was an error during registration. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden  md:flex items-end px-4 min-h-screen pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gradient-to-t from-green-500 to-blue-500 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            {/* <img
              className="object-cover w-full h-full"
              src={registerhere}
              alt="Background"
            /> */}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative text-white text-center">
            <h3 className="text-4xl font-bold">Join the Fitness Journey</h3>
            <p className="mt-4 text-xl">
              Whether it's yoga, strength training, or wellness, start your
              journey today.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <form onSubmit={handleSubmit} className="mt-8 p-4">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <AiOutlineUser className="absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <AiOutlineMail className="absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email to get started"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <AiOutlineLock className="absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-25 py-3 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
