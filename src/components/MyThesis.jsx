import React, { useEffect, useState } from "react";
import {
  FaQuestion,
  FaQuestionCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const MyThesis = () => {
    const { auth } = useAuth();
    const [thesesLength, setThesesLength] = useState();
    useEffect(()=>{
        axios.get('/api/v1/thesis/my', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).
        then((res)=>{
          setThesesLength(res.data.data.length)
          })
        .catch(err=>console.log(err)) 
}, [])

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #6777ef, #95a0f4)",
      }}
      className="w-full relative h-full bg-white rounded shadow overflow-hidden flex flex-col   px-24 justify-center"
    >
      <div className="absolute float-right text-[#8c98f3] -top-6 -right-6 z-[2]">
        <FaRegQuestionCircle className="w-64 h-64" />
      </div>
      <div className="z-[3]">
        <h4 className="text-[4rem] text-white">{thesesLength}</h4>
        <p className="text-white text-xl">
          Theses you have, {" "}
          <Link className="text-white text-xl hover:text-mainHover transition-all" href="">
            add new one
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default MyThesis;
