import React, { useEffect, useState} from "react";
import useThesis from "../hooks/useThesis";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useUser from "../hooks/useUser";

const AddNewThesis = () => {
  const { thesisParams, setThesisParams} = useThesis();
  const { auth } = useAuth();
  const { users, setUsers, user } = useUser();
  const [formUsers ,setFormUsers] = useState()
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [formData, setFormData] = useState({
    thesisNo: '',
    title: '',
    university: '',
    institute: '',
    thesisType: '',
    thesisLanguage: '',
    numOfPages: '',
    year: '',
    supervisor: '',
    cosupervisor: '',
    abstract: '',
    keywords: [],
    subjects: [],
  })

  const getUsers = () => {
    axios.get('/api/v1/user', {
      headers: { Authorization: `Bearer ${auth?.accessToken}` },  
    }).then((res)=>{
      setUsers(res.data.data)
      setFormUsers(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

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
      const subjectsResponse = await axios.get("/api/v1/subject", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(subjectsResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        subjects: subjectsResponse.data.data,
      }));

      const keywordsResponse = await axios.get("/api/v1/related-keyword", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(keywordsResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        keywords: keywordsResponse.data.data,
      }));

      const universitiesResponse = await axios.get("/api/v1/university", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(universitiesResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        universities: universitiesResponse.data.data,
      }));

      const instituteResponse = await axios.get("/api/v1/institute", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(instituteResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        institutes: instituteResponse.data.data,
      }));

      const langaugeResponse = await axios.get("/api/v1/thesis-language", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(langaugeResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        languages: langaugeResponse.data.data,
      }));

      const typeResponse = await axios.get("/api/v1/thesis-type", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      console.log(typeResponse.data.data);
      setThesisParams((prevParams) => ({
        ...prevParams,
        types: typeResponse.data.data,
      }));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const isEmpty = (input, limit) => {
    if(input.length < limit) {
      return true
    }
    return false
  }

  const handleSave = () => {
      if(isEmpty(formData.title, 5)) {
        
      }
  }

  useEffect(() => {
    thesisParams.subjects.length < 1 &&   getAllParams();
  }, []);

  useEffect(()=>{
    getUsers();
  }, [])

  useEffect(()=>{
    console.log(formData)
  }, [formData])

  return (
    <div className="w-full h-full flex pt-12 md:px-24">
      <div className="bg-white shadow-2xl pb-6 rounded flex flex-col justify-center gap-8 w-full">
        <div className="w-full items-start border-b p-5 border-b-[#f9f9f9]">
          <h2 className="font-bold text-grayUpdated text-xl tracking-wider">
            Write Your Thesis
          </h2>
        </div>
        <div className="w-full flex flex-col gap-8 p-5">
        <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis No</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <input
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.thesisNo}
                onChange={(e)=>setFormData({...formData, thesisNo: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Title</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <input
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.title}
                onChange={(e)=>setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">University</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.university}
                onChange={(e)=>setFormData({...formData, university: e.target.value})}
              >
                {
                  thesisParams.universities.map((university) => (
                    <option value={university.university_id} key={university.university_id}>
                      {university.university_name}
                    </option>
                  ))
                }
           
              </select>
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Institute</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.institute}
                onChange={(e)=>setFormData({...formData, institute: e.target.value})}
              >
                {
                  thesisParams.institutes.map((institute) => (
                    <option value={institute.institute_id} key={institute.institute_id}>
                      {institute.institute_name}
                    </option>
                  ))
                }
           
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Type</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.thesisType}
                onChange={(e)=>setFormData({...formData, thesisType: e.target.value})}
              >
             {
                  thesisParams.types.map((type) => (
                    <option value={type.thesis_type_id} key={type.thesis_type_id}>
                      {type.thesis_type_name}
                    </option>
                  ))
                }
           
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Language</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.thesisLanguage}
                onChange={(e)=>setFormData({...formData, thesisLanguage: e.target.value})}
              >
             {
                  thesisParams.languages.map((language) => (
                    <option value={language.thesis_language_id} key={language.thesis_language_id}>
                      {language.thesis_language}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Number of Pages</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <input
                type="number"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.numOfPages}
                onChange={(e)=>setFormData({...formData, numOfPages: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Year</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <input
                type="number"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.year}
                onChange={(e)=>setFormData({...formData, year: e.target.value})}
              />
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Supervisor</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.supervisor}
                onChange={(e)=>setFormData({...formData, supervisor: e.target.value})}
              >
                {
                  formUsers?.filter(us => us.user_id !== user?.user_id).map((formUser) => (
                    <option value={formUser.user_id} key={formUser.user_id}>
                      {formUser.firstname} {formUser.lastname}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Co-supervisor</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.cosupervisor}
                onChange={(e)=>setFormData({...formData, cosupervisor: e.target.value})}
              >
                {
                  formUsers?.filter(us => us.user_id !== user?.user_id).map((formUser) => (
                    <option value={formUser.user_id} key={formUser.user_id}>
                      {formUser.firstname} {formUser.lastname}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Abstract</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
              <textarea
               value={formData.abstract}
               onChange={(e)=>setFormData({...formData, abstract: e.target.value})}
               className="py-2 px-4 resize-none bg-[#fdfdff] border-[#e4e6fc] min-h-[250px] border transition-all rounded w-full outline-none  focus:border-main" />
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Related Keywords</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            {thesisParams.keywords.map((keyword) => (
              <label
                key={keyword.keyword_id}
                className="inline-flex items-center mr-5"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 accent-main"
                  value={keyword.keyword_id}
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

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Subjects</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0">
            {thesisParams.subjects.map((subject) => (
              <label
                key={subject.subject_id}
                className="inline-flex items-center mr-5"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 accent-main"
                  value={subject.subject_id}
                  checked={selectedSubjects.includes(subject.subject_id)}
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

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-7 md:col-start-4 md:px-3 mt-3 md:mt-0">
            <button style={{boxShadow: '0 2px 6px #acb5f6'}} className="bg-main transition-all rounded py-2 hover:bg-mainHover px-8 text-white">
              Save
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewThesis;
