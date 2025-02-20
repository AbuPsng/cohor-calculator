//****** selecting DOM Element ****/

const resultElement = document.querySelector("#result");
const operatorElement = document.querySelector("#operator");
const userInputElement = document.querySelector("#secondary-value");
const equalButton = document.querySelector("#equal");
const addButton = document.querySelector("#addition");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#mulitply");
const divisionButton = document.querySelector("#division");
const remainderButton = document.querySelector("#remainder");
const resetButton = document.querySelector("#reset");
const calculationElement = document.querySelector("#calculation-container");
const filterPlusButton = document.querySelector("#filter-addition");
const filterSubtractButton = document.querySelector("#filter-subtract");
const filterMultiplyButton = document.querySelector("#filter-multiply");
const filterDivisionButton = document.querySelector("#filter-division");
const deleteButton = document.querySelector("#delete");
const filterRemdainderButton = document.querySelector("#filter-remainder");

//***** Initiating Variables *****/
let currentOperator = "+";
let resultValue = 0;
const numberButtons = [];
const history = [];

//***** Function delcartions ******/

//changing and selecting operator
function selectOperator(operator) {
  if (!resultValue) {
    resultValue = userInputElement.value;
    resultElement.innerText = resultValue;
    userInputElement.value = "";
  }
  operatorElement.innerText = operator;
  currentOperator = operator;
}

// giving final result
function resultEvaluator(number1, number2, operator) {
  if (!number1 || !number2) {
    return alert("Please provide some value");
  }

  if (!operator) {
    userInputElement.value = "";
    return alert("Please select the operator you want");
  }

  const a = Number(number1);
  const b = Number(number2);

  let result = 0;

  if (operator === "+") {
    result = a + b;
  } else if (operator === "-") {
    result = a - b;
  } else if (operator === "×") {
    result = a * b;
  } else if (operator === "÷") {
    result = a / b;
  } else {
    result = a % b;
  }
  resultValue = result;
  resultElement.innerText = resultValue;

  const historyItem = {
    inputOne: a,
    inputTwo: b,
    operator,
    result,
  };

  if (history.length <= 0) {
    const paraElement = document.querySelector("#para");
    console.log(paraElement);
    paraElement.remove();
  }

  history.push(historyItem);

  userInputElement.value = "";
  operatorElement.innerText = "";
  currentOperator = "";
  changeViewAccordingToHistoryData();
}

//reseting the entire value
function reset() {
  resultValue = "";
  currentOperator = "";
  operatorElement.innerText = "";
  userInputElement.value = "";
  resultElement.innerText = "";
}

// taking input from user using calcultor button
function puttingNumberUsingButton(number) {
  if (number === ".") {
    if (!userInputElement.value.includes(".")) {
      userInputElement.value += userInputElement.value ? "." : "0.";
    }
  } else {
    userInputElement.value = userInputElement.value
      ? userInputElement.value + number
      : number;
  }
}

//using IIFE to select all the numbers and also adding eventListeners
(function () {
  for (let i = 0; i <= 9; i++) {
    numberButtons.push(
      document
        .querySelector(`#btn-${i}`)
        .addEventListener("click", () => puttingNumberUsingButton(i))
    );
  }
  numberButtons.push(
    document
      .querySelector("#dot")
      .addEventListener("click", () => puttingNumberUsingButton("."))
  );
})();

//to restrict not numerical value
function inputRestriction(e) {
  e.target.value = e.target.value.replace(/[^0-9.]/g, "");

  if ((e.target.value.match(/\./g) || []).length > 1) {
    e.target.value = e.target.value.slice(0, -1);
  }
}

// funtion to provide name of operator
function givePara(num1, num2, operator) {
  let result;
  if (operator === "+") {
    result = `It was an addition of ${num1} and ${num2}`;
  } else if (operator === "-") {
    result = `It was a subtraction of ${num2} from ${num1} `;
  } else if (operator === "×") {
    result = `It was a multiplication of ${num2} with ${num1} `;
  } else if (operator === "÷") {
    result = `It was a division of ${num2} from ${num1} `;
  } else {
    result = `It was to find the remainder between ${num1} and ${num2}`;
  }
  return result;
}

//to put new calculation data in to view
function putCalculationInView(index, number1, number2, result, operator) {
  const calculationHolder = document.createElement("div");
  const div = document.createElement("div");
  const paraHeading = document.createElement("p");
  const paraExpression = document.createElement("p");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "x";
  deleteBtn.addEventListener("click", () => deleteSelectedCalculation(index));

  paraHeading.innerText = givePara(number1, number2, operator);
  paraExpression.innerText = `=> ${number1} ${operator} ${number2} = ${result}`;

  calculationHolder.addEventListener("click", () =>
    putValuesAndOperatorOfCalculation(number1, number2, operator)
  );
  calculationHolder.id = "calculation-holder";

  div.appendChild(paraHeading);
  div.appendChild(paraExpression);
  calculationHolder.appendChild(div);
  calculationHolder.appendChild(deleteBtn);
  calculationElement.appendChild(calculationHolder);
}

//function to re render the view if any change happens on calculation
function changeViewAccordingToHistoryData() {
  const calculationHolder = document.querySelectorAll("#calculation-holder");
  calculationHolder.forEach((e) => e.remove());
  history.forEach((element, index) => {
    putCalculationInView(
      index,
      element.inputOne,
      element.inputTwo,
      element.result,
      element.operator
    );
  });
}

//put number and operator of selected calculation
function putValuesAndOperatorOfCalculation(number1, number2, operator) {
  selectOperator = operator;
  resultValue = number1;
  userInputElement.value = number2;
  resultElement.innerText = resultValue;
}

//delete a calculation from history
function deleteSelectedCalculation(index) {
  history.splice(index, 1);
  changeViewAccordingToHistoryData();
}

//filtering the history by user preference
function filterHistory(operator) {
  const calculationHolder = document.querySelectorAll("#calculation-holder");
  calculationHolder.forEach((e) => e.remove());
  history.map(
    (element, index) =>
      element.operator === operator &&
      putCalculationInView(
        index,
        element.inputOne,
        element.inputTwo,
        element.result,
        element.operator
      )
  );

  console.log(history, "history");
}

//removing one integer from number
function removeInteger() {
  let arrayValue = userInputElement.value.split("");
  arrayValue.pop();
  userInputElement.value = arrayValue.join("");
}

//***** Assigning Funtion to elements *****/

addButton.addEventListener("click", () => selectOperator("+"));
subtractButton.addEventListener("click", () => selectOperator("-"));
multiplyButton.addEventListener("click", () => selectOperator("×"));
divisionButton.addEventListener("click", () => selectOperator("÷"));
remainderButton.addEventListener("click", () => selectOperator("%"));

resetButton.addEventListener("click", () => reset());

userInputElement.addEventListener("input", () => inputRestriction(e));

equalButton.addEventListener("click", () =>
  resultEvaluator(resultValue, userInputElement.value, currentOperator)
);

deleteButton.addEventListener("click", () => removeInteger());

filterPlusButton.addEventListener("click", () => filterHistory("+"));
filterSubtractButton.addEventListener("click", () => filterHistory("-"));
filterMultiplyButton.addEventListener("click", () => filterHistory("×"));
filterDivisionButton.addEventListener("click", () => filterHistory("÷"));
filterRemdainderButton.addEventListener("click", () => filterHistory("%"));
