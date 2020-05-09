function load() {
  showVersion();
  let element = document.getElementById('input');

  if (element) {
    calculate(element.value);
  }
}

function calculate(expression) {
  let operatorRegExp = /\+|\-|\*|\//;
  let numberRegExp = /^\d+$/;

  let numbers = expression.split(operatorRegExp);
  numbers[0] = (numbers[0]) ? numbers[0].match(numberRegExp) : null;
  numbers[1] = (numbers[1]) ? numbers[1].match(numberRegExp) : null;
  let number1 = parseInt(numbers[0]);
  let number2 = parseInt(numbers[1]);

  let operators = expression.match(operatorRegExp);

  if (
    ! number1
    || ! number2
    || Number.isNaN(number1)
    || Number.isNaN(number2)
    || ! operators) {
      updateResult('Invalid expression');
      return;
    }

  let operator = operators[0];
  let calculator = new Calculator();
  calculator.add(number1);
  let result = getResult(calculator, number2, operator);
  updateResult(result);
}

function clearInputAndResult() {
  if (confirm('Do you want to clear input and result ?')) {
    clearInput();
    clearResult();
  }
}

function getResult(calculator, number, operator) {
  switch(operator) {
    case '+': return calculator.add(number);
    case '-': return calculator.substract(number);
    case '*': return calculator.multiply(number);
    case '/': return calculator.divide(number);
    default: return null;
  }
}

function clearInput() {
  let element = document.getElementById('input');

  if (element) {
    element.value = '';
  }
}

function clearResult() {
  updateResult('');
}

function updateResult(result) {
  let element = document.getElementBy('result');

  if (element) {
    element.innerText = result;
  }
}

function showVersion() {
  let element = document.getElementById('version');

  if (element) {
    let calculator = new Calculator();

    calculator.version.then((version) => {
      element.innerText = version;
    }).catch(function(error) {
      element.innerText = 'error';
    });
  }
}
