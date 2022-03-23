import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

export default function Appointment(props) {
  let text ='';
  if(props.time) {
    text+= `Appointment at ${props.time}`;
  } else {
    text += 'No Appointments';
  }
  return(
    <article className="appointment">{text}</article>
  )
}