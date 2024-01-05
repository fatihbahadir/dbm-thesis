import React, { useEffect } from 'react'
import useThesis from '../hooks/useThesis';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import Avatar  from '../assets/avatar.png';
import Avatar2  from '../assets/avatar-2.png';

const ManageTheses = () => {
  const {theses, setTheses} = useThesis();
  const { auth } = useAuth();

  useEffect(()=>{
    theses.length < 1 &&
        axios.get('/api/v1/thesis', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).
        then((res)=>{
          console.log(res.data.data)
          setTheses(res.data.data)
          })
        .catch(err=>console.log(err)) 
}, [])

const calcTime = (date) => {
  const currentDate = new Date();
  const givenDate = new Date(date);

  const elapsedTime = currentDate - givenDate;
  const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24); // Calculate elapsed time in days

    return `${Math.floor(elapsedDays)} days ago`;
  
}
  return (
    <div className='w-full h-full'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
       {
        theses.map((these)=>(
          <div key={these.thesis_id} className='bg-white rounded shadow flex justify-center p-5 m-6 flex-col gap-6 transition-all duration-300 cursor-pointer hover:shadow-xl'>
          <div className='flex gap-3 text-xs  text-[#34395e] font-semibold'>
              <div className='uppercase tracking'>
                {these.institute.institute_name.slice(13)}
              </div>
              <div className='after:content-["\2022"]'>
              </div>
              <div className='uppercase tracking-normal'>
                {
                  calcTime(these.submission_date)
                }
              </div>
          </div>
  
          <div className='text-main leading-[22px]  text-base font-semibold w-full h-full'>
                {these.title}
          </div>
          <p className='text-[#34395e] leading-[28px] -mt-3 text-sm  w-full h-full '>
            {these.thesis_abstract}
          </p>
  
          <div className='flex gap-1 w-full items-center mt-5'>
              <img className='w-[45px] rounded-full mr-[15px]' src={these.author.gender === 'MALE' ? Avatar : Avatar2} />
              <div className='flex flex-col gap-1'>
                <h2 className='text-main font-semibold leading-[24px]'>{these.author.firstname} {these.author.lastname}</h2>
                <p className='text-xs tracking-widest font-semibold text-[#34395e] uppercase'>{these.author.profession.profession_name}</p>
              </div>
          </div>
        </div>
        ))
       }
      </div>
    </div>
  )
}

export default ManageTheses
