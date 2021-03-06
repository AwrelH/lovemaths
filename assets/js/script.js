document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }
    document.getElementById('answer-box').addEventListener('keydown', function(event){
        if (event.key === 'Enter') { 
            checkAnswer();
        }
    });
    runGame('addition');
});

/**
 * the main 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {
    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();


    //creates two random numbers 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    let num3 = Math.floor(Math.random() * 12) + 1;
    let num4 = Math.floor(Math.random() * 12) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    }  else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    }  else if (gameType === 'division') {
        displayDivisionQuestion(num3, num4);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type ${gameType}. Aborting!`;
    }
}
/**
 * 
 * 
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('Hey! You got it right! :D');
        incrementScore();
    } else {
        alert(`aww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}! `);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}
/**
 * gets the operands and the operator, directly from the dom and return answers
 * 
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract'];
    }  else if (operator === '/') {
        return [operand1 / operand2, 'division'];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}
/**
 * Increment of score when answering right
 * 
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}
/**
 * Increment of wronganswer when not answering right
 * 
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;

}
/*
* Managing the operands to calculate correctly and using right operator
*
* */

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 :  operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 :  operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = (operand1 * operand2) ;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}