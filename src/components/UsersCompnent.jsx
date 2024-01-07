import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Avatar from '../assets/avatar.png';
import Avatar2 from '../assets/avatar-2.png';
import useUser from '../hooks/useUser';
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const UsersComponent = () => {
  const {users, setUsers} = useUser();
  const [numDots, setNumDots] = useState(0);
  const { auth } = useAuth();
  const contentRef = useRef(null);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const getUsers = () => {
    setLoading(true);
    axios.get('/api/v1/user', {
      headers: { Authorization: `Bearer ${auth?.accessToken}` },  
    }).then((res)=>{
      setUsers(res.data.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(() => {
      getUsers()
  }, []); 

  const handleScroll = (scrollOffset) => {
    if (contentRef.current) {
      contentRef.current.scrollLeft += scrollOffset;
      const element = contentRef.current;
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      const numDots = Math.ceil(maxScrollLeft / 300);
      setNumDots(numDots);
    }
  };

  return (
    <div className="shadow p-5 border-b-0 border-t-2 border-t-[#fc544b] bg-white rounded flex flex-col ">
      <div className=" text-grayUpdated py-3 font-bold border-b-[#f9f9f9] border-b-2">
        <h2>Users</h2>
      </div>
      <div
        ref={contentRef}
        className="flex max-w-full gap-8 py-5 items-center overflow-x-auto no-scrollbar relative"
        style={{ scrollBehavior: "smooth" }}
        onClick={(e) => {
          const { clientX } = e;
          const { x, width } = contentRef.current.getBoundingClientRect();
          const middle = x + width / 2;
          const delta = clientX < middle ? -300 : 300;
          handleScroll(delta);
        }}
        onMouseDown={(e) => e.preventDefault()} // Seçimi engellemek için
      >
        {
          loading ? <div className="flex w-full min-h-[284px] items-center justify-center">
            <LoadingSpinner/>
            </div>
            :
            users?.map((user) => (
              <div key={user.user_id} className="flex flex-col gap-4 p-5 w-64 items-center justify-center">
                <img
                  src={user.gender === 'MALE' ? Avatar : Avatar2}
                  alt={`Avatar of ${user.username}`}
                  className="rounded-full"
                  style={{ maxWidth: '6rem', maxHeight: '6rem' }}
                />
                <h2 className="font-semibold text-base text-[#191d21] whitespace-nowrap overflow-hidden">{user.firstname} {user.lastname}</h2>
                <p className="text-xs -mt-4 uppercase tracking-widest whitespace-nowrap font-semibold text-grayUpdated">{user.profession.profession_name}</p>
                <button onClick={()=>navigate(`/user-theses/${user.user_id}`)} className={`py-2 px-4 text-sm transition-all rounded-[30px] ${user.user_id % 2 === 0 ? 'bg-[#fc544b] hover:bg-[#fb160a]' : 'bg-main hover:bg-mainHover'} text-white`}>
                  Theses
                </button>
              </div>
            ))
        }
       
      </div>

    </div>
  );
};

export default UsersComponent;
