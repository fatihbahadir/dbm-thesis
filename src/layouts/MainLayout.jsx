import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <div>
    <div className={`w-screen fixed top-0 duration-300 h-screen ${!isOpen && 'bg-[rgba(0,0,0,0.3)] z-[2]'}`}>
    </div>
    <div className='navbar-bg content-[" "] absolute top-0 left-0 w-full h-[115px] bg-main z-[-1]'>
    </div>
    <NavBar toggle={isOpen} setToggle={setIsOpen}/>
    <Sidebar toggle={isOpen} setToggle={setIsOpen}/>
    <div className='pl-[30px] pr-[30px] pt-[80px] max-w-screen min-h-screen'>
      <Outlet/>
    </div>
    </div>

  )
}

export default MainLayout