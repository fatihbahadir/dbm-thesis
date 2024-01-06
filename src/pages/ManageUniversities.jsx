import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useThesis from "../hooks/useThesis";
import AddUniversityModal from "../components/AddUniversityModal";
import UniversityModal from "../components/UniversityModal";
import { FaSchool, FaPlusSquare } from "react-icons/fa";

const ManageUniversities = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const universityResponse = await axios.get("/api/v1/university", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(universityResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        universities: universityResponse.data.data,
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

  const closeUniversityModal = () => {
    setSelectedUniversity(null);
  };

  const openUniversityModal = (university) => {
    setSelectedUniversity(university);
  };

  useEffect(() => {
    thesisParams.universities.length < 1 && getAllParams();
  }, []);

  return (
    <div className="w-full h-full">
      {isModalOpen && (
        <AddUniversityModal
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeModal}
        />
      )}
      {selectedUniversity && (
        <UniversityModal
          university={selectedUniversity}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeUniversityModal}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {thesisParams?.universities?.map((university) => (
          <div
            onClick={() => openUniversityModal(university)}
            key={university.university_id}
            className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
          >
            <h2 className="tracking-wider font-bold">
              {university.university_name}
            </h2>
            <div className="bg-main rounded text-white p-5">
              <FaSchool className="w-[2em] h-[2em]" />
            </div>
          </div>
        ))}
        <div
          onClick={openModal}
          className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
        >
          <h2 className="tracking-wider font-bold">Add New University</h2>
          <div className="bg-main rounded text-white p-5">
            <FaPlusSquare className="w-[2em] h-[2em]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUniversities;
