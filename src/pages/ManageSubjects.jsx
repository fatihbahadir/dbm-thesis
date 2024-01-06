import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useThesis from "../hooks/useThesis";
import AddSubjectModal from "../components/AddSubjectModal";
import SubjectModal from "../components/SubjectModal";
import { FaBook, FaPlusSquare } from "react-icons/fa";

const ManageSubjects = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const subjectResponse = await axios.get("/api/v1/subject", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(subjectResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        subjects: subjectResponse.data.data,
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

  const closeSubjectModal = () => {
    setSelectedSubject(null);
  };

  const openSubjectModal = (subject) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    thesisParams.subjects.length < 1 && getAllParams();
  }, []);

  
  return (
    <div className="w-full h-full">
    {isModalOpen && (
      <AddSubjectModal
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeModal}
      />
    )}
    {selectedSubject && (
      <SubjectModal
        subject={selectedSubject}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeSubjectModal}
      />
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {thesisParams?.subjects?.map((subject) => (
        <div
          onClick={() => openSubjectModal(subject)}
          key={subject.subject_id}
          className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
        >
          <h2 className="tracking-wider font-bold">
            {subject.subject_name}
          </h2>
          <div className="bg-main rounded text-white p-5">
            <FaBook className="w-[2em] h-[2em]" />
          </div>
        </div>
      ))}
      <div
        onClick={openModal}
        className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
      >
        <h2 className="tracking-wider font-bold">Add New Subject</h2>
        <div className="bg-main rounded text-white p-5">
          <FaPlusSquare className="w-[2em] h-[2em]" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ManageSubjects
