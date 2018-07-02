'use strict';

class Stopwatch {
  constructor(object) {
    this.object = object;
    this.isActive = false;
    this.time = 0;
    this.startTime = null;
    this.id = null;
    this.timerContent;
    this.clockFace;
    this.startBtn;
    this.lapBtn;
    this.resetBtn;
    this.lapsUl;
    this.lapArray = [];
    this.lapCount = 0;
    this.createStopwatchDom();
    this.createLinks();
    this.addEventListener();

    this.getFormattedTime = function(millisecond) {
      const time = new Date(millisecond);
      let min = time.getMinutes().toString();
      let sec = time.getSeconds().toString();
      let ms = Number.parseInt(time.getMilliseconds() / 100);
      if (min.length < 2) {
        min = '0' + min;
      }
      if (sec.length < 2) {
        sec = '0' + sec;
      }
      return `${min}:${sec}.${ms}`;
    };

    this.deltaTime = function() {
      let now = Date.now();
      let timePass = now - this.startTime;
      this.startTime = now;
      return timePass;
    };

    this.updateTime = function() {
      let timeFormat = this.getFormattedTime(this.time);
      this.time += this.deltaTime();
      this.timerContent.textContent = timeFormat;
    };

    this.setActiveClass = function(target) {
      if (target.classList.contains('active')) {
        return;
      }
      this.startBtn.classList.remove('active');
      this.resetBtn.classList.remove('active');
      this.lapBtn.classList.remove('active');

      target.classList.add('active');
    };
  }
  createStopwatchDom() {
    const stopwatch = document.createElement('div');
    stopwatch.classList.add('stopwatch');
    this.timerContent = document.createElement('p');
    this.timerContent.classList.add('time', 'js-time');
    this.timerContent.textContent = '00:00.0';
    const buttonStart = document.createElement('button');
    buttonStart.classList.add('btn', 'js-start');
    buttonStart.textContent = 'Start';
    const takeLapButton = document.createElement('button');
    takeLapButton.classList.add('btn', 'js-take-lap');
    takeLapButton.textContent = 'Lap';
    const buttonReset = document.createElement('button');
    buttonReset.classList.add('btn', 'js-reset');
    buttonReset.textContent = 'Reset';
    stopwatch.append(
      this.timerContent,
      buttonStart,
      takeLapButton,
      buttonReset,
    );

    const lapsListUl = document.createElement('ul');
    lapsListUl.classList.add('laps', 'js-laps');
    this.object.append(stopwatch, lapsListUl);
  }

  createLinks() {
    this.clockFace = this.object.querySelector('.js-time');
    this.startBtn = this.object.querySelector('.js-start');
    this.lapBtn = this.object.querySelector('.js-take-lap');
    this.resetBtn = this.object.querySelector('.js-reset');
    this.lapsUl = this.object.querySelector('.js-laps');
  }

  startTimer() {
    if (!this.isActive) {
      this.id = setInterval(this.updateTime.bind(this), 100);
      this.startTime = Date.now();
      this.isActive = true;
    }
  }
  stopTimer() {
    if (this.isActive) {
      clearInterval(this.id);
      this.id = null;
      this.isActive = false;
    }
  }
  reset() {
    if (!this.isActive) {
      this.time = 0;
      this.updateTime();
    }
  }
  lap() {
    let dataTime = this.getFormattedTime(this.time);
    return dataTime;
  }

  startButton({ target }) {
    if (!this.isActive) {
      this.setActiveClass(target);
      this.startTimer();
      this.startBtn.textContent = 'Pause';
    } else {
      this.setActiveClass(target);
      this.stopTimer();
      this.startBtn.textContent = 'Start';
    }
  }

  resetButton({ target }) {
    if (!this.isActive) {
      this.setActiveClass(target);
      this.reset();
      if (this.lapsUl.firstChild) {
        this.lapCount = 0;
        while (this.lapsUl.firstChild) {
          this.lapsUl.removeChild(this.lapsUl.firstChild);
        }
      }
    }
  }

  lapButton({ target }) {
    if (
      this.lap() === '00:00.0' ||
      this.resetBtn.classList.contains('active')
    ) {
      return;
    }
    this.setActiveClass(target);
    this.lapCount++;
    this.lapArray.push(this.lap());
    this.creatLiElement(this.lapArray, this.lapCount);
  }

  creatLiElement(arr, count) {
    const li = document.createElement('li');
    this.lapsUl.append(li);
    li.textContent = `Lap ${count}: ${arr.slice(-1)[0]}`;
  }

  addEventListener() {
    this.startBtn.addEventListener('click', this.startButton.bind(this));
    this.resetBtn.addEventListener('click', this.resetButton.bind(this));
    this.lapBtn.addEventListener('click', this.lapButton.bind(this));
  }
}

const parentA = document.querySelector('.parentA');
const parentB = document.querySelector('.parentB');
const parentC = document.querySelector('.parentC');

const counterA = new Stopwatch(parentA);
const counterB = new Stopwatch(parentB);
const counterC = new Stopwatch(parentC);
