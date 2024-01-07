import React, { useEffect, useRef, useState } from "react";
import useThesis from "../hooks/useThesis";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { FaMinus, FaMinusCircle, FaPlus, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ThesisModal = ({ thesis, closeModal, isChanged, setIsChanged }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState();
  const { thesisParams, setThesisParams } = useThesis();
  const { auth } = useAuth();
  const [isModalChanged, setIsModalChanged] = useState();
  const navigate = useNavigate();

  const relatedKeywords = thesis.related_keywords.map(
    (related) => related.keyword_id
  );

  const subjects = thesis.subjects.map((subject) => subject.subject_id);

  const relatedInThesis = thesisParams.keywords.filter((keyword) =>
    relatedKeywords.includes(keyword.keyword_id)
  );

  const notRelatedInThesis = thesisParams.keywords.filter(
    (keyword) => !relatedKeywords.includes(keyword.keyword_id)
  );

  const relatedSubjectInThesis = thesisParams.subjects.filter((subject) =>
    subjects.includes(subject.subject_id)
  );

  const notRelatedSubjectInThesis = thesisParams.subjects.filter(
    (subject) => !subjects.includes(subject.subject_id)
  );

  useEffect(()=>{
    setIsChanged(false);
  }, [])

  const addKeywordToThesis = (keywordId) => {
    axios
      .put(`api/v1/thesis/${thesis.thesis_id}/add/keyword/${keywordId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Keyword added succesfully!')
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error('A problem occured !')
        setIsChanged(true);
        closeModal();
        console.log(err);
      });
  };

  const removeKeywordFromThesis = (keywordId) => {
    axios
      .put(`api/v1/thesis/${thesis.thesis_id}/remove/keyword/${keywordId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Keyword removed succesfully!')
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error('A problem occured !')
        setIsChanged(true);
        closeModal();
        console.log(err);
      });
  };

  const addSubjectToThesis = (keywordId) => {
    axios
      .put(`api/v1/thesis/${thesis.thesis_id}/add/subject/${keywordId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Subject added succesfully!')
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error('A problem occured !')
        setIsChanged(true);
        closeModal();
        console.log(err);
      });
  };

  const removeSubjectFromThesis = (keywordId) => {
    axios
      .put(`api/v1/thesis/${thesis.thesis_id}/remove/subject/${keywordId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Subject removed succesfully!')
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error('A problem occured !')
        setIsChanged(true);
        closeModal();
        console.log(err);
      });
  };


  const deleteThesis = () => {
    axios
      .delete(`/api/v1/manager/thesis/${thesis.thesis_id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success('Thesis deleted successfully!')
        closeModal();
        setIsChanged(true);
      })
      .catch((err) => {
        toast.error('A problem occured !')
        setIsChanged(true);
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

  useEffect(() => {
    thesisParams?.keywords?.length < 1 && getParams();
  }, []);

  const getParams = async () => {
    try {
      const subjectsResponse = await axios.get("/api/v1/subject", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        subjects: subjectsResponse.data.data,
      }));

      const keywordsResponse = await axios.get("/api/v1/related-keyword", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        keywords: keywordsResponse.data.data,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useOutsideAlerter(modalRef);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 px-2">
      <div ref={modalRef} className="bg-white rounded-lg p-8 md:w-[70%] z-[999] ">
        <h2 onClick={()=>navigate(`/thesis-detail/${thesis.thesis_id}`)} className="text-lg font-bold border-b tailwind-auto-border border-main transition hover:text-main cursor-pointer">
          {thesis.title}
        </h2>
        <div className="mt-5 flex flex-col gap-2 ">
          <h2 className="font-semibold text-grayUpdated">Keywords</h2>
          <div className="flex gap-3 items-center flex-wrap max-h-[60px] md:max-h-[100px] p-3 overflow-scroll">
            {relatedInThesis.map((keyword) => (
              <div onClick={()=>removeKeywordFromThesis(keyword.keyword_id)} className="relative group cursor-pointer">
                <div className="absolute -top-2 -right-2 z-[2]">
                  <FaMinusCircle className="w-[1.2rem] h-[1.2rem] text-red-500  group-hover:text-red-700 transition-all" />
                </div>
                <span className="text-xs font-bold text-black bg-gray-200 transition rounded py-2 px-3">
                  {keyword.related_keyword}
                </span>
              </div>
            ))}
            {notRelatedInThesis.map((keyword) => (
              <div onClick={()=>addKeywordToThesis(keyword.keyword_id)} className="relative group cursor-pointer">
                <div className="absolute -top-2 -right-2 z-[2]">
                  <FaPlusCircle className="w-[1.2rem] h-[1.2rem] text-green-700 group-hover:text-green-900 transition-all" />
                </div>
                <span className="text-xs font-bold text-black transition bg-gray-200 rounded py-2 px-3">
                  {keyword.related_keyword}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 ">
          <h2 className="font-semibold text-grayUpdated">Subjects</h2>
          <div className="flex gap-3 items-center flex-wrap max-h-[60px] md:max-h-[100px] p-3 overflow-scroll">
            {relatedSubjectInThesis.map((subject) => (
              <div onClick={()=>removeSubjectFromThesis(subject.subject_id)} className="relative group cursor-pointer">
                <div className="absolute -top-2 -right-2 z-[2]">
                  <FaMinusCircle className="w-[1.2rem] h-[1.2rem] text-red-500  group-hover:text-red-700 transition-all" />
                </div>
                <span className="text-xs font-bold text-black bg-gray-200 transition rounded py-2 px-3">
                  {subject.subject_name}
                </span>
              </div>
            ))}
            {notRelatedSubjectInThesis.map((subject) => (
              <div onClick={()=>addSubjectToThesis(subject.subject_id)}  className="relative group cursor-pointer">
                <div className="absolute -top-2 -right-2 z-[2]">
                  <FaPlusCircle className="w-[1.2rem] h-[1.2rem] text-green-700 group-hover:text-green-900 transition-all" />
                </div>
                <span className="text-xs font-bold text-black transition bg-gray-200 rounded py-2 px-3">
                  {subject.subject_name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          className=" bg-[#fc544b] hover:bg-[#fb160a] w-full text-white rounded py-2 transition text-sm mt-12"
          onClick={() => {
            deleteThesis();
          }}
        >
          Delete This Thesis
        </button>
      </div>
    </div>
  );
};

export default ThesisModal;
