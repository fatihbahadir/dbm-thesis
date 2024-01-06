import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaQuestion } from 'react-icons/fa';
import Avatar from "../assets/avatar.png";
import Avatar2 from "../assets/avatar-2.png";

const UserTheses = () => {
  const { userId } = useParams();
  const { auth } = useAuth();
  const [loading, setLoading] = useState();
  const [userTheses, setUserTheses] = useState([]);
  const navigate = useNavigate();

  const getThesis = () => {
    setLoading(true);
    axios.get(`/api/v1/thesis?users=${userId}`, {
      headers: {
          Authorization: `Bearer ${auth.accessToken}`,
      },
  }).
  then((res)=>{
    console.log(res.data.data)
    setUserTheses(res.data.data)
    setLoading(false);
    })
  .catch(err=>{
    console.log(err)
    setLoading(false);
  }) 
  }

  useEffect(()=>{
    getThesis()
  }, [])

  const calcTime = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const elapsedTime = currentDate - givenDate;
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24); // Calculate elapsed time in days

    return `${Math.floor(elapsedDays)} days ago`;
  };

  return (
    <div className='max-w-screen min-h-screen overflow-hidden p-5'>
            {
        loading ? <div className='w-screen h-screen ml-[-30px] flex items-center justify-center'>
          <LoadingSpinner/>
          </div>
          :
          userTheses.length < 1 ?
          <div className='w-full min-h-[calc(100vh-70px)] flex items-center justify-center'>
            <div className='bg-white shadow-xl rounded flex flex-col items-center justify-center mt-12 gap-5 p-5'>
                <div className='bg-main rounded flex items-center justify-center p-3 w-16 h-16'><FaQuestion className='w-[2em] h-[2em]' color='white'/></div>
                <h2 className='text-lg font-bold text-grayUpdated'>We couldn't find any data</h2>   
                <p className='text-grayUpdated -mt-3'>Sorry we can't find any data, appereantly this user has no theses.</p>
                <button onClick={()=> navigate('/')} style={{boxShadow: '0 2px 6px #acb5f6'}} className="bg-main font-semibold transition-all hover:bg-mainHover text-sm py-[.3rem] px-[.8rem] tracking-wide text-white rounded-[.25rem]">Back to home page</button>
            </div>
        </div>
           :
           <div>
            <h2 className='text-2xl flex items-center justify-center w-full mt-6 uppercase tracking-wide font-bold'>We found {userTheses.length} theses</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12  w-full gap-12">
           {
             userTheses.map((these) => (
            <div
              key={these.thesis_id}
              onClick={() => navigate(`/thesis-detail/${these.thesis_id}`)}
              className="bg-white rounded shadow-2xl flex justify-center p-5  flex-col gap-6 transition-all duration-300 cursor-pointer hover:shadow-xl"
            >     
              <div className="flex gap-3 text-xs  text-[#34395e] font-semibold">
                    <div className="uppercase tracking">
                      {these.institute.institute_name.slice(13)}
                    </div>
                    <div className='after:content-["\2022"]'></div>
                    <div className="uppercase tracking-normal">
                      {calcTime(these.submission_date)}
                    </div>
                  </div>

                  <div className="text-main leading-[22px] -mt-3  text-base font-semibold w-full h-full">
                    {these.title.length > 100 ? these.title.slice(0,100) + '...' : these.title}
                  </div>
                  <p className="text-[#34395e] leading-[28px] -mt-3 text-sm  w-full h-full ">
                    {these.thesis_abstract.slice(0,150) + '...' }
                  </p>

                  <div className="flex gap-1 w-full items-center mt-5">
                    <img
                      className="w-[45px] rounded-full mr-[15px]"
                      src={these.author.gender === "MALE" ? Avatar : Avatar2}
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-main font-semibold leading-[24px]">
                        {these.author.firstname} {these.author.lastname}
                      </h2>
                      <p className="text-xs tracking-widest font-semibold text-[#34395e] uppercase">
                        {these.author.profession.profession_name}
                      </p>
                    </div>
                  </div>
            </div>
          ))}
            </div>
          </div>
            }
    </div>
  )
}

export default UserTheses
