import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useThesis from "../hooks/useThesis";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaQuestion } from "react-icons/fa";

const Thesis = () => {
  const [filteredTheses, setFilteredTheses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { theses, setTheses, thesisParams, setThesisParams } = useThesis();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  const [filterLoading, setFilterLoading] = useState();
  const { auth } = useAuth();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    theses.length < 1 && setFilterLoading(true);
    axios
      .get("/api/v1/thesis", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setTheses(res.data.data);
        setFilterLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFilterLoading(false);
      });
  }, []);

  const fetchFilteredTheses = async () => {
    try {
      setFilterLoading(true);

      let queryParams = "";

      // Check selectedSubjects, selectedKeywords, etc., and construct query params
      if (selectedSubjects.length > 0) {
        queryParams += `subjects=${selectedSubjects.join(",")}`;
      }

      if (selectedKeywords.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }keywords=${selectedKeywords.join(",")}`;
      }

      if (selectedUniversities.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }universities=${selectedUniversities.join(",")}`;
      }

      if (selectedInstitutes.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }institutes=${selectedInstitutes.join(",")}`;
      }

      if (selectedLanguages.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }languages=${selectedLanguages.join(",")}`;
      }

      if (selectedTypes.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }types=${selectedTypes.join(",")}`;
      }


      if (title.length > 0) {
        queryParams += `${
          queryParams.length > 0 ? "&" : ""
        }word=${title}`;
      }


      const url = `/api/v1/thesis${
        queryParams.length > 0 ? `?${queryParams}` : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setFilteredTheses(response.data.data);
      setFilterLoading(false);
    } catch (error) {
      console.error("Error fetching filtered theses:", error);
      setFilterLoading(false);
    }
  };

  const getDisplayedTheses = () => {
    if (
      selectedSubjects.length === 0 &&
      selectedKeywords.length === 0 &&
      selectedUniversities.length === 0 &&
      selectedInstitutes.length === 0 &&
      selectedLanguages.length === 0 &&
      selectedTypes.length === 0 &&
      title.length === 0
    ) {
      return theses;
    } else {
      return filteredTheses;
    }
  };
  
  const displayedTheses = getDisplayedTheses();

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (checkedId, selectedArray, setSelectedArray) => {
    const updatedArray = [...selectedArray];

    if (updatedArray.includes(checkedId)) {
      const index = updatedArray.indexOf(checkedId);
      updatedArray.splice(index, 1);
    } else {
      updatedArray.push(checkedId);
    }

    setSelectedArray(updatedArray);
  };

  const getAllParams = async () => {
    try {
      setLoading(true);

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

      const universitiesResponse = await axios.get("/api/v1/university", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        universities: universitiesResponse.data.data,
      }));

      const instituteResponse = await axios.get("/api/v1/institute", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        institutes: instituteResponse.data.data,
      }));

      const langaugeResponse = await axios.get("/api/v1/thesis-language", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setThesisParams((prevParams) => ({
        ...prevParams,
        languages: langaugeResponse.data.data,
      }));

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

  useEffect(() => {
    thesisParams.subjects.length < 1 && getAllParams();
  }, []);

  useEffect(() => {
    fetchFilteredTheses();
  }, [selectedSubjects, selectedKeywords, selectedUniversities, selectedInstitutes, selectedLanguages, selectedTypes, title]);

  return (
    <div>
      <div className="flex flex-col gap-3 mt-12 md:mt-8">
        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-3 md:gap-12">
          <input
            placeholder="Search..."
            value={title}
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
            className="bg-white border rounded outline-none transition-all focus:border-main h-[38px] py-3 px-5 w-full md:w-[350px] lg:w-[470px] font-semibold"
          />
          <button
            onClick={fetchFilteredTheses}
            className="bg-main disabled:bg-gray-400 text-sm font-semibold tracking-wider hover:bg-mainHover transition text-white py-1 w-full md:w-auto md:px-12 lg:px-20 xl:px-28 2xl:px-32  h-[38px] rounded"
            disabled={filterLoading}
          >
            Search
          </button>
          <button
            onClick={toggleFilters}
            disabled={filterLoading}
            className="text-black disabled:bg-gray-400 disabled:text-white  whitespace-nowrap text-sm font-semibold tracking-wider transition border bg-gray-100 hover:bg-gray-200 w-full md:w-auto md:px-12 lg:px-20 xl:px-28 2xl:px-32  py-1  h-[38px] rounded"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>
      <div
        className={`w-full bg-white shadow p-5 border-t-2 rounded flex flex-col lg:flex-row gap-6 mt-8 border-t-main transition-maxHeight overflow-y-scroll lg:overflow-y-hidden duration-500 ease-in-out overflow-hidden ${
          showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {loading ? (
          <div className="w-full min-h-[500px] md:min-h-[310px] flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Subjects
              </span>
              <div className="flex flex-col max-h-[200px] no-scrollbar overflow-y-scroll">
                {thesisParams.subjects.map((subject) => (
                  <label
                    key={subject.subject_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3  text-gray-600 accent-main"
                      value={subject.subject_id}
                      checked={selectedSubjects.includes(subject.subject_id)}
                      disabled={filterLoading}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedSubjects,
                          setSelectedSubjects
                        )
                      }
                    />
                    <span className="ml-2">{subject.subject_name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Keywords
              </span>
              <div className="flex flex-col h-full no-scrollbar max-h-[200px] overflow-y-scroll">
                {thesisParams.keywords.map((keyword) => (
                  <label
                    key={keyword.keyword_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600 accent-main"
                      value={keyword.keyword_id}
                      disabled={filterLoading}
                      checked={selectedKeywords.includes(keyword.keyword_id)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedKeywords,
                          setSelectedKeywords
                        )
                      }
                    />
                    <span className="ml-2">{keyword.related_keyword}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Universities
              </span>
              <div className="flex flex-col h-full max-h-[200px] no-scrollbar overflow-y-scroll">
                {thesisParams.universities.map((university) => (
                  <label
                    key={university.university_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3 accent-main"
                      value={university.university_id}
                      disabled={filterLoading}
                      checked={selectedUniversities.includes(
                        university.university_id
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedUniversities,
                          setSelectedUniversities
                        )
                      }
                    />
                    <span className="ml-2">{university.university_name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Institutes
              </span>
              <div className="flex flex-col h-full max-h-[200px] no-scrollbar overflow-y-scroll">
                {thesisParams.institutes.map((institute) => (
                  <label
                    key={institute.institute_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600 accent-main"
                      value={institute.institute_id}
                      disabled={filterLoading}
                      checked={selectedInstitutes.includes(
                        institute.institute_id
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedInstitutes,
                          setSelectedInstitutes
                        )
                      }
                    />
                    <span className="ml-2">{institute.institute_name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Types
              </span>
              <div className="flex flex-col h-full max-h-[200px] no-scrollbar overflow-y-scroll">
                {thesisParams.types.map((type) => (
                  <label
                    key={type.thesis_type_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600 accent-main"
                      value={type.thesis_type_id}
                      disabled={filterLoading}
                      checked={selectedTypes.includes(type.thesis_type_id)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedTypes,
                          setSelectedTypes
                        )
                      }
                    />
                    <span className="ml-2">{type.thesis_type_name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <span
                style={{ display: "inline" }}
                className="font-semibold text-mainHover tracking-wide"
              >
                Languages
              </span>
              <div className="flex flex-col h-full max-h-[200px] no-scrollbar overflow-y-scroll">
                {thesisParams.languages.map((language) => (
                  <label
                    key={language.thesis_language_id}
                    className="inline-flex items-center mt-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600 accent-main"
                      value={language.thesis_language_id}
                      disabled={true}
                      checked={selectedLanguages.includes(
                        language.thesis_language_id
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          parseInt(e.target.value),
                          selectedLanguages,
                          setSelectedLanguages
                        )
                      }
                    />
                    <span className="ml-2">{language.thesis_language}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={`bg-white shadow rounded ${
          showFilters && "mt-12"
        } transition-all`}
      >
        <div className="w-full bg-main p-5 text-white font-semibold rounded rounded-b-none text-lg tracking-wider">
        Results: {displayedTheses.length}
        </div>
        <div className="flex flex-col">
          {filterLoading ? (
            <div className="min-h-[600px] w-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : selectedSubjects.length === 0 &&
            selectedKeywords.length === 0 &&
            selectedUniversities.length === 0 &&
            selectedInstitutes.length === 0 &&
            selectedLanguages.length === 0 &&
            selectedTypes.length === 0 &&
            title.length === 0 ? (
            theses.map((these) => (
              <div
                key={these.thesis_id}
                onClick={() => navigate(`/thesis-detail/${these.thesis_id}`)}
                className="hover:bg-gray-100 text-base w-full flex-col transition-all text-[#34395e] flex gap-3 p-5 cursor-pointer"
              >
                <div className="uppercase tracking text-xs flex gap-3 items-center font-semibold">
                  <p>{these.university.university_name} </p>
                  <div className='after:content-["\2022"]'></div>
                  <p>{these.institute.institute_name.slice(13)}</p>
                </div>
                <h2 className="font-semibold text-lg -mt-2">{these.title}</h2>
                {these.related_keywords.length > 0 && (
                  <div className="flex gap-1 items-center -mt-2">
                    {these.related_keywords.map((keyword) => (
                      <span key={keyword.keyword_id} className="text-xs font-bold text-white bg-mainHover rounded p-1">
                        {keyword.related_keyword}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={`flex justify-between items-center font-semibold text-grayUpdated text-sm`}
                >
                  <h3>
                    {" "}
                    Author: {these.author.firstname} {these.author.lastname}
                  </h3>
                  <h3>Language: {these.language.thesis_language}</h3>
                </div>
                <div className="">
                  {these.thesis_abstract.slice(0, 550) + "..."}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    onClick={() =>
                      navigate(`/thesis-detail/${these.thesis_id}`)
                    }
                    className="bg-main px-5 py-2 rounded text-white hover:bg-mainHover transition text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : filteredTheses.length > 0 ? (
            filteredTheses.map((these) => (
              <div
                key={these.thesis_id}
                onClick={() => navigate(`/thesis-detail/${these.thesis_id}`)}
                className="hover:bg-gray-100 text-base w-full flex-col transition-all text-[#34395e] flex gap-3 p-5 cursor-pointer"
              >
                <div className="uppercase tracking text-xs flex gap-3 items-center font-semibold">
                  <p>{these.university.university_name} </p>
                  <div className='after:content-["\2022"]'></div>
                  <p>{these.institute.institute_name.slice(13)}</p>
                </div>
                <h2 className="font-semibold text-lg -mt-2">{these.title}</h2>
                {these.related_keywords.length > 0 && (
                  <div className="flex gap-1 items-center -mt-2">
                    {these.related_keywords.map((keyword) => (
                      <span key={keyword.keyword_id} className="text-xs font-bold text-white bg-mainHover rounded p-1">
                        {keyword.related_keyword}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={`flex justify-between items-center font-semibold text-grayUpdated text-sm`}
                >
                  <h3>
                    {" "}
                    Author: {these.author.firstname} {these.author.lastname}
                  </h3>
                  <h3>Language: {these.language.thesis_language}</h3>
                </div>
                <div className="">
                  {these.thesis_abstract.slice(0, 550) + "..."}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    onClick={() =>
                      navigate(`/thesis-detail/${these.thesis_id}`)
                    }
                    className="bg-main px-5 py-2 rounded text-white hover:bg-mainHover transition text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center p-5">
                <div className='bg-main rounded flex items-center justify-center p-3 w-16 h-16'><FaQuestion className='w-[2em] h-[2em]' color='white'/></div>
                <h2 className='text-lg font-bold text-grayUpdated'>We couldn't find any data</h2>   
                <p className='text-grayUpdated -mt-3'>No matching theses found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thesis;
