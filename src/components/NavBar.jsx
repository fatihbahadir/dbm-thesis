import React, { useState } from 'react'
import { FaBars, FaRegUserCircle, FaSearch, FaUser } from 'react-icons/fa'
import Avatar from '../assets/avatar.png'

const NavBar = ({toggle, setToggle}) => {
  return (
    <>
    <div className={`transition-all h-[70px] left-0 right-[5px] z-[1] bg-main absolute items-center flex flex-nowrap justify-between py-[0.5rem] px-[1rem]`}>
      <div className='flex justify-center items-center gap-2 sm:gap-6'>
      <div onClick={()=>setToggle(!toggle)} className='flex items-center px-[15px] h-full cursor-pointer'>
        <FaBars className='w-[16px] h-[32px]' color='white'/>
     </div>

      </div>

     <div className=''>
        <div className='relative h-full cursor-pointer '>
            <div className='px-[15px] h-full flex flex-row items-center justify-center  after:inline-block after:w-0 after:h-0 after:ml-[0.255em] after:content-[""]  after:border-t-[0.3em] after:border-solid after:border-r-[0.3em] after:border-b-0 after:border-l-[.3em] after:border-r-transparent after:border-l-transparent'>
            <img src={Avatar} className='mr-[.5rem] align-middle w-[30px] h-[30px] rounded-full' color='white'/>
            <div className='text-white font-semibold' >
                Hi, Fatih Bahadır
            </div>
            </div>
        </div>
     </div>
    </div>
    </>

  )
}

export default NavBar
