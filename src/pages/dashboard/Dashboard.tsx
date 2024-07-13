import { useEffect } from "react";
import { setUser } from "../../state/data/dataSlice";
import { setLogged } from "../../state/logged/logSlice";
import { setDoctor, setPatient, setPublic } from "../../state/user/userSlice";
import CheckLogin from "../../utils/CheckLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
