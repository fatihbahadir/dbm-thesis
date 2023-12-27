import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaFileUpload } from "react-icons/fa";
import SidebarHeader from "./SidebarHeader";
import SidebarElement from "./SidebarElement";

const Sidebar = ({toggle, setToggle}) => {
  const [active, setActive] = useState("/");
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    setToggle(true);
    setActive(location.pathname);
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
      className={`${toggle ? '-translate-x-[250px]' : 'translate-x-0'} w-[250px] overflow-hidden outline-none transition-all duration-300 absolute  top-0 h-full bg-[#fff] z-[880] left-0`}
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
        </ul>

      </aside>
    </div>
    </>

  );
};

export default Sidebar;
