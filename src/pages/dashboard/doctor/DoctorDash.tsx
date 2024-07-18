import NewsList from "../../../components/common/news/News";
import "./DoctorDash.css";

const DoctorDash = () => {
  const today_appointments = 2;
  const today_comp_appointments = 1;
  const appointment_requests = 3;
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
            <h3>Today's Appointments</h3>
            <p className="docdash-section1-number">{today_appointments}</p>
          </div>
        </div>
        <div className="docdash-section1-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="docdash-section1-img"
          />
          <div>
            <h3>Compeleted Appointments</h3>
            <p className="docdash-section1-number">{today_comp_appointments}</p>
          </div>
        </div>
        <div className="docdash-section1-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="docdash-section1-img"
          />
          <div>
            <h3>Appointment Requests</h3>
            <p className="docdash-section1-number">{appointment_requests}</p>
          </div>
        </div>
      </div>
      <h3 className="docdash-heading">Upcoming Appointments</h3>
      <div className="docdash-section2-container">
        <table className="docdash-table">
          <tr>
            <th>
              Patient Name
              <hr />
            </th>
            <th>
              Date
              <hr />
            </th>
            <th>
              Time
              <hr />
            </th>
            <th>
              Actions
              <hr />
            </th>
          </tr>
          <tr>
            <td>John Doe</td>
            <td>12/12/2021</td>
            <td>10:00 AM</td>
            <td className="docdash-table-btn-parent">
              <button className="docdash-table-btn">View</button>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>12/12/2021</td>
            <td>11:00 AM</td>
            <td className="docdash-table-btn-parent">
              <button className="docdash-table-btn">View</button>
            </td>
          </tr>
        </table>
      </div>
      <div className="docdash-section3-container">
        <NewsList news={[]} name="Updates" className="docdash-newslist" />
      </div>
    </div>
  );
};

export default DoctorDash;
