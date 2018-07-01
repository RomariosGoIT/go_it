/* 
  Напишите скрипт, реализующий базовый функционал
  таймера, запуск отсчета времени и сброс счетчика
  в исходное состояние.
  
  Создайте функцию startTimer, которая будет запускать
  отсчет времени с момента ее нажатия, она вызывается 
  при клике на кнопку с классом js-timer-start.
  
  Создайте функцию stopTimer, которая будет останавливать
  счетчик, она вызывается при клике на кнопку с классом js-timer-stop.
  
  Используйте вспомогательную функцию updateClockface 
  которая обновляет значение счетчика в интерфейсе. 
  Для составления строки времени в формате xx:xx.x, 
  исользуйте функцию getFormattedTime из задания номер 1.
  
  Подсказка: так как нам интересны исключительно сотни миллисекунд,
      нет смысла выполнять пересчет времени чаще чем каждые 100мс.
*/

const clockface = document.querySelector('.js-clockface');
const startBtn = document.querySelector('.js-timer-start');
const stopBtn = document.querySelector('.js-timer-stop');

const timer = {
  startTime: null,
  deltaTime: null,
  id: null,
};

function updateClockface(elem, time) {
  elem.textContent = getFormattedTime(time);
}

function getFormattedTime(time) {
  if (time === 0) {
    return '00:00.0';
  }
  let date = new Date(time);
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

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

function startTimer(event) {
  setActiveBtn(event.target);
  timer.startTime = Date.now();
  if (!timer.id) {
    timer.id = setInterval(() => {
      let currentTime = Date.now();
      timer.deltaTime = currentTime - timer.startTime;
      updateClockface(clockface, timer.deltaTime);
    }, 100);
  }
}

function stopTimer(event) {
  setActiveBtn(event.target);
  timer.startTime = null;
  timer.deltaTime = 0;
  clearInterval(timer.id);
  timer.id = null;
  updateClockface(clockface, 0);
}

function setActiveBtn(target) {
  if (target.classList.contains('active')) {
    return;
  }

  startBtn.classList.remove('active');
  stopBtn.classList.remove('active');

  target.classList.add('active');
}
