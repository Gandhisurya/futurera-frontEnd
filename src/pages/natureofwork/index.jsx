import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import A from "../../utils/api";
import useStudent from "../../hooks/useStudent";

const Nature = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(true);

  const { student } = useStudent();

  const workFormik = useFormik({
    initialValues: {
      studentName: "",
      workDone: "",
      dateTime: "",
    },
    validationSchema: yup.object().shape({
      studentName: yup.string().required("Enter Registerd Required!"),
      workDone: yup.string().min(10).max(200).required("Work Done Required!"),
      dateTime: yup.string().required("Date Required!"),
    }),
    onSubmit: (e) => {
      createWorkDone();
    },
  });

  const createWorkDone = async () => {
    try {
      await axios.post(A.HOST_STUDENT + A.ADD_WORKDONE_DETAILS, {
        studentName: workFormik?.values?.studentName,
        workDone: workFormik?.values?.workDone,
        dateTime: workFormik?.values?.dateTime,
        studentId: student?.studentId,
      });
      toast?.success("Work Details Updated! ✅");
      navigate("/main");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-lap bg-cover">
        <div className="flex flex-col items-center border w-[90vw] h-[450px] sm:h-[530px] lg:w-[60vw] xl:w-[35vw] p-5 sm:p-8 rounded-xl bg-[#2F58CD] bg-opacity-20 overflow-y-scroll">
          <p className="text-xl text-center sm:text-3xl font-sans text-[#2F58CD] font-extrabold">
            Nature of Work-2023
          </p>
          <p className="text-lg text-center sm:text-2xl mb-8 font-sans text-[#2F58CD] font-extrabold">
            கலை விதைப்போம்💯
          </p>
          <div className="">
            <p className="text-md mb-2 sm:text-lg font-bold text-black">
              Your Name
            </p>
            <input
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={workFormik?.values?.studentName}
              onChange={(e) => {
                workFormik?.setFieldValue("studentName", e?.target?.value);
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {workFormik?.errors?.studentName ? (
              <span className="text-sm text-left font-semibold text-red-500">
                {workFormik?.errors?.studentName}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <p className="text-md mb-2 sm:text-lg font-bold text-black">
              Kind Of Work Done
            </p>
            <textarea
              className="border pt-2 border-zinc-200 rounded-lg h-12 sm:h-16 xl:h-20 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              // value={workFormik?.values?.workDone}
              onChange={(e) => {
                workFormik?.setFieldValue("workDone", e?.target?.value);
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {workFormik?.errors?.workDone ? (
              <span className="text-sm text-left font-semibold text-red-500">
                {workFormik?.errors?.workDone}
              </span>
            ) : null}
          </div>
          <div className="flex items-center mt-4">
            <p className="text-md mr-5 sm:text-lg font-bold text-black">Date</p>
            <input
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[150px] lg:w-[200px] pl-3"
              value={workFormik?.values?.dateTime}
              onChange={(e) => {
                workFormik?.setFieldValue("dateTime", e?.target?.value);
                setDisable(false);
              }}
              type="datetime-local"
            />
          </div>
          <div className="w-[150px] lg:w-[200px]">
            {workFormik?.errors?.dateTime ? (
              <span className="text-sm text-center font-semibold text-red-500">
                {workFormik?.errors?.dateTime}
              </span>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-10 rounded-lg sm:text-xl h-10 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] text-center bg-blue-600 text-white font-bold"
            disabled={disable}
            onClick={() => {
              workFormik?.submitForm();
              setDisable(true);
            }}
            style={{
              opacity: disable ? 0.5 : 1,
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Nature;
