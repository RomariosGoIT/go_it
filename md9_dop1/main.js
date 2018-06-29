'use strict';
/*
  Дан массив цветов и кнопки "Start" и "Stop". Сделайте так, чтобы после
  нажатия кнопки "Start", каждую секунду body менял цвет фона на случайное 
  значение из массива. 

  При нажатии на кнопку "Stop", изменении цвета фона должно останавливаться.
*/

const colors = [
  '#FFFFFF',
  '#F44336',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const mainBody = document.querySelector('body');
const starBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');

class ColorChang {
  constructor({ arr, colorChang = () => null }) {
    this.arr = arr;
    this.intId = null;
    this.isActive = false;
    this.colorChang = colorChang;
  }
  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.intId = setInterval(() => {
        this.randomNum();
      }, 1000);
    }
  }

  stop() {
    this.isActive = false;
    clearInterval(this.intId);
  }

  randomNum() {
    let randomNum = Math.floor(Math.random() * this.arr.length);

    this.colorChang(this.arr[randomNum]);
  }
}

const bodyColor = new ColorChang({
  arr: colors,
  colorChang: bgColor,
});

starBtn.addEventListener('click', bodyColor.start.bind(bodyColor, bgColor));
stopBtn.addEventListener('click', bodyColor.stop.bind(bodyColor));

function bgColor(num) {
  mainBody.style.backgroundColor = num;
}
