import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const ThesisDetail = () => {
const { thesisId } = useParams();
const { auth } = useAuth();
const navigate = useNavigate();
const [exThesis, setExThesis] = useState({
"thesis_id": 1,
"thesis_no": "THS0001",
"subjects": [],
"related_keywords": [
    {
        "keyword_id": 2,
        "related_keyword": "Machine Learning"
    },
    {
        "keyword_id": 3,
        "related_keyword": "Software Engineering"
    },
    {
        "keyword_id": 5,
        "related_keyword": "Data Mining"
    }
],
"title": "Applications of Data Mining in Software Engineering",
"thesis_abstract": "This thesis explores the applications of data mining techniques in the field of software engineering.",
"year": 2023,
"university": {
    "university_id": 1,
    "university_name": "Maltepe University"
},
"institute": {
    "institute_id": 1,
    "institute_name": "Institute of Science and Technology"
},
"number_of_pages": 100,
"type": {
    "thesis_type_id": 1,
    "thesis_type_name": "Master's Thesis",
    "thesis_type_description": "An academic research project completed as part of a Master's degree program."
},
"language": {
    "thesis_language_id": 1,
    "thesis_language": "Turkish"
},
"submission_date": "2023-12-02T09:33:20.000+00:00",
"author": {
    "user_id": 1,
    "email": "orkun.kurul@gmail.com",
    "firstname": "Orkun",
    "lastname": "Kurul",
    "gender": "MALE",
    "birth_year": 2001,
    "profession": {
        "profession_id": 2,
        "profession_name": "STUDENT",
        "profession_description": "A student pursuing academic studies."
    },
    "role": "USER",
    "enabled": true,
    "account_non_expired": true,
    "account_non_locked": true,
    "credentials_non_expired": true,
    "authorities": [
        {
            "authority": "USER"
        }
    ],
    "username": "orkun.kurul@gmail.com"
},
"supervisor": {
    "user_id": 2,
    "email": "author@email.com",
    "firstname": "John",
    "lastname": "Doe",
    "gender": "MALE",
    "birth_year": 1995,
    "profession": {
        "profession_id": 3,
        "profession_name": "PROFESSOR",
        "profession_description": "A university or college professor who teaches and conducts research."
    },
    "role": "USER",
    "enabled": true,
    "account_non_expired": true,
    "account_non_locked": true,
    "credentials_non_expired": true,
    "authorities": [
        {
            "authority": "USER"
        }
    ],
    "username": "author@email.com"
},
"co_supervisor": {
    "user_id": 3,
    "email": "supervisor@email.com",
    "firstname": "Dr.",
    "lastname": "Smith",
    "gender": "FEMALE",
    "birth_year": 1980,
    "profession": {
        "profession_id": 3,
        "profession_name": "PROFESSOR",
        "profession_description": "A university or college professor who teaches and conducts research."
    },
    "role": "MANAGER",
    "enabled": true,
    "account_non_expired": true,
    "account_non_locked": true,
    "credentials_non_expired": true,
    "authorities": [
        {
            "authority": "MANAGER"
        }
    ],
    "username": "supervisor@email.com"
}
});

const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

useEffect(() => {
      axios
        .get(`/api/v1/thesis/${thesisId}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setExThesis(res.data.data);
        })
        .catch((err) => console.log(err));
  }, []);
  return (
    <div className='w-full h-full pt-12'>
      <div className="bg-white shadow-lg rounded flex flex-col justify-center gap-8 max-w-[900px] m-auto">
        <div className='flex flex-col items-center w-full py-8 px-3 bg-main rounded-t '>
            <h2 className='text-2xl font-semibold tracking-wide text-white'>{exThesis.title}</h2>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Thesis No: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.thesis_no}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>University: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.university.university_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Institute: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.institute.institute_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Keywords: </h3>
            {exThesis.related_keywords.length > 0 && (
                    <div className="flex gap-1 items-center sm:col-span-10 col-span-12 sm:ml-5">
                      {exThesis.related_keywords.map((keyword) => (
                        <span className="text-xs font-bold text-white bg-mainHover rounded p-1">
                          {keyword.related_keyword}
                        </span>
                      ))}
                    </div>
                  )}
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Subjects: </h3>
            {exThesis.subjects.length > 0 && (
                    <div className="flex gap-1 items-center sm:col-span-10 col-span-12 sm:ml-5">
                      {exThesis.related_keywords.map((keyword) => (
                        <span className="text-xs font-bold text-white bg-mainHover rounded p-1">
                          {keyword.related_keyword}
                        </span>
                      ))}
                    </div>
                  )}
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Thesis Type: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.type.thesis_type_name}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Thesis Abstarct: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.thesis_abstract} {exThesis.thesis_abstract} {exThesis.thesis_abstract} {exThesis.thesis_abstract}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Number Of Pages: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.number_of_pages}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Language: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.language.thesis_language}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Author: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.author.firstname} {exThesis.author.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Supervisor: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.supervisor.firstname} {exThesis.supervisor.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Co-supervisor: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{exThesis.co_supervisor.firstname} {exThesis.co_supervisor.lastname}</p>
        </div>
        <div className='grid grid-cols-12 px-3 w-full'>
            <h3 className='text-grayUpdated col-span-12 sm:col-span-2 sm:text-right font-semibold'>Date: </h3>
            <p className='sm:col-span-10 col-span-12 sm:ml-5'>{formatDate(exThesis.submission_date)}</p>
        </div>
        <div className='w-full flex justify-end p-3 py-12'>
            <button onClick={()=>navigate('/thesis')} className='bg-main py-1 px-5 text-white rounded transition-all hover:bg-mainHover'>
                Back
            </button>
        </div>
      </div>
    </div>
  )
}

export default ThesisDetail
