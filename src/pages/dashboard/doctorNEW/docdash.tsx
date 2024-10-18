import { useEffect, useState } from "react";
import NewsList from "../../../components/common/news/News";
import "./docdash.css";
import SmallLoader from "../../../components/common/SmallLoader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import Appointment from "../../../utils/appointment";
import { Column } from "react-table";
import ReusableTable from "../Table";
import TableComp from "../Table";

const DoctorDash = () => {
  const user = useSelector((state: RootState) => state.data.value);
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
  const [completedAppointmentCount, setCompletedAppointmentCount] = useState(0);
  const [appointmentRequestCount, setAppointmentRequestCount] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [ongoingApointments, setOngoingAppointments] = useState<Appointment[]>(
    []
  );
  const [requestedAppointments, setRequestedAppointments] = useState<
    Appointment[]
  >([]);
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
          setUpcomingAppointments(parseAppointmentData(data.upcomingA));
          setRequestedAppointments(parseAppointmentData(data.requestedA));
          setOngoingAppointments(parseAppointmentData(data.ongoingA));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function parseAppointmentData(appointments: any) {
    if (appointments == null) return [];
    const appointmentsParsed: Appointment[] = appointments.map(
      (appointment: any) => {
        return new Appointment(
          appointment.ID,
          appointment.PatientID,
          appointment.DoctorID,
          new Date(appointment.Date),
          appointment.IsAccepted,
          appointment.IsCompleted,
          appointment.IsOngoing,
          appointment.PatientNamef,
          appointment.PatientNamel,
          appointment.Reason
        );
      }
    );
    return appointmentsParsed;
  }

  return (
    <div className="docdash">
      <h2 className="docdash-heading">
        Welcome Dr. {user.firstName} {user.lastName}
      </h2>
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
      <div className="dashboard-table">
        <h3 className="docdash-heading">Ongoing Appointments</h3>
        <TableComp appointments={ongoingApointments} />
      </div>
      <div className="dashboard-table">
        <h3 className="docdash-heading">Upcoming Appointments</h3>
        <TableComp appointments={upcomingAppointments} />
      </div>
      <div className="dashboard-table">
        <h3 className="docdash-heading">Requested Appointments</h3>
        <TableComp appointments={requestedAppointments} />
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

  const handleButtonTwoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.type === 0) {
      handleEndAppointment(e);
      return;
    }
    const index = parseInt(e.currentTarget.id) - 1;
    const appointment = props.appointmentsOne[index];
    const updatedAppointmentsOne = [...props.appointmentsOne];
    updatedAppointmentsOne.splice(index, 1);
    props.setter1(updatedAppointmentsOne);
    const appointmentsTwo = props.appointmentsTwo || [];
    props.setter2(appointmentsTwo.concat(appointment));
  };

  const handleEndAppointment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const index = parseInt(e.currentTarget.id) - 1;
    const updatedAppointmentsOne = [...props.appointmentsOne];
    updatedAppointmentsOne.splice(index, 1);
    props.setter1(updatedAppointmentsOne);
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
