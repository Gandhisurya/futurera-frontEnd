import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import A from "../../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const navigate = useNavigate();

  const [disable, setDisable] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConPassword, setShowConPassword] = React.useState(false);

  const registerFormik = useFormik({
    initialValues: {
      studentName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      studentName: yup
        .string()
        .min(3, "Min 3 Letters Required")
        .max(15, "Max 15 Letters Required")
        .required("student Name Required!"),
      password: yup
        .string()
        .min(8, "Min 8 Letters Required")
        .max(15, "Min 15 Letters Required")
        .required("Password Required!"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password Required!"),
      email: yup.string().email().min(10).max(30).required("Email Required!"),
    }),
    onSubmit: (e) => {
      registerData();
    },
  });

  const registerData = async () => {
    try {
      await axios.post(A.HOST_STUDENT + A.REGISTER, {
        studentName: registerFormik?.values?.studentName,
        password: registerFormik?.values?.password,
        confirmPassword: registerFormik?.values?.confirmPassword,
        email: registerFormik?.values?.email,
      });
      toast?.success("Register sucessfully ✅");
      navigate("/login");
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-screen bg-image bg-cover bg-fixed bg-no-repeat">
      <p className="text-3xl sm:text-6xl mb-10 font-sans text-white opacity-90 font-extrabold">
        FuturEra
      </p>
      <div className="flex flex-col items-center border-none w-[90vw] lg:w-[60vw] xl:w-[35vw] p-5 sm:p-8 rounded-xl bg-zinc-300 bg-opacity-50 overflow-y-scroll">
        <p className="text-2xl sm:text-4xl font-bold mb-4 text-center text-white">
          Register
        </p>
        <div className="pt-2">
          <p className="text-base sm:text-lg font-bold mb-1 text-white">
            Student Name
          </p>
          <input
            type="text"
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            placeholder="name"
            value={registerFormik?.values?.studentName}
            onChange={(e) => {
              registerFormik?.setFieldValue("studentName", e?.target?.value);
              setDisable(false);
            }}
          />
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {registerFormik?.errors?.studentName ? (
            <span className="text-sm font-semibold text-red-500">
              {registerFormik?.errors?.studentName}
            </span>
          ) : null}
        </div>

        <div className="pt-2">
          <p className="text-base sm:text-lg font-bold mb-1 text-white">
            Email Address
          </p>
          <input
            required
            type="text"
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            placeholder="futurera2023@gmail.com"
            value={registerFormik?.values?.email}
            onChange={(e) => {
              registerFormik?.setFieldValue("email", e?.target?.value);
              setDisable(false);
            }}
          />
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {registerFormik?.errors?.email ? (
            <span className="text-sm font-semibold text-red-500">
              {registerFormik?.errors?.email}
            </span>
          ) : null}
        </div>

        <div className="relative pt-2">
          <p className="text-base sm:text-lg font-bold mb-1 text-white">
            Password
          </p>
          <input
            type={showPassword ? "text" : "password"}
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            placeholder="8+ characters required"
            value={registerFormik?.values?.password}
            onChange={(e) => {
              registerFormik?.setFieldValue("password", e?.target?.value);
              setDisable(false);
            }}
          />
          <p
            className="absolute text-xl inset-y-0 right-0 pr-3 flex top-9 items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VscEyeClosed /> : <VscEye />}
          </p>
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {registerFormik?.errors?.password ? (
            <span className="text-sm font-semibold text-red-500">
              {registerFormik?.errors?.password}
            </span>
          ) : null}
        </div>

        <div className="relative pt-2">
          <p className="text-base sm:text-lg font-bold mb-1 text-white">
            Confirm Password
          </p>
          <input
            type={showConPassword ? "text" : "password"}
            className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
            placeholder="confirm password"
            value={registerFormik?.values?.confirmPassword}
            onChange={(e) => {
              registerFormik?.setFieldValue(
                "confirmPassword",
                e?.target?.value
              );
              setDisable(false);
            }}
          />
          <p
            className="absolute text-xl inset-y-0 right-0 pr-3 flex top-9 items-center"
            onClick={() => setShowConPassword(!showConPassword)}
          >
            {showConPassword ? <VscEyeClosed /> : <VscEye />}
          </p>
        </div>
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
          {registerFormik?.errors?.confirmPassword ? (
            <span className="text-sm font-semibold text-red-500">
              {registerFormik?.errors?.confirmPassword}
            </span>
          ) : null}
        </div>

        <div className="py-2">
          <button
            type="submit"
            disabled={disable}
            className="mt-3 rounded-lg sm:text-xl h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] text-center bg-[#1e45ae] text-white font-bold"
            onClick={() => {
              registerFormik?.submitForm();
            }}
            style={{
              opacity: disable ? 0.5 : 1,
            }}
          >
            Register
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-2 items-center pt-2">
        <p className="text-zinc-300 text-md sm:text-xl xl:text-lg text-center pb-3 font-medium">
          Already Have Account{" "}
          <span
            className="font-semibold text-white hover:font-extrabold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            login{" "}
          </span>
          Here
        </p>
      </div>
    </div>
  );
};

export default Register;
