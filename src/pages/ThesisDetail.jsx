import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ThesisDetail = () => {
const { thesisId } = useParams();
const { auth } = useAuth();
const navigate = useNavigate();
const [exThesis, setExThesis] = useState({});
const [loading, setLoading] = useState();

const formatDate = (inputDate) => {
    if (inputDate) {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

  };

useEffect(() => {
      setLoading(true);
      axios
        .get(`/api/v1/thesis/${thesisId}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setExThesis(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err)}
          );
  }, []);
  return (
    <div className='w-full h-full pt-12'>
      <div className="bg-white shadow-lg rounded flex flex-col justify-center gap-8 max-w-[900px] m-auto">
        {
          loading ? <div className='w-full flex items-center justify-center min-h-[500px] md:min-h-[900px]'>
            <LoadingSpinner/>
            </div>
            :
            <>
             <div className='flex flex-col items-center w-full py-8 px-3 bg-main rounded-t '>
            <h2 className='text-2xl font-semibold tracking-wide text-white'>{exThesis?.title}</h2>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Thesis No: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.thesis_no}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>University: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.university?.university_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Institute: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.institute?.institute_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Keywords: </h3>
            {exThesis?.related_keywords?.length > 0 && (
                    <div className="flex gap-1 flex-wrap items-center sm:col-span-10 col-span-12 sm:ml-5">
                      {exThesis?.related_keywords.map((keyword) => (
                        <span className="text-xs font-bold text-white bg-mainHover rounded p-1">
                          {keyword.related_keyword}
                        </span>
                      ))}
                    </div>
                  )}
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Subjects: </h3>
            {exThesis?.subjects?.length > 0 && (
                    <div className="flex gap-1 flex-wrap items-center sm:col-span-10 col-span-12 sm:ml-5">
                      {exThesis?.subjects?.map((subject) => (
                        <span className="text-xs font-bold text-white bg-mainHover rounded p-1">
                          {subject.subject_name}
                        </span>
                      ))}
                    </div>
                  )}
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Thesis Type: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.type?.thesis_type_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 w-full g-f sm:col-span-2 sm:text-right font-semibold'>Thesis Abstarct: </h3>
            <p style={{overflowWrap: 'break-word'}} className='sm:col-span-10 col-span-12 w-full sm:ml-5 pr-8 '>{exThesis?.thesis_abstract}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Number Of Pages: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.number_of_pages}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Language: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis?.language?.thesis_language}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Author: </h3>
            <p onClick={()=>navigate(`/user-theses/${exThesis.author.user_id}`)} className='sm:col-span-10 col-span-12 sm:ml-5 text-main transition hover:text-mainHover cursor-pointer '>{exThesis?.author?.firstname} {exThesis?.author?.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Supervisor: </h3>
            <p onClick={()=>navigate(`/user-theses/${exThesis.supervisor.user_id}`)} className='sm:col-span-10 col-span-12 sm:ml-5 text-main transition hover:text-mainHover cursor-pointer '>{exThesis?.supervisor?.firstname} {exThesis?.supervisor?.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Co-supervisor: </h3>
            <p onClick={()=>navigate(`/user-theses/${exThesis.co_supervisor.user_id}`)} className='sm:col-span-10 col-span-12 sm:ml-5 text-main transition hover:text-mainHover cursor-pointer '>{exThesis?.co_supervisor?.firstname} {exThesis?.co_supervisor?.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Date: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{formatDate(exThesis?.submission_date)}</p>
        </div>
        <div className='w-full flex justify-end p-3 py-12'>
            <button onClick={()=>navigate('/thesis')} className='bg-main py-1 px-5 text-white rounded transition-all hover:bg-mainHover'>
                Back
            </button>
        </div>
            </>
        }
       
      </div>
    </div>
  )
}

export default ThesisDetail
