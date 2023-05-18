import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = React.lazy(() => import("./pages/register"));
const Login = React.lazy(() => import("./pages/login"));
const Attendence = React.lazy(() => import("./pages/attendence"));
const Nature = React.lazy(() => import("./pages/natureofwork"));
const Production = React.lazy(() => import("./pages/production"));
const Main = React.lazy(() => import("./pages/mainpage"));
const ForgotPassword = React.lazy(() => import("./pages/forgotpassword"));

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/natureOfWork" element={<Nature />} />
          <Route path="/production" element={<Production />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
