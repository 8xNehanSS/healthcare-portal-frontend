import React, { useEffect, useState } from "react";
import "./Register.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../../state/logged/logSlice";
import {
  setDoctor,
  setPatient,
  setPublic,
} from "../../../state/user/userSlice";
import CheckLogin from "../../../utils/CheckLogin";
import FloatLoader from "../../../components/common/FloatLoader";
import { setUser } from "../../../state/data/dataSlice";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(0);
  const [errorUsername, setErrorUsername] = useState([""]);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const CheckUsername = async () => {
    if (username === "") return;
    const response = await fetch("http://localhost:3000/validate-username", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    if (response.ok) {
      setErrorUsername([""]);
      setDisabled(false);
    } else {
      setDisabled(true);
      setErrorUsername(["Username already exists."]);
      return true;
    }
  };

  useEffect(() => {
    CheckUsername();
  }, [username]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const valid = await CheckUsername();
    if (valid) return;
    setLoading(true);
    const type = 2;
    const data = {
      firstName,
      lastName,
      address,
      email,
      age,
      birthday,
      username,
      password,
      type,
    };
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 3000);
    }
  };

  async function HandlePage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (event.currentTarget.textContent === "Previous") {
      setPage(0);
    } else {
      const res = await checkInputs();
      if (res) {
        setPage(1);
      }
    }
  }

  const checkInputs = async () => {
    const errors = [];

    if (firstName.trim() === "") {
      errors.push("First name is required.");
    }

    if (lastName.trim() === "") {
      errors.push("Last name is required.");
    }

    if (address.trim() === "") {
      errors.push("Address is required.");
    }

    if (email.trim() === "") {
      errors.push("Email is required.");
    }

    if (age <= 0) {
      errors.push("Age must be a positive number.");
    }

    if (!birthday) {
      errors.push("Birthday is required.");
    }
    setErrors(errors);
    if (errors.length > 0) {
      return false;
    }
    return true;
  };

  const PageOne = () => {
    return (
      <>
        <div
          className={`${
            errors.length == 0 ? `float-hide` : "form-error-float"
          }`}
        >
          {errors.map((error, index) => (
            <p key={index} className="">
              {error}
            </p>
          ))}
        </div>

        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday ? birthday.toISOString().split("T")[0] : ""}
            onChange={(event) => setBirthday(new Date(event.target.value))}
          />
        </label>
        <p className="form-error">Please fill out all fields.</p>
      </>
    );
  };

  const PageTwo = () => {
    return (
      <>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <p className="form-error">{errorUsername}</p>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {disabled ? (
          <button disabled className="disabled">
            Register
          </button>
        ) : (
          <button type="submit">Register</button>
        )}
      </>
    );
  };

  //check login
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const data = await CheckLogin();
      if (data && data.valid) {
        dispatch(setUser(data));
        dispatch(setLogged());
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
    };

    checkTokenValidity();
  }, []);

  return (
    <>
      {loading ? (
        <FloatLoader />
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <p className="form-p">Patient Registration Form</p>
          </div>
          {page == 0 ? PageOne() : PageTwo()}
          {page === 0 ? "" : <button onClick={HandlePage}>Previous</button>}
          {page === 1 ? "" : <button onClick={HandlePage}>Continue</button>}
        </form>
      )}
    </>
  );
};

export default Register;
