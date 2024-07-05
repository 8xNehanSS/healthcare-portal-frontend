import { Link } from "react-router-dom";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import logoImage from "../../assets/logos/navbar-m-menu.png"; // Adjust the path as necessary

import "./Navigation.css";

const Navigation = () => {
  const userType = useSelector((state: RootState) => state.user.value);
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
          <p className="navbar-brand">HealthCare Portal</p>
        </Link>
      </div>
      <div
        className={`navbar-m-button ${menuOpen ? "navbar-m-button-open" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <img src={logoImage} alt="navbar-button" className="navbar-button" />
      </div>
      <div className={`navbar-list ${menuOpen ? "navbar-open" : ""}`}>
        <ul
          className={`${
            viewPortWidth > 1024 ? "navbar-list-ul" : "navbar-list-ul-m"
          }`}
        >
          {userType === 0 && NotloggedNavigation()}
          {userType === 1 && doctorNavigation()}
          {userType === 2 && patientNavigation()}
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
        <Link to="/what-people-say">Reviews</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
    </>
  );
}

function doctorNavigation() {
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
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </>
  );
}

function patientNavigation() {
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
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </>
  );
}
