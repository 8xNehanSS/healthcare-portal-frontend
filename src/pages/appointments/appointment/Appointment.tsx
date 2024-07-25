import { useParams } from "react-router-dom";

const Appointment = () => {
  const params = useParams();
  const id = params.id;
  const docid = params.docid;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Appointment;
