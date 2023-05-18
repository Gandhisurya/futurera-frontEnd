import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import A from "../../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useStudent from "../../hooks/useStudent";

const Attendence = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(true);

  const { student } = useStudent();

  const attendanceFormik = useFormik({
    initialValues: {
      studentName: "",
      loginStatus: "",
      studentId: "",
    },
    validationSchema: yup.object().shape({
      studentName: yup.string().required("Enter Registered Name!"),
      loginStatus: yup.string().required("Login Status Required!"),
    }),
    onSubmit: (e) => {
      addAttendance();
    },
  });

  const addAttendance = async () => {
    try {
      await axios.post(A.HOST_STUDENT + A.ATTENDANCE, {
        studentName: attendanceFormik?.values?.studentName,
        loginStatus: attendanceFormik?.values?.loginStatus,
        studentId: student?.studentId,
      });
      toast?.success("Attendance Done ✅");
      navigate("/main");
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#ECF2FF]">
      <h2 className="text-2xl sm:text-4xl mb-10 font-sans text-[#2F58CD] font-extrabold">
        Attendance Details
      </h2>
      <div className="flex flex-col justify-center items-center border w-[90vw] h-[280px] sm:h-[350px] lg:w-[60vw] xl:w-[35vw] p-5 sm:p-8 rounded-xl bg-[#2F58CD] bg-opacity-20 overflow-y-scroll">
        <div className="mt-2">
          <p className="text-md py-2 sm:text-lg font-bold mb-1 text-black">
            Your Name
          </p>
          <input
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            value={attendanceFormik?.values?.studentName}
            onChange={(e) => {
              attendanceFormik?.setFieldValue("studentName", e?.target?.value);
              setDisable(false);
            }}
          />
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {attendanceFormik?.errors?.studentName ? (
            <span className="text-sm text-left font-semibold text-red-500">
              {attendanceFormik?.errors?.studentName}
            </span>
          ) : null}
        </div>

        <div className="mt-2">
          <p className="text-md sm:text-lg font-bold mb-1 text-black">
            Attendance
          </p>
          <select
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            value={attendanceFormik?.values?.loginStatus}
            onChange={(e) => {
              attendanceFormik?.setFieldValue("loginStatus", e?.target?.value);
              setDisable(false);
            }}
          >
            {attendanceFormik?.values?.loginStatus === "" ? (
              <option value="">Select</option>
            ) : null}
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {attendanceFormik?.errors?.loginStatus ? (
            <span className="text-sm font-semibold text-red-500">
              {attendanceFormik?.errors?.loginStatus}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={disable}
          className="mt-6 py-1 rounded-lg sm:text-xl h-10 sm:h-12 xl:h-10 w-[80vw] sm:w-[60vw] lg:w-[50vw] xl:w-[30vw] text-center bg-blue-600 text-white font-bold"
          style={{
            opacity: disable ? 0.5 : 1,
          }}
          onClick={() => {
            attendanceFormik?.submitForm();
            setDisable(true);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Attendence;
