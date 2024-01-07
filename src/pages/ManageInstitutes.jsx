import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useThesis from "../hooks/useThesis";
import AddInstitueModal from "../components/AddInstituteModal";
import InstituteModal from "../components/InstituteModal";
import { FaPencilRuler, FaPlusSquare } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageInstitutes = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedInstitute, setSelecetedInstitute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const instituteResponse = await axios.get("/api/v1/institute", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        institutes: instituteResponse.data.data,
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeInstituteModal = () => {
    setSelecetedInstitute(null);
  };

  const openInstituteModal = (institute) => {
    setSelecetedInstitute(institute);
  };

  useEffect(() => {
    thesisParams.institutes.length < 1 && getAllParams();
  }, []);

  useEffect(() => {
    isChanged && getAllParams();
  }, [isChanged]);

  return (
    <div className="w-full h-full">
    {isModalOpen && (
      <AddInstitueModal
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeModal}
      />
    )}
    {selectedInstitute && (
      <InstituteModal
        institute={selectedInstitute}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeInstituteModal}
      />
    )}

    {
      loading ? 
      <div className="w-screen h-screen ml-[-30px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
    :
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {thesisParams?.institutes?.map((institute) => (
        <div
          onClick={() => openInstituteModal(institute)}
          key={institute.institute_id}
          className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
        >
          <h2 className="tracking-wider font-bold">
            {institute.institute_name}
          </h2>
          <div className="bg-main rounded text-white p-5">
            <FaPencilRuler className="w-[2em] h-[2em]" />
          </div>
        </div>
      ))}
      <div
        onClick={openModal}
        className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
      >
        <h2 className="tracking-wider font-bold">Add New Institute</h2>
        <div className="bg-main rounded text-white p-5">
          <FaPlusSquare className="w-[2em] h-[2em]" />
        </div>
      </div>
    </div>
    }


  </div>
  )
}

export default ManageInstitutes
