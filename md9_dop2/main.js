/* 
  Напишите функцию getFormattedTime(time), которая 
  получает time - кол-во миллисекунд и возвращает 
  строку времени в формате xx:xx.x, 01:23.6, минуты:секунды.миллисекунды.
  
  Из миллисекунд нам интересен только разряд с сотнями,
  то есть если сейчас 831мс то нам интересна исключительно цифра 8.
*/

function getFormattedTime(time) {
  const date = new Date();
  date.setTime(time);
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let ms = Number.parseInt(date.getMilliseconds() / 100);
  let myTime = `${min}:${sec}.${ms}`;
  if (min < 10 && sec < 10) {
    myTime = `0${min}:0${sec}.${ms}`;
  } else if (sec < 10 && min >= 10) {
    myTime = `${min}:0${sec}.${ms}`;
  } else if (min < 10 && sec >= 10) {
    myTime = `0${min}:${sec}.${ms}`;
  }
  return myTime;
}

console.log(getFormattedTime(1523621052858)); // 04:12.8

console.log(getFormattedTime(1523621161159)); // 06:01.1

console.log(getFormattedTime(1523621244239)); // 07:24.2
