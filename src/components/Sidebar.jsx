import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaFileUpload, FaFileExport, FaUsersCog, FaFileInvoice, FaLanguage, FaSchool, FaPencilRuler, FaKey, FaBook } from "react-icons/fa";
import SidebarHeader from "./SidebarHeader";
import SidebarElement from "./SidebarElement";
import useUser from "../hooks/useUser";

const allowedRoles = ['MANAGER', 'ADMIN']

const Sidebar = ({toggle, setToggle}) => {
  const [active, setActive] = useState("/");
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    setToggle(true);
    setActive(location.pathname);
    console.log(user)
  }, [location]);

  useEffect(()=> {
    setToggle(true);
  }, [])
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggle(!toggle);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(sidebarRef)

  return (
    <>
 <div
      ref={sidebarRef}
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
      className={`${toggle ? '-translate-x-[250px] w-0' : 'translate-x-0 w-[250px]'}  overflow-hidden outline-none transition-all duration-600 fixed top-0 h-screen bg-[#fff] z-[880] left-0`}
    >
      <aside>

          <div className="inline-block w-full text-center h-[60px] font-semibold tracking-[1.5px] leading-[60px] transition-all">
          <Link to={"/"}>THESIS MANAGEMENT</Link>
        </div>


          <ul className="p-0 m-0 ">
          <SidebarHeader header={"HOME"} />
          <SidebarElement
            path={"/"}
            Icon={FaHome}
            text={"Home"}
            active={active}
          />

          <SidebarHeader header={"THESIS"} />
          <SidebarElement
            path={"/thesis"}
            Icon={FaFileAlt}
            text={"All Theses"}
            active={active}
          />
            <SidebarElement
            path={"/add-thesis"}
            Icon={FaFileUpload}
            text={"Add New Thesis"}
            active={active}
          />
          {
            allowedRoles?.includes(user?.authorities[0]?.authority) &&
            <>
            <SidebarHeader header='MANAGER' />
            <SidebarElement
              path={"/manager/theses"}
              Icon={FaFileExport}
              text={"Theses"}
              active={active}
            />
            <SidebarElement
              path={"/manager/professions"}
              Icon={FaUsersCog}
              text={"Professions"}
              active={active}
            />
            <SidebarElement
              path={"/manager/thesis-types"}
              Icon={FaFileInvoice}
              text={"Thesis Types"}
              active={active}
            />
            <SidebarElement
              path={"/manager/thesis-languages"}
              Icon={FaLanguage}
              text={"Thesis Languages"}
              active={active}
            />
            <SidebarElement
              path={"/manager/institutes"}
              Icon={FaPencilRuler}
              text={"Institutes"}
              active={active}
            />
            <SidebarElement
              path={"/manager/universities"}
              Icon={FaSchool}
              text={"Universities"}
              active={active}
            />          
            <SidebarElement
            path={"/manager/related-keywords"}
            Icon={FaKey}
            text={"Related Keywords"}
            active={active}
          />
            <SidebarElement
            path={"/manager/subjects"}
            Icon={FaBook}
            text={"Subjects"}
            active={active}
          />
          </>
          }
        
        </ul>

      </aside>
    </div>
    </>

  );
};

export default Sidebar;
