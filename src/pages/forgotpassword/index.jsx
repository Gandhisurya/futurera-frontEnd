import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import A from "../../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const [showConPassword, setShowConPassword] = React.useState(false);

  const [disable, setDisable] = React.useState(true);

  const passwordFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(8, "Min 8 Letters Required")
        .max(15, "Min 15 Letters Required")
        .required("Password Required!"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password Required!"),
      email: yup.string().email("Enter Your Email").required("Email Required!"),
    }),
    onSubmit: (e) => {
      changePasswordData();
    },
  });

  const changePasswordData = async () => {
    try {
      await axios.post(A.HOST_STUDENT + A.CHANGE_PASSWORD, {
        email: passwordFormik?.values?.email,
        password: passwordFormik?.values?.password,
        confirmPassword: passwordFormik?.values?.confirmPassword,
      });
      toast?.success("Password Changed ✅");
      navigate("/login");
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#ECF2FF]">
        <div className="flex flex-col items-center border w-[90vw] lg:w-[60vw] xl:w-[40vw] p-5 sm:p-10 rounded-xl bg-[#2F58CD] bg-opacity-20 overflow-y-scroll">
          <p className="text-xl sm:text-3xl text-center font-bold mb-1 text-black">
            Change Password
          </p>
          <div className="mt-4">
            <p className="text-md font-bold mb-1 text-black">Email Adderss</p>
            <input
              required
              type="text"
              className="border border-zinc-200 text-black rounded-lg h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] pl-3"
              placeholder="futurera2023@gmail.com"
              value={passwordFormik?.values?.email}
              onChange={(e) => {
                passwordFormik?.setFieldValue("email", e?.target?.value);
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            {passwordFormik?.errors?.email ? (
              <span className="text-sm font-semibold text-red-500">
                {passwordFormik?.errors?.email}
              </span>
            ) : null}
          </div>
          <div className="relative mt-2">
            <p className="text-md font-bold mb-1 text-black">New Password</p>
            <input
              type={showPassword ? "text" : "password"}
              className="border border-zinc-200 text-black rounded-lg h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] pl-3"
              placeholder="8+ characters required"
              value={passwordFormik?.values?.password}
              onChange={(e) => {
                passwordFormik?.setFieldValue("password", e?.target?.value);
                setDisable(false);
              }}
            />
            <p
              className="absolute text-2xl inset-y-0 right-0 pr-3 flex top-8 items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </p>
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            {passwordFormik?.errors?.password ? (
              <span className="text-sm font-semibold text-red-500">
                {passwordFormik?.errors?.password}
              </span>
            ) : null}
          </div>
          <div className="relative mt-2">
            <p className="text-md font-bold mb-1 text-black">
              Confirm Password
            </p>
            <input
              type={showConPassword ? "text" : "password"}
              className="border border-zinc-200 text-black rounded-lg h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] pl-3"
              placeholder="confirm password"
              value={passwordFormik?.values?.confirmPassword}
              onChange={(e) => {
                passwordFormik?.setFieldValue(
                  "confirmPassword",
                  e?.target?.value
                );
                setDisable(false);
              }}
            />
            <p
              className="absolute text-2xl inset-y-0 right-0 pr-3 flex top-8 items-center"
              onClick={() => setShowConPassword(!showConPassword)}
            >
              {showConPassword ? <VscEyeClosed /> : <VscEye />}
            </p>
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[35vw]">
            {passwordFormik?.errors?.confirmPassword ? (
              <span className="text-sm font-semibold text-red-500">
                {passwordFormik?.errors?.confirmPassword}
              </span>
            ) : null}
          </div>
          <div className="mt-3">
            <button
              className="mt-4 rounded-lg sm:text-xl h-8 sm:h-12 w-[80vw] lg:w-[50vw] xl:w-[35vw] text-center bg-[#2F58CD] text-white font-bold"
              disabled={disable}
              onClick={() => {
                passwordFormik?.submitForm();
                setDisable(true);
              }}
              style={{
                opacity: disable ? 0.5 : 1,
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
