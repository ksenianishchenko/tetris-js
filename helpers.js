import {KEY} from "./data.js";

let incrementId = null;

function rotateShapeClockwise(matrix) {
  const matrixLength = matrix.length;
  const x = Math.floor(matrixLength/ 2);
  const y = matrixLength - 1;
  for (let i = 0; i < x; i++) {
     for (let j = i; j < y - i; j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[y - j][i];
        matrix[y - j][i] = matrix[y - i][y - j];
        matrix[y - i][y - j] = matrix[j][y - i];
        matrix[j][y - i] = temp;
     }
  }

  return matrix;
}

function rotateShapeCounterClockwise(matrix) {
  const matrixLength = matrix.length;
  const x = Math.floor(matrixLength/ 2);
  const y = matrixLength - 1;
  for (let i = 0; i < x; i++) {
     for (let j = i; j < y - i; j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[j][y - i];
        matrix[j][y - i] = matrix[y - i][y - j];
        matrix[y - i][y - j] = matrix[y - j][i];
        matrix[y - j][i] = temp;
     }
  }

  return matrix;
}

const getRandomId = () => {
  const randomId = Math.floor(Math.random() * 7);
  return randomId;
}

const checkValues = (val) => {
  return val > 0;
}

const getHours = (mins) => {
  //minutes is seconds divided by 60, rounded down
  let hours = Math.floor(mins / 60);
  return hours;
}

const getMinutes = (secs) => {
  //minutes is seconds divided by 60, rounded down
  let mins = Math.floor(secs / 60);
  return mins;
}

const getSeconds = (mins, secs) => {
  //take minutes remaining (as seconds) away
  //from total seconds remaining
  return secs - Math.round(mins * 60);
}

const increment = (seconds, minutes, hours, secsElm, minsElm, hoursElm, model) => {
  //if less than a minute remaining
  //Display only seconds value.
  if (seconds < 59) {
      model.timer.seconds = seconds;
      secsElm.innerHTML = model.timer.seconds;
  }

  //Display both minutes and seconds
  //getminutes, getseconds, gethours is used to
  //get minutes, seconds and hours
  else {
      minutes = getMinutes(seconds);
      hours = getHours(minutes);
      model.timer.seconds = getSeconds(minutes, seconds);
      model.timer.minutes = minutes;
      model.timer.hours = hours;
      secsElm.innerHTML = model.timer.seconds;
      minsElm.innerHTML = model.timer.minutes;
      hoursElm.innerHTML = model.timer.hours;
  }
  //if seconds > 0 then seconds is incremented
  seconds++;
  incrementId = setTimeout(function() {
    increment(seconds, minutes, hours, secsElm, minsElm, hoursElm, model);
  }, 1000);
}

const countTimer = (seconds, minutes, hours, secsElm, minsElm, hoursElm, model) => {
  if (incrementId) {
    clearInterval(incrementId);
    incrementId = null;
  }

  setTimeout(function() {
    increment(seconds, minutes, hours, secsElm, minsElm, hoursElm, model);
  }, 60);
}

export {getRandomId, checkValues, rotateShapeClockwise, rotateShapeCounterClockwise, countTimer};
