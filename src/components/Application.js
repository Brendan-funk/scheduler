import React, {useState, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  useEffect(() => {
    Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
    ]).then(response => {
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers:response[2].data}));
    });
  }, []);


  const setDay = function(date){
    setState(Object.assign({}, state, {day: date}));
  } 
  
  
  
  
  
  const appointmentPerDay = getAppointmentsForDay(state,state.day);
  const appointments = appointmentPerDay.map((appointment) => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      />
    )
  })
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
        {appointments}
      </section>
    </main>
  );
}
