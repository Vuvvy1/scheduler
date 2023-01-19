import { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationData = () => {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Populate days, appointments and interviewers state based on API call to server
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Update appointment state based on appointment id and interview
  // Call server API to update appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = getRemainingSpotsAvailable(appointments);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  // Set appointment interview to null in state based on appointment id
  // Call server API to cancel interview in appointment
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = getRemainingSpotsAvailable(appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  // Count number of spots available based on current day selected
  const getRemainingSpotsAvailable = (appointments) => {
    const spots = state.days
      .find((d) => d.name === state.day)
      .appointments.filter((id) => !appointments[id].interview).length;
    return state.days.map((day) =>
      state.day === day.name ? { ...day, spots } : { ...day }
    );
  };

  return { state, setDay, bookInterview, cancelInterview };
};
