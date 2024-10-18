class Appointment {
  constructor(
    public ID: number = 0,
    public patientID: number = 0,
    public doctorID: number = 0,
    public date: Date = new Date(),
    public isAccepted: boolean = false,
    public isCompleted: boolean = false,
    public isOngoing: boolean = false,
    public patientNameF: string = "",
    public patientNameL: string = "",
    public reason: string = ""
  ) {}
}

export default Appointment;
