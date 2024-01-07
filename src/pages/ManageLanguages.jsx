import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useThesis from "../hooks/useThesis";
import AddLanguageModal from "../components/AddLanguageModal";
import LanguageModal from "../components/LanguageModal";
import { FaLanguage, FaPlusSquare } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
const ManageLanguages = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const languageResponse = await axios.get("/api/v1/thesis-language", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        languages: languageResponse.data.data,
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

  const closeLanguageModal = () => {
    setSelectedLanguage(null);
  };

  const openLanguageModal = (lang) => {
    setSelectedLanguage(lang);
  };

  useEffect(() => {
    thesisParams.languages.length < 1 && getAllParams();
  }, []);

  useEffect(() => {
    isChanged && getAllParams();
  }, [isChanged]);

  return (
    <div className="w-full h-full">
      {isModalOpen && (
        <AddLanguageModal
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeModal}
        />
      )}
      {selectedLanguage && (
        <LanguageModal
          language={selectedLanguage}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeLanguageModal}
        />
      )}

      {
        loading ? 
        <div className="w-screen h-screen ml-[-30px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
      :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {thesisParams?.languages?.map((lang) => (
        <div
          onClick={() => openLanguageModal(lang)}
          key={lang.thesis_language_id}
          className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
        >
          <h2 className="tracking-wider font-bold">
            {lang.thesis_language}
          </h2>
          <div className="bg-main rounded text-white p-5">
            <FaLanguage className="w-[2em] h-[2em]" />
          </div>
        </div>
      ))}
      <div
        onClick={openModal}
        className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
      >
        <h2 className="tracking-wider font-bold">Add New Language</h2>
        <div className="bg-main rounded text-white p-5">
          <FaPlusSquare className="w-[2em] h-[2em]" />
        </div>
      </div>
    </div>
      }

    
    </div>
  );
};

export default ManageLanguages;
