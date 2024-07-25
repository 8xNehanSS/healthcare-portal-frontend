// package imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";

// redux imports
import { store } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { endLoader } from "./state/loader/loaderSlice";

// pages
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AboutUs from "./pages/About";

// components
import Loader from "./components/common/Loader";
import "./index.css";
import Patients from "./pages/patients/Patients";
import RegisterPatients from "./pages/patients/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Appointment from "./pages/appointments/appointment/Appointment";
import AllAppointments from "./pages/appointments/AllAppointments";

export default function App() {
  const loader = useSelector((state: RootState) => state.loader.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(endLoader());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  });

  if (loader) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/register" element={<RegisterPatients />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/view-appointment/:docid/:id"
            element={<Appointment />}
          />
          <Route path="/appointments" element={<AllAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
