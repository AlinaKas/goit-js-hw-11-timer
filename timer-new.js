// ИЗ ЗАНЯТИЯ С МЕНТОРОМ

// class CountdownTimer {
//     constructor({ selector, targetDate }) {
//         this.selector = selector;
//         this.targetDate = targetDate;
//         this.timerId = null;
//     };

//     getRefs() {
//         const container = document.querySelector(this.selector);
//         const days = container.querySelector('[data-value="days"]');
//         const hours = container.querySelector('[data-value="hours"]');
//         const mins = container.querySelector('[data-value="mins"]');
//         const secs = container.querySelector('[data-value="secs"]');
//         const wrapper = container.querySelector('.wrapper');
//         const startBtn = container.querySelector('.start');
//         const stopBtn = container.querySelector('.stop');
//         const input = container.querySelector('#date');

//         return { wrapper, container, days, hours, mins, secs, startBtn, stopBtn, input };
//     };

//     updateTimer({ wrapper, days, hours, mins, secs }) {
//         const time = this.targetDate - Date.now();
//         if (time < 0) {
//             this.stop();
//             const markup = `<h1>Время вышло</h1>`;
//             wrapper.innerHTML = markup;
//             return;
//         };

//         days.textContent = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2, '0') + `:`;
//         hours.textContent = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0') + `:`;
//         mins.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0') + `:`;
//         secs.textContent = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
//     };

//     start() {
//         console.log("Start");
//         this.timerId = setInterval(() => {
//             this.updateTimer(this.getRefs());
//         }, 1000);
//     };

//     stop() {
//         console.log("Stop");
//         clearInterval(this.timerId);
//     };

//     addListeners() {
//         this.getRefs().startBtn.addEventListener('click', this.start.bind(this));
//         this.getRefs().stopBtn.addEventListener('click', this.stop.bind(this));
//         this.getRefs().input.addEventListener('change', this.changeDate);
//     };

//     changeDate = (e) => {
//         console.log(e.target.value);
//         console.log(new Date(e.target.value));
//         console.log(this.targetDate);
//         this.targetDate = new Date(e.target.value)
//     }
// };

// const timer = new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Aug 16, 2022, 16:29:30'),
// });

// timer.addListeners();


// ВАРИАНТ ДВА, активация кнопки СТАРТ таймера после выбора даты
class CountdownTimer {
    constructor({ selector }) {
        this.selector = selector;
        this.targetDate = null;
        this.timerId = null;
    };

    getRefs() {
        const container = document.querySelector(this.selector);
        const days = container.querySelector('[data-value="days"]');
        const hours = container.querySelector('[data-value="hours"]');
        const mins = container.querySelector('[data-value="mins"]');
        const secs = container.querySelector('[data-value="secs"]');
        const wrapper = container.querySelector('.wrapper');
        const startBtn = container.querySelector('.start');
        const stopBtn = container.querySelector('.stop');
        const input = container.querySelector('#date');

        return { wrapper, container, days, hours, mins, secs, startBtn, stopBtn, input };
    };

    updateTimer({ wrapper, days, hours, mins, secs, startBtn, container }) {
        const time = this.targetDate - Date.now();
        if (time < 0) {
            startBtn.disabled = true;
            this.stop();
            const markup = `<h1>Время вышло</h1>`;
            wrapper.innerHTML = markup;

            // wrapper.style.visibility = "hidden";
            // const h1 = document.createElement('h1');
            // h1.textContent = 'Время вышло';
            // container.prepend(h1);

            return;
        };

        days.textContent = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2, '0') + `:`;
        hours.textContent = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0') + `:`;
        mins.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0') + `:`;
        secs.textContent = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
    };

    start() {
        console.log("Start");

        // if (this.getRefs().container.querySelector('h1')) {
        //     this.getRefs().container.querySelector('h1').style.visibility = "hidden";
        // };
        // this.getRefs().wrapper.style.visibility = "visible";

        this.timerId = setInterval(() => {
            this.updateTimer(this.getRefs());
        }, 1000);
    };

    stop() {
        console.log("Stop");
        clearInterval(this.timerId);
    };

    addListeners() {
        const currentTime = `${new Date().getFullYear()}-${(
            new Date().getMonth() + 1
        ).toString()
            .padStart(2, '0')}-${new Date()
                .getDate()
                .toString()
                .padStart(2, '0')}T${new Date()
                .getHours()
                .toString()
                .padStart(2, '0')}:${new Date()
                .getMinutes()
                .toString()
                .padStart(2, '0')}`;
        this.getRefs().input.min = currentTime;
        this.getRefs().startBtn.disabled = true;
        this.getRefs().startBtn.addEventListener('click', this.start.bind(this));
        this.getRefs().stopBtn.addEventListener('click', this.stop.bind(this));
        this.getRefs().input.addEventListener('change', this.changeDate);
    };

    changeDate = (e) => {
        console.log(e.target.value);
        console.log(new Date(e.target.value));
        console.log(this.targetDate);
        this.targetDate = new Date(e.target.value)
        this.getRefs().startBtn.disabled = false;
    }
};

const timer = new CountdownTimer({
  selector: '#timer-1',
});

timer.addListeners();