import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import image from "../../logo.png";
import useStudent from "../../hooks/useStudent";
import { AiOutlineLogout } from "react-icons/ai";

function Main() {
  const navigate = useNavigate();

  const { student, setStudent } = useStudent();

  return student ? (
    <div className="flex flex-col items-center min-h-screen w-screen md:bg-desktop bg-mobile bg-cover bg-center bg-fixed bg-no-repeat overflow-y-scroll">
      <div className="flex justify-between items-center h-20 w-full border-b-2 shadow-lg">
        <p className="hidden sm:flex text-xl ml-3 sm:ml-10 sm:text-3xl text-blue-700 font-semibold hover:font-extrabold">
          Welcome To FuturEra
        </p>
        <img
          src={image}
          alt=""
          className="ml-5 w-20 h-16 object-cover sm:hidden"
        />
        <div className="flex items-center">
          <p className="mr-2 sm:mr-5 sm:text-2xl text-lg text-[#112D4E] font-semibold">
            {student?.studentName}
          </p>
          <AiOutlineLogout
            className="text-2xl mr-2 text-red-500 cursor-pointer"
            onClick={() => setStudent(null)}
          />
        </div>
      </div>
      <div className="flex mt-20 lg:mt-16 flex-wrap sm:gap-y-6 md:flex-row flex-col justify-center items-center">
        <p
          className="border-none bg-blue-400 bg-opacity-10 hover:bg-opacity-30 shadow-2xl shadow-zinc-400/50 text-center py-4 sm:py-8 md:py-6 lg:py-12 text-[#112D4E] font-semibold sm:text-2xl w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[35vw] m-2 rounded-lg cursor-pointer"
          onClick={() => {
            navigate("/attendence");
          }}
        >
          Attendence Login
        </p>
        <p
          className="border-none bg-blue-400 bg-opacity-10 hover:bg-opacity-30 shadow-2xl shadow-zinc-400/50  text-center py-4 sm:py-8 md:py-6 lg:py-12 text-[#112D4E] font-semibold sm:text-2xl w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[35vw] m-2 rounded-lg cursor-pointer"
          onClick={() => {
            navigate("/production");
          }}
        >
          Production Tracker
        </p>
        <p
          className="border-none bg-blue-400 bg-opacity-10 hover:bg-opacity-30 shadow-2xl shadow-zinc-400/50 text-center py-4 sm:py-8 md:py-6 lg:py-12 text-[#112D4E] font-semibold sm:text-2xl w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[35vw] m-2 rounded-lg cursor-pointer"
          onClick={() => {
            navigate("/natureofwork");
          }}
        >
          Nature Of Work
        </p>
      </div>
    </div>
  ) : (
    <Navigate to={"login"} />
  );
}

export default Main;
