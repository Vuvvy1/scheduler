
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
  const appointmentList = state.days.find(d => d.name === day);
  if (!appointmentList) return [];
  const thing = Object.values(state.interviewers).filter(e => 
    appointmentList.appointments.includes(e.id)
  );
  return thing;
};