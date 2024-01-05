import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp, FaBars, FaCaretSquareUp, FaCaretUp, FaRegUser, FaSearch, FaSignOutAlt, FaUser, FaUserAlt, FaUserAltSlash } from 'react-icons/fa';
import Avatar from '../assets/avatar.png';
import useLogout from '../hooks/useLogout';
import useUser from '../hooks/useUser';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useThesis from '../hooks/useThesis';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ toggle, setToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState();
  const [searchInput, setSearchInput] = useState();
  const [inputDropdownOpen, setInputDropdownOpen] = useState(false);
  const { theses, setTheses } = useThesis();
  const [filteredTheses, setFilteredTheses] = useState([]);
  const logout = useLogout();
  const {user, setUser} = useUser();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleInputDropdown = () => {
    setInputDropdownOpen(!inputDropdownOpen);
  };

  const toggleSearchBar = () => {
    if (window.innerWidth >= 768) return;
    setSearchBarOpen(!searchBarOpen);
    setDropdownOpen(false);
    setInputOpen(!inputOpen);
  };

  const filterTheses = () =>{
    const filteredArray =  theses.filter((these)=> these.title?.toLowerCase().includes(searchInput?.toLowerCase()))
    setFilteredTheses(filteredArray);
  }

  useEffect(()=>{
    filterTheses();
  }, [searchInput])


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSearchBarOpen(true);
      } else {
        setSearchBarOpen(false);
      }
    };

    handleResize(); // İlk render'da kontrol etmek için
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=>{
    axios.get('/api/v1/user/current', {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }).
    then((res)=>{
      setUser(res.data.data)
      })
    .catch(err=>console.log(err)) 
}, [])

  function useOutsideAlerter(ref, action) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          action(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, action]);
  }

  useOutsideAlerter(dropdownRef, setDropdownOpen);
  useOutsideAlerter(searchBarRef, setSearchBarOpen);



  return (
  <>
      <div className={`transition-all h-[70px] left-0 right-[5px] z-[1] bg-main absolute items-center flex flex-nowrap justify-between py-[0.5rem] px-[1rem]`}>
        <div className='flex justify-center items-center gap-2 sm:gap-6'>
          <div onClick={() => setToggle(!toggle)} className='flex items-center px-[15px] h-full cursor-pointer'>
            <FaBars className='w-[16px] h-[32px]' color='white' />
          </div>
          {(searchBarOpen || window.innerWidth >= 768) ? (
          <div className={`${window.innerWidth >= 768 ? 'flex items-center w-full' : 'absolute top-4 w-full flex left-0 ml-[.2rem] z-[300]'} transition-all`} ref={searchBarRef}>
            <input
              type="text"
              placeholder="Search..."
              className="pl-[30px] py-[10px] pr-0 min-h-[46px] transition-all border-r-0 rounded rounded-r-none focus:outline-none z-[990] w-full md:w-[250px] "
              onClick={toggleInputDropdown}
              value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}

            />
            <button className='bg-white min-h-[46px] rounded rounded-l-none border-l-0 p-[8px] z-[990]'>
              <FaSearch />
            </button>
            {inputDropdownOpen && (
              <>
            <div className='dropdown-menu absolute top-16 mt-2 z-[990] rounded-md bg-white overflow-hidden transition duration-300 transform scale-y-100 opacity-100 w-full sm:w-auto'>
              <ul className='p-5 flex flex-col gap-3 items-center justify-center'>
                  {
                    filteredTheses.map((filtered)=>(
                      <h2>{filtered.title}</h2>
                    ))
                  }
                </ul>
            </div>
                       <div
                       className='fixed inset-0 bg-black bg-opacity-50 z-[980] transition-opacity duration-700'
                       onClick={() => {
                         setInputDropdownOpen(false)
                       }}
                     />
                </>
          )}
            {inputOpen && (
              <div
                className='fixed inset-0 bg-black bg-opacity-50 z-[980] transition-opacity duration-700'
                onClick={() => {
                  setInputOpen(false)
                  setSearchBarOpen(false);
                }}
              />
            )}
          </div>
        ) : (
          <div onClick={toggleSearchBar} className="cursor-pointer">
            <FaSearch color='white'/>
          </div>
        )}
        </div>

        <div className=''>
          <div className='relative h-full cursor-pointer' onClick={toggleDropdown}>
            <div className='px-[15px] h-full flex flex-row items-center justify-center after:inline-block after:w-0 after:h-0 after:ml-[0.255em] after:content-[""] after:border-t-[0.3em] after:border-solid after:border-r-[0.3em] after:border-b-0 after:border-l-[.3em] after:border-r-transparent after:border-l-transparent'>
              <img src={Avatar} className='mr-[.5rem] align-middle w-[30px] h-[30px] rounded-full' alt='Avatar' />
              <div className='text-white font-semibold'>
                Hi, {user?.firstname} {user?.lastname}
              </div>
            </div>
            <div
              ref={dropdownRef}
              className={`dropdown-menu origin-top-right shadow-xl absolute right-0 mt-2 rounded-md bg-white overflow-hidden transition duration-300 transform ${dropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
            >
              <ul className='p-5 flex flex-col gap-3 items-center justify-center'>
                <li onClick={()=>navigate(`/profile/${user.user_id}`)} className='py-1 px-3 flex items-center justify-center gap-3 text-sm'>
                  <FaRegUser />
                  Profile
                </li>
                <li onClick={logout} className='py-1 px-3 flex items-center justify-center gap-3 text-sm text-red-500'>
                  <FaSignOutAlt />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default NavBar;
