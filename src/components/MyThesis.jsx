import React, { useEffect, useState } from "react";
import {
  FaQuestion,
  FaQuestionCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useThesis from '../hooks/useThesis';
import LoadingSpinner from "./LoadingSpinner";

const MyThesis = () => {
    const { auth } = useAuth();
    const {myThesis ,setMyThesis} = useThesis();
    const [thesesLength, setThesesLength] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        axios.get('/api/v1/thesis/my', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).
        then((res)=>{
          setThesesLength(res.data.data.length)
          setMyThesis(res.data.data)
          setLoading(false);
          })
        .catch(err=>{
          setLoading(false);
          console.log(err)
        }) 
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
      {
        loading ? <div className="w-full min-h-[376px] flex items-center justify-center z-[50]">
          <LoadingSpinner/>
          </div>
          :
          <div className="z-[3]">
          <h4 className="text-[4rem] text-white">{thesesLength}</h4>
          <p className="text-white text-xl">
            Thes{thesesLength > 1 ? 'e' : 'i'}s you have, {" "}
            <Link to={'/add-thesis'} className="text-white text-xl hover:text-mainHover transition-all">
              add new one
            </Link>{" "}
          </p>
        </div>
      }

    </div>
  );
};

export default MyThesis;
