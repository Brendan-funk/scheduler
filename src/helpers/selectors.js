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