import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selector";



// useEffect(() => {
//   const testURL = `https://search-itunes.vercel.app/?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;
//   axios.get(testURL).then(response => {
//     setResults([...response.data.results])
//     console.log(response.data.results);
//   });
// }, [term]);


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };




export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {setState(prev => ({ ...prev, days }));}
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})
  

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    // const getArr = `http://localhost:8001/api/days`;

  }, []);

  const appointment = dailyAppointments.map((appointment) => {
    return (
  
  
      <Appointment
        key={appointment.id}
        {...appointment}
      />
  
    );
  });
  // const [term, setTerm] = useState("");
  // const [results, setResults] = useState([]);

  // useEffect(() => {
  //   const testURL = `https://search-itunes.vercel.app/?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;
  //   axios.get(testURL).then(response => {
  //     setResults([...response.data.results])
  //     console.log(response.data.results);
  //   });
  // }, [term]);

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
      {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
