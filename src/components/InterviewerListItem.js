import React from 'react';
import classNames from 'classnames'; 
import 'components/InterviewerListItem.scss';
export default function InterviewerListItem(props) {
  let interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected' : props.selected
  });
  return (<li className={interviewerClass}>
  <img
    onClick = {props.setInterviewer}
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && <p>{props.name}</p>}
</li>
)
}