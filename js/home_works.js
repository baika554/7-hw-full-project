// 1 hw

const checkInput = document.querySelector('#gmail_input')
const checkButton = document.querySelector('#gmail_button')
const checkResult = document.querySelector('#gmail_result')

const register = /^[a-zA-Z0-9_%+-]+([a-zA-Z]@gmail.com)$/;

checkButton.onclick = () => {
    if(register.test(checkInput.value)){
        checkResult.innerHTML = 'Удачно!'
        checkResult.style.color = 'green'

    }else{
        checkResult.innerHTML = 'Неправильно'
        checkResult.style.color = 'red'
    }
}



// 2 hw

const childBlock = document.querySelector('.child_block')
let x = 0
let y = 0

const moveBlock = () => {
    if(x < 448 && y <= 0){
        x++
        childBlock.style.left = `${x}px`
        setTimeout(moveBlock, 1)
    }else if(x >= 448 && y < 448){
        y++
        childBlock.style.top = `${y}px`
        setTimeout(moveBlock, 1)
    }else if(x > 0 && y >= 448){
        x--
        childBlock.style.left = `${x}px`
        setTimeout(moveBlock, 1)
    }else if (x >= 0 && y > 0){
        y--
        childBlock.style.top = `${y}px`
        setTimeout(moveBlock, 1)
    }
    
}
moveBlock()

// 2

const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')
const display = document.querySelector('#secondsS') 

let count = -1
let interval = null

function number() {
    count++;
    display.textContent = count; 
}

number(); 

start.addEventListener("click", () => {
    if (!interval) {
        start.disabled = true
        stop.disabled = false
        interval = setInterval(number, 1000)
    }
})

stop.addEventListener("click", () => {
    if (interval) {
        start.disabled = false
        stop.disabled = true
        clearInterval(interval)
        interval = null
    }
})

reset.addEventListener("click", () => {
    start.disabled = false
    stop.disabled = true
    clearInterval(interval)
    interval = null
    count = 0
    display.textContent = count 
})
// 3 hw
