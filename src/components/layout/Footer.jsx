import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Footer = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <footer className={`${theme ? "footer-dark" : "footer-light"}`}>
      <div className="footer-container">
        <p>&copy; 2024 HealthCare Portal. All rights reserved.</p>
        <p>
          Developed by{" "}
          <span className="footer-dev-name">Nehan Sudasinghe.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
