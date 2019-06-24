/* eslint-disable */

const weekLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const monthLabels = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const parseDate = function (rawDate) {
  let day, month, year;
  day = rawDate.substring(0, 2);
  month = rawDate.substring(2, 4);
  year = rawDate.substring(4, 8);
  return `${day}/${month}/${year}`;
}

export const parseMonth = function (rawDate) {
  let month = rawDate.substring(2,4);
  return monthLabels[parseInt(month)];
}

export const parseDateTime = function (rawDate) {
    let hour, minute, second;
    hour = rawDate.substring(8, 10);
    minute = rawDate.substring(10, 12);
    second = rawDate.substring(12, 14);
    return `${hour}:${minute}:${second}`;
}

// Returns the day name of a date with format 'DDMMYYYYHHMMSSSSS'
export const parseDayName = function (rawDate) {
    let day, month, year;
    day = rawDate.substring(0, 2);
    month = rawDate.substring(2, 4);
    year = rawDate.substring(4, 8);
    return weekLabels[new Date(`${month}/${day}/${year}`).getDay()%7];
}