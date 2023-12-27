import React from 'react'
import { Link } from 'react-router-dom'

const SidebarElement = ({ path, active, text, Icon}) => {
  return (
    <li>
    <Link className={`${active === path && '!font-semibold !text-main before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[25px] before:w-[4px] before:bg-main' } relative flex justify-center items-center h-[50px] py-0 px-[20px] w-full text-[#868e96] transition-all hover:text-main`} to={path}>
        <Icon className='w-[28px] mr-[20px] text-center ' />
        <span className='w-full mt-[.1rem] text-sm'>{text}</span>
    </Link>
</li>
  )
}

export default SidebarElement
