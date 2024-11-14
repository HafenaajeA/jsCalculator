let trailingResult = 0;
let operationOptions = ["divide", "multiply", "subtract", "add"];
let workingOperation = "";

function updateDisplay(input) {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");

  // Check if input is a valid operation
  if (operationOptions.indexOf(input) >= 0) {
    // Handle consecutive operators
    if (workingOperation !== "" && display.innerHTML === "0") {
      // Replace the previous operator with the new one
      workingOperation = input;
      secondaryDisplay.innerHTML = trailingResult; // Keep the result in secondary display
      return;
    }

    // Handle initial operator press after a number input
    if (trailingResult === display.innerHTML) {
      workingOperation = input;
    } else if (workingOperation === "") {
      // Set operation if none is active
      workingOperation = input;
      trailingResult = display.innerHTML;
      secondaryDisplay.innerHTML = trailingResult;
      display.innerHTML = 0;
    } else {
      // Perform the calculation if there's an active operation
      trailingResult = calculate(
        trailingResult,
        display.innerHTML,
        workingOperation
      );
      secondaryDisplay.innerHTML = trailingResult;
      display.innerHTML = 0;
      workingOperation = input; // Update to the latest operation
    }
  } else if (input === "equals") {
    // Perform calculation on equals press
    display.innerHTML = calculate(
      trailingResult,
      display.innerHTML,
      workingOperation
    );
    trailingResult = 0;
    workingOperation = "";
    secondaryDisplay.innerHTML = trailingResult;
  } else if (input === "decimal") {
    // Handle decimal input
    if (display.innerHTML.indexOf(".") === -1) {
      display.innerHTML += ".";
    }
  } else if (input === "negative-value") {
    // Toggle negative sign
    if (display.innerHTML.indexOf("-") === -1) {
      display.innerHTML = "-" + display.innerHTML;
    } else {
      display.innerHTML = display.innerHTML.slice(1);
    }
  } else {
    // Append digit input to display
    if (display.innerHTML === "0") {
      display.innerHTML = input;
    } else {
      display.innerHTML += input;
    }
  }
}

function clearDisplay() {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");
  trailingResult = 0;
  display.innerHTML = 0;
  secondaryDisplay.innerHTML = trailingResult;
}

function calculate(firstNumber, secondNumber, operation) {
  let result;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  switch (operation) {
    case "add":
      // console.log("add calculated")
      result = firstNumber + secondNumber;
      break;
    case "subtract":
      // console.log("subtract calculated")
      result = firstNumber - secondNumber;
      break;
    case "multiply":
      // console.log("multiply calculated")
      result = firstNumber * secondNumber;
      break;
    case "divide":
      // console.log("divide calculated")
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Calculate switch statement missed something");
  }
  return result.toString();
}
