import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList (props) {
  const dayListItemArray = props.days.map(x=> <DayListItem
    key={x.id}
    name={x.name}
    spots={x.spots}
    selected={props.day === x.name}
    setDay={props.setDay}
    />)
  return( <ul>
    {dayListItemArray}
  </ul>)
}