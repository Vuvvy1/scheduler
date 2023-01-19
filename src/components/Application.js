import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import React/*, { useState, useEffect }*/ from "react";
// import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selector";
import { useApplicationData } from "hooks/useApplicationData";


export default function Application() {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const setDays = (days) => {setState(prev => ({ ...prev, days }));}



  // Iterates state to match appointments objects per day
  const appointmentsForDay = getAppointmentsForDay(state, state.day); 
  // Iterates state to match interviewers objects per day
  // console.log("state.day ➤", state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day); 
  
  // Mapping appointments array to create an Appointment component per appointment in state
  const appointmentsList = appointmentsForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
