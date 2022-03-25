export function getAppointmentsForDay(state,day) {
  let output = [];
  const specificDay = state.days.filter(dayObj => dayObj.name === day);
  if (specificDay.length === 0) {
    return [];
  }
  for (const appId of specificDay[0].appointments) {
    output.push(state.appointments[appId]);
  }
  return output;
}

export function getInterview(state,interviewObj) {
  if(interviewObj === null) {
    return null;
  }
  for(const inter in state.interviewers) {
    if (interviewObj['interviewer'] === state.interviewers[inter]["id"]){
      let output = {
        student: interviewObj.student,
        interviewer: state.interviewers[inter],
      }
      return output;
    }
  }
  return null;
}