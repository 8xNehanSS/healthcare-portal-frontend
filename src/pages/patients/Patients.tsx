import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../state/data/dataSlice";
import { setLogged } from "../../state/logged/logSlice";
import { setDoctor, setPatient, setPublic } from "../../state/user/userSlice";
import CheckLogin from "../../utils/CheckLogin";

const Patients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const data = await CheckLogin();
      if (data != null) {
        if (data && data.valid) {
          dispatch(setUser(data));
          dispatch(setLogged());
          console.log(data.loginType);
          if (data.loginType === 1) {
            dispatch(setDoctor());
          } else if (data.loginType === 2) {
            dispatch(setPatient());
            navigate("/dashboard");
          } else {
            dispatch(setPublic());
          }
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkTokenValidity();
  }, []);
  return (
    <div>
      <h1>Patients</h1>
      <Link to="/patients/register">Register</Link>
    </div>
  );
};

export default Patients;
