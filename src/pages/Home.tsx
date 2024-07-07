import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDoctor, setPatient, setPublic } from "../state/user/userSlice";
import CheckLogin from "../utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../state/logged/logSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const data = await CheckLogin();
      if (data.valid) {
        dispatch(setLogged());
        if (data.type === 1) {
          dispatch(setDoctor());
        } else if (data.type === 2) {
          dispatch(setPatient());
        } else {
          dispatch(setPublic());
        }
      } else {
        navigate("/login");
      }
    };

    checkTokenValidity();
  }, []);

  return <div>Test</div>;
};

export default Home;
