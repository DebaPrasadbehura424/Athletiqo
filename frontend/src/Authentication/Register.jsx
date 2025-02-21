import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import registerhere from "../images/registers.jpg";
import axios from "axios";
import Cookies from "universal-cookie";

const SignUpPage = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  // Step State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentWeight: "",
    targetWeight: "",
    sleepGoal: "",
    readingGoal: "",
    waterGoal: "",
    age: "",
    isWorkingPerson: false,
    hasHeartIssue: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/userRegister",
        formData
      );

      Swal.fire({
        title: "Registration Successful!",
        text: "You have been successfully registered.",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        const token = response.data.token;
        cookies.set("token", token);
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
            <img
              className="object-cover w-full h-full"
              src={registerhere}
              alt="Background"
            />
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
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              {currentStep === 1
                ? "Sign up to start your wellness journey"
                : currentStep === 2
                ? "Set your fitness goals"
                : "Review and submit"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 p-4">
              <div className="space-y-5">
                {currentStep === 1 && (
                  <>
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

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Confirm Password
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <AiOutlineLock className="absolute inset-y-0 left-0 flex items-center pl-3" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Current Weight
                      </label>
                      <input
                        type="number"
                        name="currentWeight"
                        value={formData.currentWeight}
                        onChange={handleChange}
                        placeholder="Enter your current weight"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Target Weight
                      </label>
                      <input
                        type="number"
                        name="targetWeight"
                        value={formData.targetWeight}
                        onChange={handleChange}
                        placeholder="Enter your target weight"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Sleep Goal (hours)
                      </label>
                      <input
                        type="number"
                        name="sleepGoal"
                        value={formData.sleepGoal}
                        onChange={handleChange}
                        placeholder="Enter your sleep goal"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Reading Goal (hours)
                      </label>
                      <input
                        type="number"
                        name="readingGoal"
                        value={formData.readingGoal}
                        onChange={handleChange}
                        placeholder="Enter your reading goal"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Water Goal (glasses)
                      </label>
                      <input
                        type="number"
                        name="waterGoal"
                        value={formData.waterGoal}
                        onChange={handleChange}
                        placeholder="Enter your water goal"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-base font-medium text-gray-900">
                        age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-25 py-3 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-25 py-3 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>

              {currentStep < 3 && (
                <div className="flex items-center justify-evenly ">
                  {currentStep !== 1 && (
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-25 py-3 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Back
                      </button>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center py-3 px-3 text-white bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-md hover:opacity-80"
                    >
                      <BsFillArrowRightCircleFill className="mr-2" />
                      Next Step
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
