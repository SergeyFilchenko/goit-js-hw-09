import Notiflix from 'notiflix'

const form = document.querySelector('.form')
const inputDelay = document.querySelector('[name = delay]')
const step = document.querySelector('[name = step]')
const amount = document.querySelector('[name = amount]')


 form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  
  const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
 
  if (shouldResolve) {
resolve({position, delay})
  } else {
  reject({position, delay})
  }
                
        }, delay)
  })
}

function onFormSubmit(event) {
  event.preventDefault()  
  
let delay = Number(inputDelay.value)
let amountNumber = Number(amount.value)
let stepDelay = Number(step.value)


for (let i = 1; i <= amountNumber; i += 1) {
  createPromise(i, delay)
  .then(({ position, delay }) => {
  Notiflix.Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
  Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  })
  delay += stepDelay 
}

}