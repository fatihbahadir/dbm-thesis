import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "../api/axios";

const AddLanguageModal = ({ closeModal, isChanged, setIsChanged }) => {
  const modalRef = useRef(null);
  const { auth } = useAuth();
  const [language, setLanguage] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(()=>{
    setIsChanged(false);
  }, [])
  const saveLanguage = async () => {
    if (language.length < 3) {
      setDisabled(true);
      toast.error("Language name should be bigger than 3 letters.", {
        autoClose: 3000,
      });
      setTimeout(() => {
        setDisabled(false);
      }, 3500);
      return;
    }
  
    axios
      .post(
        "/api/v1/manager/thesis-language",
        {
          language_name: language,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        closeModal();
        setIsChanged(true);
        toast.success("Language saved successfully !!");
      })
      .catch((err) => {
        console.log(err);
        closeModal();
        setIsChanged(true);
        toast.error("An error occurred...");
      });
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(modalRef);


  return (
    <div className="fixed z-[900] top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 px-2">
    <div
      ref={modalRef}
      className="bg-white rounded-lg p-8 max-w-[600px] text-sm"
    >
      <h2 className="text-lg font-bold border-b tailwind-auto-border border-main transition cursor-pointer">
        Add New Language
      </h2>
      <div className="mt-5 flex flex-col md:flex-row gap-2 md:gap-16 justify-center md:items-center ">
              <label className='font-semibold'>Name: </label>
              <input type='text' disabled={disabled} value={language} onChange={(e)=>{setLanguage(e.target.value)}} className='border bg-[#fdfdff] border-[#e4e6fc] transition-all rounded w-[300px] outline-none focus:border-main px-3 py-2' />
          </div>

          <div className='w-full mt-5 text-right'>
              <button disabled={disabled} onClick={saveLanguage} className='py-1 disabled:bg-gray-400 px-6 bg-main hover:bg-mainHover transition text-white rounded'>
                  Save
              </button>
          </div>
    </div>
  </div>
  )
}

export default AddLanguageModal
