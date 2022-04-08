import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let timerID = null;
const input = document.querySelector('#date-selector');
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');
const numbers = document.querySelectorAll('.value');
const timerSections = document.querySelectorAll('.field');
let selDate;

// Стилі для таймера
start.style.backgroundColor = 'green';
stop.style.backgroundColor = 'red';
timer.style.marginTop = '50px';
timer.style.display = 'flex';
timer.style.flexDirection = 'row';

for (const section of timerSections) {
  section.style.display = 'flex';
  section.style.flexDirection = 'column';
  section.style.alignItems = 'center';
  section.style.marginRight = '20px';
}

for (const number of numbers) {
  number.style.fontSize = '40px';
  number.style.fontFamily = 'Georgia'
  
}

// Об'єкт параметрів таймера

start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // Перевірка вказаної дати на фьючерність

  onClose(selectedDates) {
    const dateCurrent = new Date();
    selDate = selectedDates[0];
    if (selectedDates[0].getTime() - dateCurrent.getTime() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};

// Вибір дати в таймері відповідно до параметрів

flatpickr(input, options);

// Відпрацювання кнопок старт і стоп

start.addEventListener('click', timerInitializer);
stop.addEventListener('click', timerDestructor);

// Функція запуску таймера

function timerInitializer() {
  start.disabled = true;
  timerID = setInterval(() => {
    const dateCurrent = new Date();
    const ms = selDate.getTime() - dateCurrent.getTime();

    // Якщо відлік дійшов до 0

    if (ms <= 0) {
      timerDestructor();
    } else {
      // Виведення актуальних значень таймера через кожну 1 сек

      const timerTotal = convertMs(ms);
      days.textContent = `${addLeadingZero(timerTotal.days)}`;
      hours.textContent = `${addLeadingZero(timerTotal.hours)}`;
      minutes.textContent = `${addLeadingZero(timerTotal.minutes)}`;
      seconds.textContent = `${addLeadingZero(timerTotal.seconds)}`;
    }
  }, 1000);
}

// Додавання нулів

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Зупинка роботи таймера

function timerDestructor() {
  start.disabled = false;
  clearInterval(timerID);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
