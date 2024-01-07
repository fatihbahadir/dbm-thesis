import React, { useEffect, useState } from "react";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import axios from "../api/axios";
import { toast } from "react-toastify";

const TypeModal = ({ type, closeModal, isChanged, setIsChanged }) => {
  const modalRef = useRef(null);
  const { auth } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const [typeInput, setTypeInput] = useState(type.thesis_type_name);
  const [descriptionInput, setDescriptionInput] = useState(
    type.thesis_type_description
  );

  useEffect(() => {
    setIsChanged(false);
  }, []);
  
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

  const handleDelete = () => {
    axios
      .delete(`/api/v1/manager/thesis-type/${type.thesis_type_id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Thesis type deleted successfully!");
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error("A problem occured !");
        setIsChanged(true);
      });
  };

  const handleUpdate = () => {
    if (typeInput.length < 3) {
      setDisabled(true);
      toast.error("Thesis type name should be bigger than 3 letters.", {
        autoClose: 3000,
      });
      setTimeout(() => {
        setDisabled(false);
      }, 3500);
      return;
    }
    if (descriptionInput.length < 20) {
      setDisabled(true);
      toast.error("Thesis type description should be bigger than 20 letters.", {
        autoClose: 3000,
      });
      setTimeout(() => {
        setDisabled(false);
      }, 3500);
      return;
    }
    axios
      .put(
        `/api/v1/manager/thesis-type/${type.thesis_type_id}`,
        {
          type_name: typeInput,
          type_description: descriptionInput,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        closeModal();
        setIsChanged(true);
        toast.success("Thesis type edited successfully !!");
      })
      .catch((err) => {
        console.log(err);
        closeModal();
        setIsChanged(true);
        toast.error("An error occurred...");
      });
  };

  useOutsideAlerter(modalRef);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[800] bg-black bg-opacity-50 px-2">
      <div ref={modalRef} className="bg-white rounded-lg p-8 ">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold border-b tailwind-auto-border border-main transition">
            Edit Thesis Type
          </h2>
          <FaEdit
            onClick={() => setDisabled(!disabled)}
            className=" cursor-pointer text-main w-[1.7em] h-[1.7em] hover:text-mainHover hover:scale-110 transition"
          />
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-2 md:gap-16 justify-center md:items-center ">
          <label className="font-semibold text-sm">Type Name: </label>
          <input
            type="text"
            disabled={disabled}
            value={typeInput}
            onChange={(e) => {
              setTypeInput(e.target.value);
            }}
            className="border disabled:opacity-60 text-sm  bg-[#fdfdff] border-[#e4e6fc] transition-all rounded w-[300px] outline-none focus:border-main px-3 py-2"
          />
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-2 md:gap-16 justify-center md:items-center ">
          <label className="font-semibold text-sm">Description: </label>
          <textarea
            disabled={disabled}
            value={descriptionInput}
            onChange={(e) => {
              setDescriptionInput(e.target.value);
            }}
            className="border resize-none text-sm disabled:opacity-60 bg-[#fdfdff] border-[#e4e6fc] transition-all rounded w-[300px] outline-none focus:border-main px-3 py-2"
          />
        </div>

        <div className="w-full mt-5 flex justify-end items-center gap-3">
          <button
            onClick={handleDelete}
            className="py-1 px-6 bg-[#fc544b] text-sm hover:bg-[#fb160a] transition text-white rounded"
          >
            Delete
          </button>
          <button
            disabled={disabled}
            onClick={handleUpdate}
            className="py-1 disabled:bg-gray-400 text-sm px-6 bg-main hover:bg-mainHover transition text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeModal;
