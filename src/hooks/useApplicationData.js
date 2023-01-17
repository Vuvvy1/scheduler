import { useState, useEffect } from "react";
import axios from "axios";


export const useApplicationData = () => {
const setDay = day => setState({ ...state, day });

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers'),
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, []);
function bookInterview(id, interview) {
  console.log("id, interview ➤", id, interview);
  const appointment = {...state.appointments[id], interview: { ...interview }};
  const appointments = {...state.appointments, [id]: appointment};
  const days = getRemainingSpotsAvailable(appointments);
  console.log("days ➤", days);
  console.log("{...state, appointments} ➤", {...state, appointments});
  return axios.put(`/api/appointments/${id}`, { interview })
  .then(setState({...state, appointments, days}));
}

function cancelInterview(id) {
  const appointment = {...state.appointments[id], interview: null};
  const appointments = {...state.appointments, [id]: appointment};
  const days = getRemainingSpotsAvailable(appointments);
  console.log("days ➤", days);
  return axios.delete(`/api/appointments/${id}`)
  .then(setState({...state, appointments, days}));
};

// function getRemainingSpotsAvailable(appointments) {
//   const day = state.days.find(d => d.name === state.day);
//   console.log("day ➤", day);
//   const currentIndex = state.days.findIndex(d => d.name === state.day);
//   console.log("currentIndex ➤", currentIndex);
//   const spots = state.days[currentIndex].appointments.filter(id => !appointments[id].interview).length
//   console.log("spots ➤", spots);
// const updatedDays = [...state.days]
// console.log("updatedDays1 ➤", updatedDays);
// updatedDays[currentIndex].spots=spots
// console.log("updatedDays2 ➤", updatedDays);
//   return updatedDays
// }

const getRemainingSpotsAvailable = (appointments) => {
  const spots = state.days.find(d => d.name === state.day)
        .appointments.filter(id => !appointments[id].interview).length;
console.log("spots ➤", spots);
  return state.days.map(day => 
    state.day === day.name ? { ...day, spots } : { ...day }
  );
};

return { state, setDay, bookInterview, cancelInterview };
};
  