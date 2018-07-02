'use strict'

const clockFace = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const lapBtn = document.querySelector('.js-take-lap')
const resetBtn = document.querySelector('.js-reset');
const lapsUl = document.querySelector('.js-laps')


class CountTimer {
    constructor(object) {
        this.object = object;
        this.isActive = false;
        this.time = 0;
        this.startTime = null;
        this.id = null;

        this.getFormattedTime = function (millisecond) {
            const time = new Date(millisecond);
            let min = time.getMinutes().toString()
            let sec = time.getSeconds().toString()
            let ms = Number.parseInt(time.getMilliseconds() / 100)
            if (min.length < 2) {
                min = '0' + min;
            }
            if (sec.length < 2) {
                sec = '0' + sec;
            }
            return `${min}:${sec}.${ms}`;

        };


        this.deltaTime = function () {
            let now = Date.now();
            let timePass = now - this.startTime;
            this.startTime = now;
            return timePass;
        };

        this.updateTime = function () {
            let timeFormat = this.getFormattedTime(this.time)
            this.time += this.deltaTime();
            this.object.textContent = timeFormat;
        };
    }



    start() {
        if (!this.isActive) {
            this.id = setInterval(this.updateTime.bind(this), 100);
            this.startTime = Date.now();
            this.isActive = true;
        }
    };
    stop() {
        if (this.isActive) {
            clearInterval(this.id);
            this.id = null;
            this.isActive = false;

        }
    };
    reset() {
        if (!this.isActive) {
            this.time = 0;
            this.updateTime();
        }
    };
    lap() {
        let dataTime = this.getFormattedTime(this.time);
        return dataTime;
    };
}


const myTimer = new CountTimer(clockFace)

function start() {
    if (!myTimer.isActive) {
        myTimer.start()
        startBtn.textContent = 'Pause'
    } else {
        myTimer.stop()
        startBtn.textContent = 'Start'
    }
}

let timerArr = []
let count = 0;

function lapData () {
    count++;    
    timerArr.push(myTimer.lap())
    creatLiElement(timerArr, count)
}

function creatLiElement (arr, count) {   
    const li = document.createElement('li');
    lapsUl.append(li)
    li.textContent = `Lap ${count}: ${arr.slice(-1)[0]}`
}




startBtn.addEventListener('click', start);

resetBtn.addEventListener('click', myTimer.reset.bind(myTimer));
lapBtn.addEventListener('click', lapData)
