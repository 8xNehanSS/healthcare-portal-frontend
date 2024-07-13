import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctor, setPatient, setPublic } from "../../state/user/userSlice";
import CheckLogin from "../../utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../state/logged/logSlice";
import { RootState } from "../../state/store";
import { setUser } from "../../state/data/dataSlice";
import "./Home.css";
import NewsList from "./news/News";

const Home = () => {
  const user = useSelector((state: RootState) => state.data.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ news: [], stories: [] });
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
        }
      }
    };

    checkTokenValidity();
  }, []);
  useEffect(() => {
    const getPublicData = async () => {
      const response = await fetch("http://localhost:3000/getpublic", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };

    getPublicData();
  }, []);

  let suffix = "HealthCare Portal";
  if (user.loginType === 1) {
    suffix = "Dr.";
  } else if (user.loginType === 2) {
    suffix = "Patient";
  }

  let text =
    "Have all your medical history at one place with all your needs! Register now to get started!";
  if (user.loginType === 1) {
    text = "Manage your patients and appointments with ease!";
  } else if (user.loginType === 2) {
    text = "Manage your appointments and prescriptions with ease!";
  }

  return (
    <>
      <div className="home">
        <div className="home-hero-container">
          <div className="home-hero-content">
            <p className="home-hero-welcome">
              Welcome {suffix} {user.lastName}{" "}
            </p>
            <p className="home-hero-text">{text}</p>
            <button
              className="home-hero-button"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              {!user.valid ? "Login" : "Dashboard"}
            </button>
          </div>
        </div>
      </div>
      <div className="news-list-main-container">
        <NewsList news={data.news} name="Portal Updates" className="newslist" />
        <NewsList
          news={data.stories}
          name="Medical Stories"
          className="newslist"
        />
      </div>
    </>
  );
};

export default Home;
