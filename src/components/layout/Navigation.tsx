import { Link } from "react-router-dom";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";

import "./Navigation.css";

const Navigation = () => {
  const userType = useSelector((state: RootState) => state.user.value);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <p className="navbar-brand">HealthCare Portal</p>
        </Link>
      </div>
      <ul>
        {userType === 0 && NotloggedNavigation()}
        {userType === 1 && doctorNavigation()}
        {userType === 2 && patientNavigation()}
      </ul>
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
