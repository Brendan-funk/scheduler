import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import { useVisualMode } from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors';


export default function Appointment(props) {
  const EMPTY = "Empty";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETEING";
  const EDIT = "EDIT"
  const SAVE_ERROR = "SAVE_ERROR";
  const DELETE_ERROR = "DELETE_ERROR";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(SAVE_ERROR, true));
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((e) => {
        transition(DELETE_ERROR, true);
        console.log(e);
      });
  }
  
  
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
          onDelete= {() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewersForDay}
          onCancel={() => back()} 
          onSubmit={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => back()}
          onSubmit={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && <Confirm 
      message='Are you sure you want to cancel appointment?' 
      onCancel={() => back()} 
      onConfirm={() => deleteInterview()}/>}
      {mode === SAVE_ERROR && <Error message='Error While Saving' onClose={() => back()} />}
      {mode === DELETE_ERROR && <Error message='Error While Deleting' onClose={() => back()} />}
    </article>
  )
}