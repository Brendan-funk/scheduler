import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function() {
    setStudent("");
    setInterviewer(null);
    return;
  }
  const cancel = function() {
    reset();
    setError("");
    props.onCancel();
    return;
  }
  function validate(name) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSubmit(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            value={student && student}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => 
          validate(student)} >Save</Button>
      </section>
      </section>
    </main>
  )
}