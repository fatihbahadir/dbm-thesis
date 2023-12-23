import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const REGISTER_URL = '/api/v1/auth/register';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birth_year: 2002,
    gender: 'MALE',
    profession_id: 1
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!registerForm.firstname) {
      toast.error('Firstname can not be empty!')
      setLoading(false);
      return;
    }

    if(!registerForm.lastname) {
      toast.error('Lastname can not be empty!')
      setLoading(false);
      return;
    }

    if(!registerForm.password) {
      toast.error('Password can not be empty!')
      setLoading(false);
      return;
    }

    if (!emailRegex.test(registerForm.email)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }
    if (!registerForm.birth_year) {
      toast.error("Birth Year can not be empty!");
      setLoading(false);
      return;
    }
    if (!registerForm.gender) {
      toast.error("Please select a gender!");
      setLoading(false);
      return;
    }

    if (!registerForm.profession_id) {
      toast.error("Please select a Profession!");
      setLoading(false);
      return;
    }

    setRegisterForm({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      birth_year: 2002,
      gender: 'MALE',
      profession_id: 1
    })

    await axios.post(REGISTER_URL, {
      firstname: registerForm.firstname,
      lastname: registerForm.lastname,
      email: registerForm.email,
      password: registerForm.password,
      birth_year: parseInt(registerForm.birth_year),
      gender: registerForm.gender,
      profession_id: parseInt(registerForm.profession_id)
    }).then((res)=>{
      toast.success('Registered succesfully')
      setTimeout(()=>{
        navigate('/login')
      }, 5000)
    }).catch((err)=> {
      toast.error('An error occured please try again')
    })
  }
  
  useEffect(()=>{
    console.log(registerForm);
  }, [registerForm])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

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
                <label htmlFor="firstname" className="text-sm font-semibold">
                  First Name
                </label>
                <input
                  name="firstname"
                  id="firstname"
                  value={registerForm.firstname}
                  onChange={handleInputChange}
                  type="text"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastname" className="text-sm font-semibold">
                  Last Name
                </label>
                <input
                  name="lastname"
                  id="lastname"
                  value={registerForm.lastname}
                  onChange={handleInputChange}
                  type="text"
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleInputChange}
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={registerForm.password}
                  onChange={handleInputChange}
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="birth_year" className="text-sm font-semibold">
                  Birth Year
                </label>
                <input
                  name="birth_year"
                  id="birth_year"
                  type="number"
                  min="1900"
                  max="2024"
                  step="1"
                  value={registerForm.birth_year}
                  onChange={handleInputChange}
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="gender" className="text-sm font-semibold">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleInputChange}
                  className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="profession" className="text-sm font-semibold">
                  Profession
                </label>
                <select
                  name="profession_id"
                  value={registerForm.profession_id}
                  onChange={handleInputChange}
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
          <button onClick={handleRegister} style={{boxShadow: '0 2px 6px #acb5f6'}} className="w-full font-semibold bg-main text-white hover:bg-mainHover transition py-2 text-sm rounded">
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
