import React, { useEffect, useState} from "react";
import useThesis from "../hooks/useThesis";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

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
    university: '1',
    institute: '1',
    thesisType: '1',
    thesisLanguage: '1',
    numOfPages: '100',
    year: '2024',
    supervisor: '1',
    cosupervisor: '2',
    abstract: '',
  })
  const [disabled, setDisabled] = useState()
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

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
  
  const isEmpty = (input, limit) => {
    if(input.length < limit) {
      return true
    }
    return false
  }

  const showError = (text) => {
    setDisabled(true)
    toast.error(text, {autoClose: 3000})
    setTimeout(() => {
      setDisabled(false)
    }, 3500);
  }

  const showSuccess = (text) => {
    setDisabled(true)
    toast.success(text, {autoClose: 3000})
    setTimeout(() => {
      setDisabled(false)
      navigate('/thesis')
    }, 3500);
  }


  const handleSave = () => {
      setLoading(true);
      if(isEmpty(formData.thesisNo?.trim(), 3) || formData.thesisNo?.trim().length > 7) {
        showError('Thesis No can not be smaller then 3 letters or bigger than 7 letters.')
        return
      }
      if(isEmpty(formData.title?.trim(), 5)) {
        showError('Title can not be smaller then 5 letters.')
        return
      }
      if(formData.numOfPages?.trim() === '' || parseInt(formData.numOfPages) > 5000) {
        showError('Number of pages can not be null or bigger than 5000')
        return
      }
      if(formData.year?.trim() === '' || parseInt(formData.year) > 2024 || parseInt(formData.year < 1990)){
        showError('Year can not be null, can not be bigger than 2024 or can not be smaller than 1990')
        return
      }
      if(isEmpty(formData.abstract?.trim(), 300)) {
        showError('Thesis abstract can not be smaller than 300 letters.')
        return
      }
      if(selectedSubjects?.length < 1) {
        showError('At least one subject must be selected');
        return
      }
      if(formData.supervisor === formData.cosupervisor) {
        showError('Supervisor and Co-supervisor can not be same')
        return
      }

      

      axios
      .post(
        "/api/v1/thesis",
        {
          thesis_no: formData.thesisNo,
          subject_ids: selectedSubjects,
          related_keyword_ids: selectedKeywords,
          title: formData.title,
          abstract: formData.abstract,
          year: parseInt(formData.year),
          university_id: parseInt(formData.university),
          institute_id: parseInt(formData.institute),
          number_of_pages: parseInt(formData.numOfPages),
          type_id: parseInt(formData.thesisType),
          language_id: parseInt(formData.thesisLanguage),
          supervisor_id: parseInt(formData.supervisor),
          co_supervisor_id: parseInt(formData.cosupervisor)
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setFormData({
          thesisNo: '',
          title: '',
          university: '1',
          institute: '1',
          thesisType: '1',
          thesisLanguage: '1',
          numOfPages: '100',
          year: '2024',
          supervisor: '1',
          cosupervisor: '2',
          abstract: '',
        })
        setSelectedKeywords([])
        setSelectedSubjects([])
        showSuccess('Your thesis posted successfully')
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showError("Sorry... we can't save your thesis now. It is about us... Please try again later")
        setLoading(false);
      });
  }

  useEffect(() => {
    thesisParams.subjects.length < 1 &&   getAllParams();
  }, []);

  useEffect(()=>{
    getUsers();
  }, [])



  return (
    <div className="w-full h-full flex pt-12 md:px-24">
      <div className="bg-white shadow-2xl pb-6 rounded flex flex-col justify-center gap-8 w-full">
        <div className="w-full items-start border-b p-5 border-b-[#f9f9f9]">
          <h2 className="font-bold text-grayUpdated text-xl tracking-wider">
            Write Your Thesis
          </h2>
        </div>
        <div className="w-full flex flex-col gap-8 p-5">
          {
            loading ? <div className="w-full min-h-[550px] md:min-h-[800px] flex items-center justify-center">
              <LoadingSpinner/>
              </div>
              :
              <>
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
                disabled={disabled}

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
                disabled={disabled}

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
                disabled={disabled}

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
                disabled={disabled}

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
                disabled={disabled}

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
                disabled={disabled}

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
                min={1}
                max={5000}
                step={10}
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.numOfPages}
                onChange={(e)=>setFormData({...formData, numOfPages: e.target.value})}
                disabled={disabled}

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
                max={2024}
                min={1900}
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
                value={formData.year}
                onChange={(e)=>setFormData({...formData, year: e.target.value})}
                disabled={disabled}

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
                disabled={disabled}

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
                disabled={disabled}

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
               className="py-2 px-4 resize-none bg-[#fdfdff] border-[#e4e6fc] min-h-[250px] border transition-all rounded w-full outline-none  focus:border-main"
               disabled={disabled}
                />
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Related Keywords</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0 max-h-[300px] overflow-scroll">
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
                  disabled={disabled}

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
            <div className="col-span-12 md:col-span-7 md:px-3 mt-3 md:mt-0 max-h-[300px] overflow-scroll">
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
                  disabled={disabled}

                />
                <span className="ml-2">{subject.subject_name}</span>
              </label>
            ))}
                </div>  
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-7 md:col-start-4 md:px-3 mt-3 md:mt-0">
            <button  disabled={disabled} onClick={handleSave} style={{boxShadow: '0 2px 6px #acb5f6'}} className="bg-main disabled:bg-gray-500 transition-all rounded py-2 hover:bg-mainHover px-8 text-white">
              Save
            </button>
            </div>

          </div>
              </>
          }
       
        </div>
      </div>
    </div>
  );
};

export default AddNewThesis;
