 import {useState, useEffect } from 'react';
 import axios from 'axios';
 export default function useApplicationData() {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {}
    });
    const setDay = function(date){
      setState(Object.assign({}, state, {day: date}));
    } 
    const changeSpots = function(bool, date) {
      let change = 0;
       if(bool) {
         change = 1;
       } else {
         change = -1;
       }
        const day = {
          ...state.days[date],
          spots: state.days[date].spots + change
        }
        const days = {
          ...state.days,
          [date]: day
        }
        setState(...state,
          days)
    }
    useEffect(() => {
      Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
      ]).then(response => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers:response[2].data}));
      });
    }, []);

    function cancelInterview(id) {
      const currentDay = state.day;

      
      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id] : appointment
        }
        setState({
          ...state,
          appointments
        })
        changeSpots(false, currentDay);
        return;
        })
    }
    function bookInterview(id, interview) {
      const currentDay = state.day;
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id] : appointment
      };
      return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
      .then(()=> {
        setState({
        ...state,
        appointments
      })
      changeSpots(true, currentDay);
      return;
    })
    
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
 }