import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import A from "../../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsKeyFill } from "react-icons/bs";
import useStudent from "../../hooks/useStudent";

const Login = () => {
  const navigate = useNavigate();

  const [disable, setDisable] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const { setStudent } = useStudent();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Enter a Valid Email Address!")
        .required("Email Required!"),
      password: yup.string().required("Password Required!"),
    }),
    onSubmit: (e, { resetForm }) => {
      loginData();
      resetForm();
    },
  });

  const loginData = async () => {
    try {
      const { data } = await axios.post(A.HOST_STUDENT + A.LOGIN, {
        email: loginFormik?.values?.email,
        password: loginFormik?.values?.password,
      });
      setStudent(data);
      toast?.success("Login sucessfully ✅");
      navigate("/main");
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-image bg-cover bg-no-repeat bg-fixed">
        <p className="text-3xl sm:text-6xl mb-10 font-sans text-white opacity-90 font-extrabold">
          FuturEra
        </p>
        <div className="flex flex-col items-center border-none w-[90vw] lg:w-[60vw] xl:w-[40vw] p-5 sm:p-10 rounded-xl bg-zinc-300 bg-opacity-50 overflow-y-scroll">
          <p className="text-2xl sm:text-4xl text-center font-bold mb-1 opacity-90 text-white">
            Login
          </p>
          <div className="mt-2">
            <p className="text-base font-bold mb-1 text-white opacity-90">
              Email Address
            </p>
            <input
              required
              type="text"
              className="border border-zinc-200 text-black rounded-lg h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] pl-3"
              placeholder="futurera2023@gmail.com"
              value={loginFormik?.values?.email}
              onChange={(e) => {
                loginFormik?.setFieldValue("email", e?.target?.value);
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            {loginFormik?.errors?.email ? (
              <span className="text-sm font-semibold text-red-500">
                {loginFormik?.errors?.email}
              </span>
            ) : null}
          </div>

          <div className="relative mt-2">
            <p className="text-base font-bold mb-1 text-white opacity-90">
              Password
            </p>
            <input
              type={showPassword ? "text" : "password"}
              className="border border-zinc-200 text-black rounded-lg h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] pl-3"
              placeholder="8+ characters required"
              value={loginFormik?.values?.password}
              onChange={(e) => {
                loginFormik?.setFieldValue("password", e?.target?.value);
                setDisable(false);
              }}
            />
            <p
              className="absolute text-xl inset-y-0 right-0 pr-3 flex top-8 items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </p>
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            {loginFormik?.errors?.password ? (
              <span className="text-sm font-semibold text-red-500">
                {loginFormik?.errors?.password}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-end w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            <BsKeyFill className="mt-2 mr-1 text-2xl" />
            <p
              className="text-sm underline text-right cursor-pointer mt-2 text-blue-800 bg-opacity-50 hover:font-extrabold font-semibold"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </p>
          </div>
          <div className="mt-3">
            <button
              className="mt-4 rounded-lg sm:text-xl h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] text-center bg-[#1e45ae] text-white font-bold"
              disabled={disable}
              onClick={() => {
                loginFormik?.submitForm();
                setDisable(true);
              }}
              style={{
                opacity: disable ? 0.5 : 1,
              }}
            >
              Login
            </button>
          </div>
        </div>
        <p className="text-zinc-300 mt-5 text-md sm:text-xl xl:text-lg text-center pb-3 font-medium">
          Create a New Account?{" "}
          <span
            className="font-semibold text-white hover:font-extrabold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register{" "}
          </span>
        </p>
      </div>
    </>
  );
};
export default Login;
