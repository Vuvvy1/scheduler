
// console.log("state.appointments ➤", Object.keys(state.appointments));
// console.log("state ➤", state);
export const getAppointmentsForDay = (state, day) => {
  const appointmentList = state.days.find(d => d.name === day);
  // console.log("appointmentList ➤", appointmentList);
  if (!appointmentList) return [];
  console.log("Object.values(state.appointments) ➤", Object.values(state.appointments));
  const filteredAppointments = Object.values(state.appointments).filter(a => 
    appointmentList.appointments.includes(a.id)
  );
  // console.log("filteredAppointments ➤", filteredAppointments);
  return filteredAppointments;
};
