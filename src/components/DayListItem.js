import React from 'react';
import "components/DayListItem.scss";
import classNames from 'classnames'; 

export default function DayListItem(props) {
  const formatSpots = int => {
    let output = '';
    if (int === 0) {
      output+= 'no';
    } else {
      output += int;
    }
    if(int === 1) {
      output += ' spot remaining';
    } else {
      output += ' spots remaining';
    }
    return output;
  }

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  }) 
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}