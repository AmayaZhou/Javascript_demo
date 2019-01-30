/*
Game Function
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// game value, 定义时可以只写1个let，其余用逗号隔开
let min = 1,
    max = 4,
    // winningNumber = 6, // winningNumber最好是随机数
    winningNumber = getRandomNumber(min, max);
    guessLeft = 3;

// UI elements
const UIgame = document.querySelector('#game'),
    UIminNumber = document.querySelector('.min-num'),
    UImaxNumber = document.querySelector('.max-num'),
    UIguessInput = document.querySelector('#guess-input'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UImessage = document.querySelector('.message');

// assign UI min and max
UIminNumber.textContent = min;
UImaxNumber.textContent = max;

// play again event listener
// 当btn的文字变成play again时，btn会新增一个className, 这种情况是动态的，所以要用delegation (给父集添加监听事件)
// 为什么给play again的btn添加mousedown？因为如果用了click,那么Play again的function被激活，页面reload;如果用了mousedown, 那么只有按下去的时候play again激活，mouseup时不激活
UIgame.addEventListener('mousedown', function(e){
    
    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
})

// 定义随机的winning number
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// listen for submit btn
UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value);
    // console.log(guess);
    // validate guess, 如果没有输，guess的值为NaN,用isNaN来验证
    if(isNaN(guess) || guess < 1 || guess > 10){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');  // 反复用到，最好申明一个函数
    }

    // check if won
    if(guess === winningNumber){
        // // game over
        // // disabled input
        // UIguessInput.disabled = true;
        // // change border color to show winning
        // UIguessInput.style.borderColor = 'green';
        // // set message
        // setMessage(`Congratulations! ${winningNumber} is correct`, 'green');
        gameOver(true, `Congratulations! ${winningNumber} is correct`);
    }else{
        // wrong number
        guessLeft -= 1;

        if(guessLeft === 0){
            // // disabled input
            // UIguessInput.disabled = true;
            // // change border color
            // UIguessInput.style.borderColor = 'red';
            // // set message
            // setMessage(`Game over, you lost, the correct number is ${winningNumber}`,'red');
            gameOver(false, `Game over, you lost, the correct number is ${winningNumber}`);
        } else{
            // wrong number, but game continues
            UIguessInput.style.borderColor = 'red';
            UIguessInput.value = '';
            setMessage(`${guess} in not correct, ${guessLeft} guesses left`, 'red');
        }
    }
    
});

// set message
function setMessage(msg, color){
    UImessage.textContent = msg;
    UImessage.style.color = color;
}

// game over function
function gameOver(won, msg){
    let color;
    won === true? color = 'green' : color = 'red'; 
    // disabled input
    UIguessInput.disabled = true;
    // change border color
    UIguessInput.style.borderColor = color;
    // change text color
    UImessage.style.color = color;
    // set message
    setMessage(msg);

    // play again?
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';  // 用+=是因为有可能之前就有class
}