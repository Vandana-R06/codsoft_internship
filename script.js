let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

let memory = 0;
let history = [];
let isDegree = true;

// ================= BASIC INPUT =================
function append(value) {
  result.value += value;
}

function clearAll() {
  result.value = "";
}

function clearEntry() {
  result.value = "";
}

function backspace() {
  result.value = result.value.slice(0, -1);
}

// ================= SAFE CALCULATE =================
function calculate() {
  try {
    let expr = result.value;

    // Replace symbols
    expr = expr.replace(/÷/g, "/").replace(/×/g, "*");

    // Convert power operator
    expr = expr.replace(/\^/g, "**");

    // Replace scientific functions
    expr = replaceFunctions(expr);

    let res = Function('"use strict"; return (' + expr + ')')();

    if (!isFinite(res)) throw "Math Error";

    addHistory(result.value + " = " + res);
    result.value = res;
  } catch (e) {
    result.value = "Error";
  }
}

// ================= FUNCTION PARSER =================
function replaceFunctions(expr) {
  return expr
    .replace(/sin\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return isDegree ? Math.sin(v * Math.PI / 180) : Math.sin(v);
    })
    .replace(/cos\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return isDegree ? Math.cos(v * Math.PI / 180) : Math.cos(v);
    })
    .replace(/tan\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return isDegree ? Math.tan(v * Math.PI / 180) : Math.tan(v);
    })
    .replace(/log\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return Math.log10(v);
    })
    .replace(/ln\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return Math.log(v);
    })
    .replace(/sqrt\(([^)]+)\)/g, (_, val) => {
      let v = parseFloat(val);
      if (isNaN(v)) throw "Error";
      return Math.sqrt(v);
    });
}

// ================= HISTORY =================
function addHistory(entry) {
  history.push(entry);
  let li = document.createElement("li");
  li.textContent = entry;
  historyList.appendChild(li);
}

// ================= SCIENTIFIC BUTTONS =================
function square() {
  result.value += "^2";
}

function sqrt() {
  result.value = `sqrt(${result.value})`;
}

function power() {
  result.value += "^";
}

function factorial() {
  let n = parseInt(result.value);

  if (isNaN(n) || n < 0) {
    result.value = "Error";
    return;
  }

  let fact = 1;
  for (let i = 1; i <= n; i++) fact *= i;

  result.value = fact;
}

function sin() {
  result.value = `sin(${result.value})`;
}

function cos() {
  result.value = `cos(${result.value})`;
}

function tan() {
  result.value = `tan(${result.value})`;
}

function log() {
  result.value = `log(${result.value})`;
}

function ln() {
  result.value = `ln(${result.value})`;
}

function exp() {
  let val = parseFloat(result.value);

  if (isNaN(val)) {
    result.value = "Error";
    return;
  }

  result.value = Math.exp(val);
}

function abs() {
  let val = parseFloat(result.value);

  if (isNaN(val)) {
    result.value = "Error";
    return;
  }

  result.value = Math.abs(val);
}

// ================= MODE =================
function toggleMode() {
  isDegree = !isDegree;
  alert(isDegree ? "Degree Mode" : "Radian Mode");
}

// ================= MEMORY =================
function memoryClear() { memory = 0; }

function memoryRecall() {
  result.value = memory;
}

function memoryAdd() {
  memory += parseFloat(result.value) || 0;
}

function memorySubtract() {
  memory -= parseFloat(result.value) || 0;
}

// ================= KEYBOARD =================
document.addEventListener("keydown", function(e) {
  if (!isNaN(e.key) || "+-*/.^()".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  }
});