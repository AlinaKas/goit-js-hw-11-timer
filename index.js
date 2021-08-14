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
  };

  start() {
    const startTime = this.targetDate;

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const time = startTime - currentTime;
      this.updateClock(this.getTimeElements(time));

      if (startTime <= currentTime) {
        clearInterval(this.timerId);
        this.updateClock(this.getTimeElements(0));
        console.log('Задана дата из прошлого, отсчёт невозможен');
      }
    }, 1000);
  };

  getTimeElements(time) {
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

const timer = new CountdownTimer('#timer-1', 'Aug 14, 2022');

timer.start();


