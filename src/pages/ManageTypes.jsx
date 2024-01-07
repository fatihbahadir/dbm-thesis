import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useThesis from "../hooks/useThesis";
import AddTypeModal from "../components/AddTypeModal";
import TypeModal from "../components/TypeModal";
import { FaFileInvoice, FaPlusSquare } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageTypes = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const typeResponse = await axios.get("/api/v1/thesis-type", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        types: typeResponse.data.data,
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

  const closeTypeModal = () => {
    setSelectedType(null);
  };

  const openTypeModal = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    thesisParams.types.length < 1 && getAllParams();
  }, []);

  useEffect(() => {
    isChanged && getAllParams();
  }, [isChanged]);
  return (
    <div className="w-full h-full">
      {isModalOpen && (
        <AddTypeModal
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeModal}
        />
      )}
      {selectedType && (
        <TypeModal
          type={selectedType}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          closeModal={closeTypeModal}
        />
      )}
      {
      loading ? (
        <div className="w-screen h-screen ml-[-30px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {thesisParams?.types?.map((type) => (
            <div
              onClick={() => openTypeModal(type)}
              key={type.thesis_type_id}
              className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
            >
              <h2 className="tracking-wider font-bold">
                {type.thesis_type_name}
              </h2>
              <div className="bg-main rounded text-white p-5">
                <FaFileInvoice className="w-[2em] h-[2em]" />
              </div>
            </div>
          ))}
          <div
            onClick={openModal}
            className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
          >
            <h2 className="tracking-wider font-bold">Add New Type</h2>
            <div className="bg-main rounded text-white p-5">
              <FaPlusSquare className="w-[2em] h-[2em]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTypes;
