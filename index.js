// Плагин это класс `CountdownTimer`, экземпляр которого создает новый таймер с
// настройками.

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });

// МОЙ ВАРИАНТ
// const refs = {
//     days: document.querySelector('[data-value="days"]'),
//     hours: document.querySelector('[data-value="hours"]'),
//     mins: document.querySelector('[data-value="mins"]'),
//     secs: document.querySelector('[data-value="secs"]'),
// };

// class CountdownTimer {
//   constructor(selector, targetDate) {
//     this.selector = selector;
//     this.targetDate = Date.parse(targetDate);
//     this.timerId = null;
//   };

//   start() {
//     const startTime = this.targetDate;

//     this.timerId = setInterval(() => {
//       const currentTime = Date.now();
//       const time = startTime - currentTime;
//       this.updateClock(this.getTimeElements(time));

//       if (startTime <= currentTime) {
//         clearInterval(this.timerId);
//         this.updateClock(this.getTimeElements(0));
//         console.log('Задана дата из прошлого, отсчёт невозможен');
//       }
//     }, 1000);
//   };

//   getTimeElements(time) {
//     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//     const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
//     return { days, hours, mins, secs };
//   };

//   pad(value) {
//     return String(value).padStart(2, '0');
//   };

//   updateClock({ days, hours, mins, secs }) {
//     refs.days.textContent = `${days}:`;
//     refs.hours.textContent = `${hours}:`;
//     refs.mins.textContent = `${mins}:`;
//     refs.secs.textContent = `${secs}`;
//   };
// };

// const timer = new CountdownTimer('#timer-1', 'Aug 14, 2022');

// timer.start();

// ИЗ ЗАНЯТИЯ С МЕНТОРОМ
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector
    this.targetDate = targetDate
    this.timerId = null
  }

  getRefs() {
    const container = document.querySelector(this.selector)
    const days = container.querySelector('[data-value="days"]')
    const hours = container.querySelector('[data-value="hours"]')
    const mins = container.querySelector('[data-value="mins"]')
    const secs = container.querySelector('[data-value="secs"]')
    const wrapper = container.querySelector('.wrapper')
    const startBtn = container.querySelector('.start')
    const stopBtn = container.querySelector('.stop')
    return { wrapper, container, days, hours, mins, secs, startBtn, stopBtn }
  }

  updateTimer({ wrapper, days, hours, mins, secs }) {
    const time = this.targetDate - Date.now()
    if (time < 0) {
      this.stop()
      const markup = `<h1>Время вышло</h1>`
      wrapper.innerHTML = markup
      return
    }

    days.textContent =
      Math.floor(time / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, '0') + `:`
    hours.textContent =
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, '0') + `:`
    mins.textContent =
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, '0') + `:`
    secs.textContent = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0')
  }

  start() {
    console.log('Start')
    this.timerId = setInterval(() => {
      this.updateTimer(this.getRefs())
    }, 1000)
  }

  stop() {
    console.log('Stop')
    clearInterval(this.timerId)
  }

  addListeners() {
    this.getRefs().startBtn.addEventListener('click', this.start.bind(this))
    this.getRefs().stopBtn.addEventListener('click', this.stop.bind(this))
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2023, 00:00:00'),
})

timer.addListeners()

// const timer2 = new CountdownTimer({
//   selector: '#timer-2',
//   targetDate: new Date('Aug 20, 2021, 16:29:30'),
// });

// timer2.addListeners();

const person = {
  firstName: 'bob',
  showName() {
    console.log(this.firstName)
  },
}

const foo = function (callback) {
  callback()
}

foo(person.showName)
