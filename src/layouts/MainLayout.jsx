import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState();
  const location = useLocation();
  return (
    <div className=''>
      {
        location.pathname === '/' &&
        <div className='navbar-bg content-[" "] absolute top-0 left-0 w-full h-[115px] bg-main z-[-1]'>
        </div>
      }

    <NavBar toggle={isOpen} setToggle={setIsOpen}/>
    <Sidebar toggle={isOpen} setToggle={setIsOpen}/>
    <div className='pl-[30px] pr-[30px] pt-[80px] max-w-screen min-h-screen pb-12'>
      <Outlet/>
    </div>
    </div>

  )
}

export default MainLayout
