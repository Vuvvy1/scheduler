
export const getAppointmentsForDay = (state, day) => {
  const appointmentList = state.days.find(d => d.name === day);
  if (!appointmentList) return [];

  const filteredAppointments = Object.values(state.appointments).filter(appointment => 
    appointmentList.appointments.includes(appointment.id)
  );
  return filteredAppointments;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;

  const interviewer = state.interviewers[interview.interviewer];
  if (!interviewer) return null;

  return { ...interview, interviewer};
};

export const getInterviewersForDay = (state, day) => {
//  console.log("getInterviewersForDay ➤", day); 
  const appointmentList = state.days.find(d => d.name === day);
  if (!appointmentList) return [];
  console.log("Object.values(state.interviewers) ➤", Object.values(state.interviewers));
  const thing = Object.values(state.interviewers).filter((e) =>
    appointmentList.interviewers.includes(e.id)
  );
  console.log("thing ➤", thing);
  return thing;
};