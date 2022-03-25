import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import { useVisualMode } from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors';

export default function Appointment(props) {
  const EMPTY = "Empty";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const interviewersForDay = getInterviewersForDay(props.state,props.state.day);
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd ={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewersForDay}
          onCancel={() => back()} 
          onSubmit={console.log('submit')}
        />
      )}
    </article>
  )
}