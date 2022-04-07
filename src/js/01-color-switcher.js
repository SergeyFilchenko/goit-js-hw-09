const bodyColor = document.querySelector("body")
const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')

startBtn.addEventListener('click', getRandomHexColor)

function getRandomHexColor (){
    timerId = setInterval(()=>{
        return bodyColor.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }, 1000)

    startBtn.disabled = true;
    stopBtn.disabled = false;
}

stopBtn.addEventListener('click', ()=>{
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
})