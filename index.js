// Плагин это класс `CountdownTimer`, экземпляр которого создает новый таймер с
// настройками.

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });


const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = Date.parse(targetDate);
    this.timerId = null;
    this.start();
  };

  start() {
    this.timerId = setInterval(() => {
      const currentTime = Date.now()
      let time = this.targetDate - currentTime;
      this.updateClock(this.getNewTime(time));
    }, 1000);
  };

  getNewTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  };

  pad(value) {
    return String(value).padStart(2, '0');
  };

  updateClock({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}:`;
    refs.hours.textContent = `${hours}:`;
    refs.mins.textContent = `${mins}:`;
    refs.secs.textContent = `${secs}`;
  };
};

const timer = new CountdownTimer('#timer-1', 'Jul 17, 2022');

timer.start();


