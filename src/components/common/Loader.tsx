import "./Loader.css";
import Logo from "../../assets/logos/healthcare_logo.png";
import { useEffect, useState } from "react";

const Loader = () => {
  const [text, setText] = useState("Loading");

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
    <div className="loader">
      <img src={Logo} alt="logo" className="loader-img" />
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
