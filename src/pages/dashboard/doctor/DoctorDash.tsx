import { useEffect, useState } from "react";
import NewsList from "../../../components/common/news/News";
import "./DoctorDash.css";
import SmallLoader from "../../../components/common/SmallLoader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { on } from "events";

const DoctorDash = () => {
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
  const [completedAppointmentCount, setCompletedAppointmentCount] = useState(0);
  const [appointmentRequestCount, setAppointmentRequestCount] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [ongoingApointments, setOngoingAppointments] = useState([]);
  const [requestedAppointments, setRequestedAppointments] = useState([]);
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
          setTodayAppointmentCount(data.todayCount);
          setCompletedAppointmentCount(data.completedCount);
          setAppointmentRequestCount(data.requestedCount);
          setUpcomingAppointments(data.upcomingA);
          setOngoingAppointments(data.ongoingA);
          setRequestedAppointments(data.requestedA);
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
                <p className="docdash-section1-number">
                  {todayAppointmentCount}
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
                <h3>Completed Appointments</h3>
                <p className="docdash-section1-number">
                  {completedAppointmentCount}
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
                  {appointmentRequestCount}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* {generateTableDash(
        0,
        "Ongoing Appointments",
        ongoingApointments,
        loading
      )} */}
      {generateTableDash(
        1,
        "Upcoming Appointments",
        upcomingAppointments,
        setUpcomingAppointments,
        ongoingApointments,
        setOngoingAppointments,
        loading
      )}
      {generateTableDash(
        2,
        "Requested Appointments",
        requestedAppointments,
        setRequestedAppointments,
        upcomingAppointments,
        setUpcomingAppointments,
        loading
      )}
      <div className="docdash-section3-container">
        <NewsList news={[]} name="UPDATES" className="docdash-newslist" />
      </div>
    </div>
  );
};

export default DoctorDash;

function generateTableDash(
  type: number,
  name: string,
  appointments: any,
  appointmentsSetter: any,
  secondaryAppointments: any,
  secondaryAppointmentsSetter: any,
  loadingBool: boolean
) {
  return (
    <div>
      <h3 className="docdash-heading">{name}</h3>
      <div className="docdash-section2-container">
        <table className="docdash-table">
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
          {loadingBool ? (
            <>
              <TableRowsEmpty />
              <TableRowsEmpty />
              <TableRowsEmpty />
            </>
          ) : (
            <TableRows
              data={appointments}
              type={type}
              appointmentsOne={appointments}
              appointmentsTwo={secondaryAppointments}
              setter1={appointmentsSetter}
              setter2={secondaryAppointmentsSetter}
            />
          )}
        </table>
      </div>
    </div>
  );
}

const TableRows = (props: any) => {
  const user = useSelector((state: RootState) => state.data.value);
  const navigate = useNavigate();
  const records = props.data;
  const handleViewAppointment = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem("lastOpenedAppointment", e.currentTarget.id);
    navigate("/view-appointment/" + user.userID + "/" + e.currentTarget.id);
  };
  const handleButtonTwoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // have to complete this function
  };
  if (records == null || records.length == 0) {
    return (
      <tr>
        <td>No Records</td>
      </tr>
    );
  }
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
          onClick={handleButtonTwoClick}
        >
          {
            // type 0 is for ongoing appointments
            // type 1 is for upcoming appointments
            // type 2 is for requested appointments
            props.type === 0 ? "End" : props.type === 1 ? "Take In" : "Accept"
          }
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
          <button className="docdash-table-btn">Action</button>
        </td>
      </tr>
    </>
  );
};
