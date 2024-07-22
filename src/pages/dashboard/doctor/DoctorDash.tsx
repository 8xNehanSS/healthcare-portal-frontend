import { useEffect, useState } from "react";
import NewsList from "../../../components/common/news/News";
import "./DoctorDash.css";
import SmallLoader from "../../../components/common/SmallLoader";

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
          }, 1000);
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
          <tr>
            <td>John Doe</td>
            <td>12/12/2021</td>
            <td>10:00 AM</td>
            <td className="docdash-table-btn-parent">
              <button className="docdash-table-btn">View</button>
              <button className="docdash-table-btn">Take In</button>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>12/12/2021</td>
            <td>11:00 AM</td>
            <td className="docdash-table-btn-parent">
              <button className="docdash-table-btn">View</button>
              <button className="docdash-table-btn">Take In</button>
            </td>
          </tr>
          <TableRows data={upcoming_appointments} />
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
  const records = props.data;
  return records.map((item: any) => (
    <tr>
      <td>{item.PatientNamef + " " + item.PatientNamel}</td>
      <td>{item.Date}</td>
      <td>{item.Date}</td>
      <td className="docdash-table-btn-parent">
        <button className="docdash-table-btn">View</button>
        <button className="docdash-table-btn">Take In</button>
      </td>
    </tr>
  ));
};
