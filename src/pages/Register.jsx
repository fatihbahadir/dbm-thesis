import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center overflow-x-hidden">
      <div className="flex flex-col gap-6 items-center justify-center pt-20 pb-12">
        <div className="w-28 h-28 shadow-xl rounded-full flex items-center justify-center mb-6">
          <img className="w-full h-full object-contain" src={Logo} />
        </div>

        <div className="bg-white shadow border-t-2 border-main rounded flex flex-col px-2  w-[310px] sm:w-auto">
          <div className="p-5 border-b border-[#f9f9f9]">
            <h3 className="font-bold text-grayUpdated">Register</h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1">
                <label for="firstName" className="text-sm font-semibold">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label for="lastName" className="text-sm font-semibold">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label for="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1 w-full">
                <label for="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label for="birthYear" className="text-sm font-semibold">
                  Birth Year
                </label>
                <input
                  id="birthYear"
                  type="number"
                  min="1900"
                  max="2024"
                  step="1"
                  value="2002"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1 w-full">
                <label for="gender" className="text-sm font-semibold">
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label for="profession" className="text-sm font-semibold">
                  Profession
                </label>
                <select
                  id="profession"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                >
                  <option value="2">Student</option>
                  <option value="3">Professor</option>
                  <option value="4">Researcher</option>
                  <option value="5">Tutor</option>
                  <option value="6">Teaching Assistant</option>
                  <option value="7">Specialist</option>
                  <option value="1">Other</option>           
                </select>
              </div>
            </div>
          </div>
          <div className="p-5">
          <button style={{boxShadow: '0 2px 6px #acb5f6'}} className="w-full font-semibold bg-main text-white hover:bg-mainHover transition py-2 text-sm rounded">
            Register
          </button>
        </div>
        </div>

        <div className="text-sm">
          <p className="text-[#9AA8AF]">
            You already have an account?{" "}
            <Link
              to={"/login"}
              className="text-main cursor-pointer hover:text-mainHover"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
