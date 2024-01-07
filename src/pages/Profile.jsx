import { useEffect, useState } from "react";
import useUser from "../hooks/useUser"

import { IoManSharp } from "react-icons/io5";
import { IoWoman } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";

import { FaChevronRight } from "react-icons/fa";

import { useParams } from 'react-router-dom';

import Avatar from '../assets/avatar.png';
import Avatar2 from '../assets/avatar-2.png';



const profileSentences = [
    "Infuse your profile with the latest and greatest about yourself, ensuring it reflects the truest version of who you are.",
    "Elevate your profile with the most recent updates, revealing the truest essence of who you are.",
    "Navigate to the update page and refresh your profile, ensuring it mirrors the latest and greatest aspects of yourself.",
    "Inject your profile with freshness by updating it – a snapshot that captures the authentic essence of your current self.",
    "Seize the moment to update your profile, embodying the latest and greatest facets of your evolving self.",
    "Transform your profile into a dynamic reflection of yourself by incorporating the latest updates and highlights."
  ];

function randomPhrase() {
    const randomIndex = Math.floor(Math.random() * profileSentences.length);
    return profileSentences[randomIndex];
}

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear - 1;
    return age;
}

function getRoleIcon(roleName) {
    switch(roleName) {
        case "USER":
            return <FaRegUser size={35}/>
        case "MANAGER":
            return <GrUserManager size={35}/>
        case "ADMIN":
            return <GrUserAdmin size={35}/>
    }
}

const Profile = () => {
    const { userId } = useParams();
    const {user, setUser} = useUser();
    const [expanded, setExpanded] = useState(false);

    // yeni istek

    return (
    <div className="m-1 lg:flex lg:flex-col lg:min-h-screen lg:items-center">
            
        <div className="greeting mt-5 lg:mt-10 mb-10">
            <div className="mt-3 pt-3 flex items-center gap-4">
                <div className="box w-[33px] h-[8px] bg-[#6777ef] rounded-xl"></div>
                <h2 className="section-title text-xl">Hi, {user?.firstname} {user?.lastname} !</h2>
            </div>
            <p className="mx-[50px] my-2 max-w-[380px] text-slate-400 font-thin text-sm">{randomPhrase()}</p>
        </div>
        
        <div className="relative max-w-[600px] rounded overflow-hidden shadow-lg">
            
            <div className="absolute top-8 left-10 text-center">
                <div className="flex items-center">

                    <div>
                        <img src={Avatar} className="mr-[.5rem] align-middle w-[100px] h-[100px] shadow-xl" alt="Avatar" />
                        <p className="mt-2 text-[10px] italic underline text-slate-400">Change Photo</p>
                    </div>

                    <button onClick={() => setExpanded(!expanded)} className="items-center hidden lg:block">
                        <FaChevronRight className={"text-slate-500 transition-all" + (expanded ? " rotate-180" : "")}/>
                    </button>

                </div>
            </div>

            {expanded ?
                <div className="absolute top-8 right-[50px]">

                    <div className="flex items-center gap-10">
                        <div className="">
                            <img src={Avatar} className="mr-[.5rem] align-middle w-[100px] h-[100px] rounded-full shadow-xl" alt="Avatar" />
                        </div>
                        <div className="">
                            <img src={Avatar} className="mr-[.5rem] align-middle w-[60px] h-[60px] rounded-full shadow-xl" alt="Avatar" />
                        </div>
                        <div className="">
                            <img src={Avatar} className="mr-[.5rem] align-middle w-[40px] h-[40px] rounded-full shadow-xl" alt="Avatar" />
                        </div>
                    </div>

                </div> : null
            }

            <div className="data-set mt-[150px] mb-[50px] m-3 p-2">


                {user ? (
                    <div className="flex flex-col gap-4 lg:items-center lg:gap-20 lg:flex-row">
                        <div className="data-rows flex flex-col m-2 p-5 gap-2 lg:gap-7">
                            
                            <div className="data-row">
                                <p className="text-[#6777ef] font-bold">Email</p>
                                <p>{user.email}</p>
                            </div>
                            <div className="data-row">
                                <p className="text-[#6777ef] font-bold">Firstname</p>
                                <p>{user.firstname}</p>
                            </div>
                            <div className="data-row">
                                <p className="text-[#6777ef] font-bold">Lastname</p>
                                <p>{user.lastname}</p>
                            </div>
                            
                        </div>

                        <div className="grid gap-5 lg:gap-10 lg:m-auto">
                            
                            <div className="flex flex-col gap-2 ml-7 lg:ml-0 lg:items-center">
                                <div className="ml-3 lg:ml-0"> {getRoleIcon(user.role)} </div>
                                <p className="text-sm font-bold">{user.role}</p>
                            </div>

                            <div className="lg:text-center ml-7 lg:ml-0">
                                {
                                    user.gender == "MALE" ? 
                                    (
                                        <div className="flex flex-col gap-1 lg:items-center">
                                            <IoManSharp size={50}/>
                                            <p className="text-sm font-bold ml-2 lg:ml-0">MAN</p>
                                        </div>
                                    ) : (
                                        
                                        <div className="flex flex-col items-center gap-1">
                                            <IoWoman size={50}/>
                                            <p className="text-sm font-bold ml-2 lg:ml-0">WOMAN</p>
                                        </div>
      
                                    )
                                }
                                <p className="text-[11px] text-slate-500 ml-4 lg:ml-0">{calculateAge(user.birth_year)}</p>
                            </div>
                            
                        </div>

                        <div className="lg:m-auto p-5 lg:p-0">
                            <h1 className="mb-5 text-[#6777ef] font-bold">Profession</h1>
                            <div className="flex flex-col gap-1 text-sm">
                                <h3 className="font-bold">{user.profession.profession_name}</h3>
                                <p className="italic text-slate-400">{user.profession.profession_description}</p>
                            </div>

                        </div>

                    </div>

                ) : (
                    <div>user not found</div>
                )}

            </div>

            <div className="absolute bottom-0 pt-12 right-0 pr-5 pb-5">
                <button className="bg-[#6777ef] hover:bg-[#5664ca] text-white font-bold py-2 px-4 rounded">
                    Update
                </button>
            </div>

        </div>

        {/* <div className="relative max-w-[600px] rounded overflow-hidden shadow-lg mt-10">
            
            <div className="panel p-3 m-3">
                
                <div className="flex justify-between gap-20">
                    <h1 className="font-bold text-[#6777ef] underline">My Thesis</h1>
                    <button className="bg-[#6777ef] hover:bg-[#5664ca] text-white font-bold py-2 px-4 rounded-t lg:rounded-tr-none">
                        Update
                    </button>
                </div>
            
            </div>
            
        </div> */}
    
    </div>
    );

}

export default Profile;