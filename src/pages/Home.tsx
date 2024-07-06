import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDoctor, setPatient, setPublic } from "../state/user/userSlice";
import CheckLogin from "../utils/CheckLogin";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const data = await CheckLogin();
      if (data.valid) {
        if (data.type === 1) {
          dispatch(setDoctor());
        } else if (data.type === 2) {
          dispatch(setPatient());
        } else {
          dispatch(setPublic());
        }
        navigate("/");
      }
    };

    checkTokenValidity();
  }, []);

  return <div>Test</div>;
};

export default Home;
