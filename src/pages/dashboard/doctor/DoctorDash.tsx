import { useEffect, useState } from "react";
import NewsList from "../../../components/common/news/News";
import "./DoctorDash.css";
import SmallLoader from "../../../components/common/SmallLoader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const DoctorDash = () => {
  const [today_appointments, setTodayAppointments] = useState(0);
  const [today_comp_appointments, setTodayCompAppointments] = useState(0);
  const [appointment_requests, setAppointmentRequests] = useState(0);
  const [upcoming_appointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/doctor/getdashboard",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTodayAppointments(data.todayCount);
          setTodayCompAppointments(data.completedCount);
          setAppointmentRequests(data.requestedCount);
          setUpcomingAppointments(data.upcomingA);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="docdash">
      <h2 className="docdash-heading">Doctor Dashboard</h2>
      <div className="docdash-section1">
        <div className="docdash-section1-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="docdash-section1-img"
          />
          <div>
            {loading ? (
              <SmallLoader />
            ) : (
              <>
                <h3>Today's Appointments</h3>
                <p className="docdash-section1-number">{today_appointments}</p>
              </>
            )}
          </div>
        </div>
        <div className="docdash-section1-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="docdash-section1-img"
          />
          <div>
            {loading ? (
              <SmallLoader />
            ) : (
              <>
                <h3>Compeleted Appointments</h3>
                <p className="docdash-section1-number">
                  {today_comp_appointments}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="docdash-section1-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="docdash-section1-img"
          />
          <div>
            {loading ? (
              <SmallLoader />
            ) : (
              <>
                <h3>Appointment Requests</h3>
                <p className="docdash-section1-number">
                  {appointment_requests}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <h3 className="docdash-heading">Upcoming Appointments</h3>
      <div className="docdash-section2-container">
        <table className="docdash-table">
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
          {loading ? (
            <>
              <TableRowsEmpty />
              <TableRowsEmpty />
              <TableRowsEmpty />
            </>
          ) : (
            <TableRows data={upcoming_appointments} />
          )}
        </table>
      </div>
      <div className="docdash-section3-container">
        <NewsList news={[]} name="UPDATES" className="docdash-newslist" />
      </div>
    </div>
  );
};

export default DoctorDash;

const TableRows = (props: any) => {
  const user = useSelector((state: RootState) => state.data.value);
  const navigate = useNavigate();
  const records = props.data;
  const handleViewAppointment = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem("lastOpenedAppointment", e.currentTarget.id);
    navigate("/view-appointment/" + user.userID + "/" + e.currentTarget.id);
  };
  const handleTakeInAppointment = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.id);
  };
  return records.map((item: any) => (
    <tr>
      <td>{item.PatientNamef + " " + item.PatientNamel}</td>
      <td>{new Date(item.Date).toLocaleDateString()}</td>
      <td>{new Date(item.Date).toLocaleTimeString()}</td>
      <td className="docdash-table-btn-parent">
        <button
          id={item.ID}
          className="docdash-table-btn"
          onClick={handleViewAppointment}
        >
          View
        </button>
        <button
          id={item.ID}
          className="docdash-table-btn"
          onClick={handleTakeInAppointment}
        >
          Take In
        </button>
      </td>
    </tr>
  ));
};

const TableRowsEmpty = () => {
  return (
    <>
      <tr className="transition-rows-dashboard">
        <td className="empty-table-entry">
          <div className="empty-table-entry-inside"></div>
        </td>
        <td className="empty-table-entry">
          <div className="empty-table-entry-inside"></div>
        </td>
        <td className="empty-table-entry">
          <div className="empty-table-entry-inside"></div>
        </td>
        <td className="docdash-table-btn-parent">
          <button className="docdash-table-btn">View</button>
          <button className="docdash-table-btn">Take In</button>
        </td>
      </tr>
    </>
  );
};
