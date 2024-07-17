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
    </div>
  );
};

export default DoctorDash;
