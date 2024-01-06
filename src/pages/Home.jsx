import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import UsersCompnent from "../components/UsersCompnent";
import useThesis from "../hooks/useThesis";
import Avatar from "../assets/avatar.png";
import Avatar2 from "../assets/avatar-2.png";
import RecentTheses from "../components/RecentTheses";
import MyThesis from "../components/MyThesis";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { auth } = useAuth();
  const { theses, setTheses } = useThesis();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    theses.length < 1 && setLoading(true);
    axios
      .get("/api/v1/thesis", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setTheses(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const calcTime = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const elapsedTime = currentDate - givenDate;
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24); // Calculate elapsed time in days

    return `${Math.floor(elapsedDays)} days ago`;
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-12">
        {theses
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((these) => (
            <div
              key={these.thesis_id}
              onClick={() => navigate(`/thesis-detail/${these.thesis_id}`)}
              className="bg-white rounded shadow flex justify-center p-5  flex-col gap-6 transition-all duration-300 cursor-pointer hover:shadow-xl"
            >
              {loading ? (
                <div className="min-h-[259px] flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <div className="flex gap-3 text-xs  text-[#34395e] font-semibold">
                    <div className="uppercase tracking">
                      {these.institute.institute_name.slice(13)}
                    </div>
                    <div className='after:content-["\2022"]'></div>
                    <div className="uppercase tracking-normal">
                      {calcTime(these.submission_date)}
                    </div>
                  </div>

                  <div className="text-main leading-[22px]  text-base font-semibold w-full h-full">
                    {these.title}
                  </div>
                  <p className="text-[#34395e] leading-[28px] -mt-3 text-sm  w-full h-full ">
                    {these.thesis_abstract}
                  </p>

                  <div className="flex gap-1 w-full items-center mt-5">
                    <img
                      className="w-[45px] rounded-full mr-[15px]"
                      src={these.author.gender === "MALE" ? Avatar : Avatar2}
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-main font-semibold leading-[24px]">
                        {these.author.firstname} {these.author.lastname}
                      </h2>
                      <p className="text-xs tracking-widest font-semibold text-[#34395e] uppercase">
                        {these.author.profession.profession_name}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      <div className="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-6 w-full gap-12 mt-12">
        <div className="col-span-6 lg:col-span-4">
          <UsersCompnent />
        </div>
        <div className="col-span-6 lg:col-span-2">
          <MyThesis />
        </div>
      </div>

      <div className="grid grid-cols-1 mt-12">
        <RecentTheses />
      </div>
    </>
  );
};

export default Home;
