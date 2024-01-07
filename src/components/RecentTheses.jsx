import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import useThesis from "../hooks/useThesis";
import { useNavigate } from "react-router-dom";

const RecentTheses = () => {

  const { theses, setTheses } = useThesis();
  const navigate = useNavigate();

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  return (
    <div className="bg-white w-full h-full rounded shadow  flex flex-col">
      <div className="p-5 flex flex-row justify-between items-center">
        <h2 className="text-base font-bold text-grayUpdated">Last Theses</h2>
        <button
          style={{ boxShadow: "0 2px 6px #fd9b96" }}
          onClick={()=>navigate('/thesis')}
          className="flex font-semibold gap-2 items-center justify-center px-4 py-2 bg-[#fc544b] hover:bg-[#fb160a] transition tracking-wide text-white rounded-[30px] text-sm"
        >
          View More <FaArrowRight />
        </button>
      </div>
      <div className="flex flex-col pb-3">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium">
                  <tr className="text-[#717981] bg-[rgba(0,0,0,0.03)] font-bold">
                    <th scope="col" className="px-6 py-4">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      University
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
      
             {
                theses.sort((a, b) => new Date(b.submission_date) - new Date(a.submission_date)).slice(0,5).map((these,index)=>(
                    <tr key={these.thesis_id} className={`border-b ${index === 4 && 'border-b-0'} ${index % 2 === 0 ? 'bg-white' : 'bg-[rgba(0,0,0,0.03)]'}`}>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold">{these.author.firstname} {these.author.lastname}</td>
                    <td className="whitespace-nowrap px-6 py-4">{these.title.length > 100 ?  these.title.slice(0,100) + '...' : these.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">{these.university.university_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{formatDate(these.submission_date)}</td>
                    <td onClick={()=>navigate(`/thesis-detail/${these.thesis_id}`)} className="whitespace-nowrap px-6 py-4"><button style={{boxShadow: '0 2px 6px #acb5f6'}} className="bg-main font-semibold transition-all hover:bg-mainHover text-sm py-[.3rem] px-[.8rem] tracking-wide text-white rounded-[.25rem]">Detail</button></td>

                  </tr>
                ))
             }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTheses;
