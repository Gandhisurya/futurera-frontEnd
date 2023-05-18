import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import A from "../../utils/api";
import useStudent from "../../hooks/useStudent";

function Production() {
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(true);

  const { student } = useStudent();

  const productionFormik = useFormik({
    initialValues: {
      material: "",
      projectDesign: "",
      status: "",
      printDuration: "",
      materialUsed: "",
      dateTime: "",
    },
    validationSchema: yup.object().shape({
      material: yup?.string().required("Material Required!"),
      projectDesign: yup?.string().required("Project Design Required!"),
      status: yup?.string().required("Status Required!"),
      printDuration: yup?.string().required("Print Duration Required!"),
      materialUsed: yup?.string().required("Material Required!"),
      dateTime: yup?.string().required("Date Time Required!"),
    }),
    onSubmit: (e) => {
      createProduction();
    },
  });

  const createProduction = async () => {
    try {
      await axios.post(A.HOST_STUDENT + A.ADD_PRODUCTION_DETAILS, {
        material: productionFormik?.values?.material,
        projectDesign: productionFormik?.values?.projectDesign,
        status: productionFormik?.values?.status,
        printDuration: productionFormik?.values?.printDuration,
        materialUsed: productionFormik?.values?.materialUsed,
        dateTime: productionFormik?.values?.dateTime,
        studentId: student?.studentId,
      });
      toast?.success("Production Details Updated! ✅");
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-fly bg-cover bg-fixed">
        <div className="flex flex-col items-center border w-[90vw] h-[570px] sm:h-[700px] lg:w-[60vw] xl:w-[35vw] p-5 sm:p-8 rounded-xl bg-[#2F58CD] bg-opacity-10 overflow-y-scroll">
          <p className="text-xl text-center sm:text-3xl font-sans text-[#2F58CD] font-extrabold">
            FuturEra
          </p>
          <p className="text-xl text-center sm:text-2xl font-sans text-[#2F58CD] font-extrabold">
            Production Tracker
          </p>
          <div className="mt-4">
            <p className="text-md mb-1 sm:text-lg font-bold text-black">
              Material
            </p>
            <select
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={productionFormik?.values?.material}
              onChange={(e) => {
                productionFormik?.setFieldValue("material", e?.target?.value);
                setDisable(false);
              }}
            >
              {productionFormik?.values?.material === "" ? (
                <option value="">Select Material</option>
              ) : null}
              <option value="Orange PLA">Orange PLA</option>
              <option value="Black PLA">Black PLA</option>
              <option value="Golden PLA">Golden PLA</option>
              <option value="Transparent PLA">Transparent PLA</option>
              <option value="Bule PLA">Bule PLA</option>
              <option value="Red PLA">Red PLA</option>
              <option value="Grey PLA">Grey PLA</option>
            </select>
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {productionFormik?.errors?.material ? (
              <span className="text-xs text-left font-semibold text-red-500">
                {productionFormik?.errors?.material}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <p className="text-md mb-1 sm:text-lg font-bold text-black">
              Project/Design
            </p>
            <input
              type="text"
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={productionFormik?.values?.projectDesign}
              onChange={(e) => {
                productionFormik?.setFieldValue(
                  "projectDesign",
                  e?.target?.value
                );
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {productionFormik?.errors?.projectDesign ? (
              <span className="text-xs text-left font-semibold text-red-500">
                {productionFormik?.errors?.projectDesign}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <p className="text-md mb-1 sm:text-lg font-bold text-black">
              Status
            </p>
            <select
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={productionFormik?.values?.status}
              onChange={(e) => {
                productionFormik?.setFieldValue("status", e?.target?.value);
                setDisable(false);
              }}
            >
              {productionFormik?.values?.status === "" ? (
                <option value="">Select Status</option>
              ) : null}
              <option value="In Progress">In Progress</option>
              <option value="Skipped">Skipped</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {productionFormik?.errors?.projectDesign ? (
              <span className="text-xs text-left font-semibold text-red-500">
                {productionFormik?.errors?.projectDesign}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <p className="text-md mb-1 sm:text-lg font-bold text-black">
              Print Duration
            </p>
            <input
              type="text"
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={productionFormik?.values?.printDuration}
              onChange={(e) => {
                productionFormik?.setFieldValue(
                  "printDuration",
                  e?.target?.value
                );
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {productionFormik?.errors?.printDuration ? (
              <span className="text-xs text-left font-semibold text-red-500">
                {productionFormik?.errors?.printDuration}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <p className="text-md mb-1 sm:text-lg font-bold text-black">
              Material used in grams
            </p>
            <input
              type="text"
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[80vw] lg:w-[50vw] xl:w-[30vw] pl-3"
              value={productionFormik?.values?.materialUsed}
              onChange={(e) => {
                productionFormik?.setFieldValue(
                  "materialUsed",
                  e?.target?.value
                );
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw]">
            {productionFormik?.errors?.materialUsed ? (
              <span className="text-xs text-left font-semibold text-red-500">
                {productionFormik?.errors?.materialUsed}
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex items-center">
            <p className="text-md mr-5 sm:text-lg font-bold text-black">Date</p>
            <input
              type="datetime-local"
              className="border border-zinc-200 rounded-lg h-8 sm:h-12 xl:h-10 w-[150px] lg:w-[200px] pl-3"
              value={productionFormik?.values?.dateTime}
              onChange={(e) => {
                productionFormik?.setFieldValue("dateTime", e?.target?.value);
                setDisable(false);
              }}
            />
          </div>
          <div className="w-[150px] lg:w-[200px]">
            {productionFormik?.errors?.dateTime ? (
              <span className="text-xs text-center font-semibold text-red-500">
                {productionFormik?.errors?.dateTime}
              </span>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-8 rounded-lg sm:text-xl h-10 sm:h-12 xl:h-10 w-[80vw] sm:w-[60vw] lg:w-[50vw] xl:w-[30vw] text-center bg-blue-600 text-white font-bold"
            disabled={disable}
            onClick={() => {
              productionFormik?.submitForm();
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
}

export default Production;
