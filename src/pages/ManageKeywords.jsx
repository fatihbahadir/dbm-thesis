import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useThesis from "../hooks/useThesis";
import AddKeywordModal from "../components/AddKeywordModal";
import KeywordModal from "../components/KeywordModal";
import { FaKey, FaPlusSquare } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageKeywords = () => {
  const [loading, setLoading] = useState();
  const { auth, setAuth } = useAuth();
  const { thesisParams, setThesisParams } = useThesis();
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();

  const getAllParams = async () => {
    try {
      setLoading(true);
      const keywordResponse = await axios.get("/api/v1/related-keyword", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        keywords: keywordResponse.data.data,
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

  const closeKeywordModal = () => {
    setSelectedKeyword(null);
  };

  const openKeywordModal = (keyword) => {
    setSelectedKeyword(keyword);
  };

  useEffect(() => {
    thesisParams.keywords.length < 1 && getAllParams();
  }, []);

  useEffect(() => {
    isChanged && getAllParams();
  }, [isChanged]);

  return (
    <div className="w-full h-full">
    {isModalOpen && (
      <AddKeywordModal
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeModal}
      />
    )}
    {selectedKeyword && (
      <KeywordModal
        keyword={selectedKeyword}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        closeModal={closeKeywordModal}
      />
    )}


{
      loading ? 
      <div className="w-screen h-screen ml-[-30px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
    :
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {thesisParams?.keywords?.map((keyword) => (
      <div
        onClick={() => openKeywordModal(keyword)}
        key={keyword.keyword_id}
        className="bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center"
      >
        <h2 className="tracking-wider font-bold">
          {keyword.related_keyword}
        </h2>
        <div className="bg-main rounded text-white p-5">
          <FaKey className="w-[2em] h-[2em]" />
        </div>
      </div>
    ))}
    <div
      onClick={openModal}
      className="bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer"
    >
      <h2 className="tracking-wider font-bold">Add New Keyword</h2>
      <div className="bg-main rounded text-white p-5">
        <FaPlusSquare className="w-[2em] h-[2em]" />
      </div>
    </div>
  </div>
}
 
  </div>
  )
}

export default ManageKeywords
