import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { FaPlusSquare, FaUserCog } from 'react-icons/fa';
import AddProfessionModal from '../components/AddProfessionModal';
import ProfessionModal from '../components/ProfessionModal';

const ManageProfessions = () => {
  const [loading, setLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const { auth } = useAuth();
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState();



  const getProfessions = async () => {
    setLoading(true);
    try {
      const professionResponse = await axios.get("/api/v1/profession", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setProfessions(professionResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeProfessionModal = () => {
    setSelectedProfession(null)
  };

  const openProfessionModal = (profession) => {
    setSelectedProfession(profession);
  };

  
  useEffect(()=>{
    getProfessions();
  }, [])

  useEffect(()=>{
    isChanged && getProfessions();
  }, [])

  return (
    <div className='w-full h-full'>
                  {isModalOpen && (
        <AddProfessionModal isChanged={isChanged} setIsChanged={setIsChanged} closeModal={closeModal}  />
      )}
      {
        selectedProfession &&
        <ProfessionModal profession={selectedProfession} isChanged={isChanged} setIsChanged={setIsChanged} closeModal={closeProfessionModal}  />

      }

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {professions.map((profession)=>(
            <div onClick={()=>openProfessionModal(profession)} key={profession.profession_id} className='bg-white transition hover:scale-105 cursor-pointer hover:shadow-2xl shadow-lg p-5 rounded m-6 flex justify-between items-center'>
              <h2 className='tracking-wider font-bold'>{profession.profession_name}</h2>
              <div className='bg-main rounded text-white p-5'>
              <FaUserCog className='w-[2em] h-[2em]' />
              </div>
            </div>
          ))}
          <div onClick={openModal} className='bg-white transition hover:scale-105 hover:shadow-2xl shadow-lg p-5 m-6 flex justify-between items-center cursor-pointer'>
          <h2 className='tracking-wider font-bold'>ADD NEW PROFESSION</h2>
              <div className='bg-main rounded text-white p-5'>
              <FaPlusSquare className='w-[2em] h-[2em]' />
              </div>        
          </div>
        </div>
    </div>
  )
}

export default ManageProfessions
