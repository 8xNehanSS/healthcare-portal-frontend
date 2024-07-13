import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctor, setPatient, setPublic } from "../../state/user/userSlice";
import CheckLogin from "../../utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../state/logged/logSlice";
import { RootState } from "../../state/store";
import { setUser } from "../../state/data/dataSlice";
import "./Home.css";
import heroBgImage from "../../assets/images/homebg.png";
import News from "../../utils/news";
import NewsList from "./news/News";

const Home = () => {
  const user = useSelector((state: RootState) => state.data.value);
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
        }
      }
    };

    checkTokenValidity();
  }, []);

  const suffix = user.loginType === 1 ? "Dr." : "Patient";
  const text =
    user.loginType === 1
      ? "Here you can manage your patients and appointments"
      : "Here you can manage your appointments and prescriptions";

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
              Dashboard
            </button>
          </div>
        </div>
      </div>
      <div className="news-list-main-container">
        <NewsList news={news} name="Portal Updates" />
        <NewsList news={news} name="Medical Stories" />
      </div>
    </>
  );
};

export default Home;

const news: News[] = [
  new News(
    1,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    2,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    3,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    4,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
];

const news2: News[] = [
  new News(
    1,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    2,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    3,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
  new News(
    4,
    "New Feature",
    "We have added a new feature that allows you to view your medical history"
  ),
];
