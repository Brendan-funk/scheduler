import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props){
  const interviewerListItemArray = props.interviewers.map(x=> <InterviewerListItem
    key={x.id}
    name={x.name}
    avatar={x.avatar}
    selected={props.value === x.id}
    setInterviewer={ () => props.onChange(x.id)}
    selectedValue = {props.value}
    />)
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerListItemArray}</ul>
  </section>

)}