import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctor, setPatient, setPublic } from "../state/user/userSlice";
import CheckLogin from "../utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../state/logged/logSlice";
import { RootState } from "../state/store";
import { setUser } from "../state/data/dataSlice";

const Home = () => {
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

  const user = useSelector((state: RootState) => state.data.value);
  console.log(user);

  return (
    <div>
      <h1>Welcome Dr. {user.lastName} </h1>
    </div>
  );
};

export default Home;
