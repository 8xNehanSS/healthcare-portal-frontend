import "./Loader.css";
import Logo from "../../assets/logos/healthcare_logo.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Loader = () => {
  const [text, setText] = useState("Loading");
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((text) => {
        if (text === "Loading") return "\u00A0Loading.";
        if (text === "\u00A0Loading.") return "\u00A0\u00A0Loading..";
        return "\u00A0\u00A0\u00A0Loading...";
      });
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div className={`loader ${theme ? "loader-dark" : "loader-light"}`}>
      <img
        src={Logo}
        alt="logo"
        className={`loader-img ${theme ? "loader-img-dark" : ""}`}
      />
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
