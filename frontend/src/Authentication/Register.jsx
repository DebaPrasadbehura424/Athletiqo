import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    weightNow: "",
    weightWant: "",
    heartIssue: "",
    isWorking: "",
  });

  const handleRegisterChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/userRegister", registrationData)
      .then((response) => {
        if (response.status === 201) {
          const token = response.data.token;
          cookies.set("token", token);
          Swal.fire({
            title: "Registration Successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/progress");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);

        Swal.fire({
          title: "Registration Failed!",
          text: error.response
            ? error.response.data.message
            : "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="register-container max-w-md w-full p-8 bg-white shadow-lg rounded-md">
        {step === 1 && (
          <div className="registration-form">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Register
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <input
                type="text"
                name="username"
                value={registrationData.username}
                onChange={handleRegisterChange}
                placeholder="Username"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={registrationData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                value={registrationData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600"
              >
                Next Step
              </button>
            </form>
            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-500 hover:underline">
                Already have an account? Login
              </a>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="registration-form">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Complete Registration
            </h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={registrationData.username}
                  onChange={handleRegisterChange}
                  placeholder="Username"
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegisterChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={registrationData.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              {/* Square form inputs for next step */}
              <input
                type="number"
                name="age"
                value={registrationData.age}
                onChange={handleRegisterChange}
                placeholder="Age"
                required
                className="w-full h-14 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="weightNow"
                value={registrationData.weightNow}
                onChange={handleRegisterChange}
                placeholder="Current Weight"
                required
                className="w-full h-14 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="weightWant"
                value={registrationData.weightWant}
                onChange={handleRegisterChange}
                placeholder="Desired Weight"
                required
                className="w-full h-14 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mb-4">
                <label className="block mb-2">Do you have a heart issue?</label>
                <div className="flex justify-start">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="heartIssue"
                      value="true"
                      onChange={handleRegisterChange}
                      required
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="heartIssue"
                      value="false"
                      onChange={handleRegisterChange}
                      required
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Are you a working person?</label>
                <div className="flex justify-start">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="isWorking"
                      value="true"
                      onChange={handleRegisterChange}
                      required
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isWorking"
                      value="false"
                      onChange={handleRegisterChange}
                      required
                    />
                    No
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
