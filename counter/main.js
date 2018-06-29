'use strict';

const clockFace = document.querySelector('.js-clockface');
const startBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');

class Timer {
  constructor({ onTick = () => null }) {
    this.startTime = null;
    this.deltaTime = null;
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();

      this.timerId = setInterval(() => {
        const currentTime = Date.now();
        this.deltaTime = currentTime - this.startTime;

        const time = new Date(this.deltaTime);

        const min = time.getMinutes();
        const sec = time.getSeconds();
        const ms = Number.parseInt(time.getMilliseconds() / 100);
        this.onTick({ min, sec, ms });
      }, 100);
    }
  }
  stop() {
    this.isActive = false;
    clearInterval(this.timerId);
    this.timerId = null;
    this.startTime = null;
    this.deltaTime = 0;
    this.onTick({ min: 0, sec: 0, ms: 0 });
  }
}

const timer = new Timer({
  onTick: upadeClockFace,
});

startBtn.addEventListener('click', timer.start.bind(timer));
stopBtn.addEventListener('click', timer.stop.bind(timer));

function upadeClockFace({ min, sec, ms }) {
  let timerFace = `${min}:${sec}.${ms}`;
  if (min < 10 && sec < 10)  {
    timerFace = `0${min}:0${sec}.${ms}`;
  } else if (sec < 10 && min >= 10) {
    timerFace = `${min}:0${sec}.${ms}`;
  } else if (min < 10 && sec >= 10) {
    timerFace = `0${min}:${sec}.${ms}`;
  }
  clockFace.textContent = timerFace;
}
