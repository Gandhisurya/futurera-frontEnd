const mode = "LIVE"; // LOCAL, TEST, LIVE

const API = {
  HOST_STUDENT: "",
  LOGIN: "/api/student/login",
  REGISTER: "/api/student/register",
  ATTENDANCE: "/api/student/attendance",
  CHANGE_PASSWORD: "/api/student/changePassword",
  ADD_PRODUCTION_DETAILS: "/api/student/addProductionDetails",
  ADD_WORKDONE_DETAILS: "/api/student/addWorkDoneDetails",
};

if (mode === "LOCAL") API["HOST_STUDENT"] = "http://localhost:3001";
if (mode === "LIVE") API["HOST_STUDENT"] = "https://backend.futurera.website";
// if (mode === "LIVE") API["HOST_STUDENT"] = "https://node.futurera.website";

export default API;
