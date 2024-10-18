class Appointment {
  constructor(
    public ID: number = 0,
    public patientID: number = 0,
    public doctorID: number = 0,
    public date: Date = new Date(),
    public status: string = "requested",
    public patientNameF: string = "",
    public patientNameL: string = "",
    public reason: string = ""
  ) {}
}

export default Appointment;
