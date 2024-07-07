import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import menuImage from "../../assets/logos/navbar-m-menu.png";
import logoImage from "../../assets/logos/healthcare_logo.png";

import "./Navigation.css";
import { unsetLogged } from "../../state/logged/logSlice";
import Logout from "../../utils/Logout";

const Navigation = () => {
  const userType = useSelector((state: RootState) => state.user.value);
  const logStatus = useSelector((state: RootState) => state.log.value);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth);
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logoImage} alt="logo" className="logo" />
        </Link>
      </div>
      <div
        className={`navbar-m-button ${menuOpen ? "navbar-m-button-open" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <img src={menuImage} alt="navbar-button" className="navbar-button" />
      </div>
      <div className={`navbar-list ${menuOpen ? "navbar-open" : ""}`}>
        <ul
          className={`${
            viewPortWidth > 1024 ? "navbar-list-ul" : "navbar-list-ul-m"
          }`}
        >
          {userType === 0 && NotloggedNavigation()}
          {logStatus && userType === 1 && DoctorNavigation()}
          {logStatus && userType === 2 && PatientNavigation()}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

function NotloggedNavigation() {
  return (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/what-people-say">Reviews</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
    </>
  );
}

function DoctorNavigation() {
  const dispatch = useDispatch();

  const HandleLogout = async () => {
    document.cookie =
      "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(unsetLogged());
    await Logout();
  };
  return (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/appointments">Appointments</Link>
      </li>
      <li>
        <Link to="/patients">Patients</Link>
      </li>
      <li>
        <Link to="/messages">Messages</Link>
      </li>
      <li>
        <Link to="/reports">Reports</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
      <li onClick={HandleLogout}>
        <a href="/login" onClick={(e) => e.preventDefault()}>
          Logout
        </a>
      </li>
    </>
  );
}

function PatientNavigation() {
  const dispatch = useDispatch();

  const HandleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(unsetLogged());
    await Logout();
  };
  return (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/appointments">Appointments</Link>
      </li>
      <li>
        <Link to="/doctors">Doctors</Link>
      </li>
      <li>
        <Link to="/messages">Messages</Link>
      </li>
      <li>
        <Link to="/records">Billing & Payments</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
      <li onClick={HandleLogout}>
        <a href="/login" onClick={(e) => e.preventDefault()}>
          Logout
        </a>
      </li>
    </>
  );
}
