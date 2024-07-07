import { Link } from "react-router-dom";

const Patients = () => {
  return (
    <div>
      <h1>Patients</h1>
      <Link to="/patients/register">Register</Link>
    </div>
  );
};

export default Patients;
