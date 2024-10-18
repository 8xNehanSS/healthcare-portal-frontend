function updateAppointment(type: number, appointmentID: string) {
  switch (type) {
    case 1:
      TakeInAppointment(appointmentID);
      break;
    case 2:
      // Accept
      break;
    case 3:
      // Deny
      break;
    case 4:
      // Cancel
      break;
    default:
      break;
  }
}

function TakeInAppointment(appointmentID: string) {
  // Take In
}
function AcceptAppointment(appointmentID: string) {
  // Take In
}
function DenyAppointment(appointmentID: string) {
  // Take In
}
function CancelAppointment(appointmentID: string) {
  // Take In
}
function CompleteAppointment(appointmentID: string) {
  // Take In
}
function HoldAppointment(appointmentID: string) {
  // Take In
}

function CallAPIForAction(appointmentID: string) {
  // call API
}

export { updateAppointment };
