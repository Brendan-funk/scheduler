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
    const getDateIndex = function(date) {
      for (const day in state.days) {
        if(state.days[day].name === date) {
          return state.days[day].id-1;
        }
      }
    }
    const changeSpots = function(bool, date) {
      let change = 0;
       if(bool) {
         change = -1;
       } else {
         change = 1;
       }
       const dayIndex = getDateIndex(date);
        const day = {
          ...state.days[dayIndex],
          spots: state.days[dayIndex].spots + change
        }
        const days = state.days
        days[dayIndex] = day;

        setState({
          ...state,
          days
        });
        console.log(state);
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
        changeSpots(false, currentDay);
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
        
        return;
        })
    }
    function bookInterview(id, interview, edit) {
      const currentDay = state.day;
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      
      return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
      .then(()=> {
        if(!edit) {
          changeSpots(true, currentDay);
        }
        const appointments = {
          ...state.appointments,
          [id] : appointment
        };
        setState({
          ...state,
          appointments
        })
      
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