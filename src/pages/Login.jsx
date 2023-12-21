import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import axios from "../api/axios";

const LOGIN_URL = "/api/v1/auth/authenticate";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [loading, setLoading] = useState();
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!emailRegex.test(user)){
      toast.error('Please enter a valid email!')
      setLoading(false);
      return;
    }
    if(pwd.trim() === ""){
      toast.error('Please enter a password!')
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: user,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access_token;
      setAuth({ user, accessToken });
      console.log('auth', auth)
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Username or password is wrong");
      resetUser()
      setPwd('');
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center pb-12">
        <div className="w-28 h-28 shadow-xl rounded-full flex items-center justify-center mb-6">
          <img className="w-full h-full object-contain" src={Logo} />
        </div>
        <div className="bg-white shadow border-t-2 border-main rounded flex flex-col px-2 w-[300px] sm:w-[330px]">
          <div className="p-5 border-b border-[#f9f9f9]">
            <h3 className="font-bold text-grayUpdated">Login</h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...userAttribs}
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
          </div>

          <div className="p-5">
            <button
              onClick={handleLogin}
              style={{ boxShadow: "0 2px 6px #acb5f6" }}
              disabled={loading}
              className="disabled:bg-gray-300 w-full font-semibold bg-main text-white hover:bg-mainHover transition py-2 text-sm rounded"
            >
              {loading ? 'Loading ...' : 'Login'}
            </button>
          </div>

        </div>

        <div className="text-sm">
          <p className="text-[#9AA8AF]">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-main cursor-pointer hover:text-mainHover"
            >
              {" "}
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
