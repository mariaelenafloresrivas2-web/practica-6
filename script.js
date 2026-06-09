let expression = '';
function updateScreen(value) {
  const screen = document.getElementById('screen');
  screen.textContent = value === '' ? '0' : value;
}
function appendToDisplay(value) {
  if (expression === '' && ['+', '*', '/', '%'].includes(value)) return;
  const lastChar = expression.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(lastChar) &&
      ['+', '-', '*', '/', '%'].includes(value)) {
    expression = expression.slice(0, -1);
  }
  expression += value;
  updateScreen(expression);
}
function clearDisplay() {
  expression = '';
  updateScreen('0');
}
function allClear() {
  clearDisplay();
}
function calculate() {
  if (expression === '') return;
  try {
    let evalExpression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
    let result = Function('"use strict"; return (' + evalExpression + ')')();
    result = parseFloat(result.toFixed(10));
    updateScreen(result);
    expression = String(result);
  } catch (e) {
    updateScreen('Error');
    expression = '';
  }
}
document.addEventListener('keydown', function(e) {
  const key = e.key;
  if ('0123456789'.includes(key))       appendToDisplay(key);
  else if (['+', '-', '*', '/'].includes(key)) appendToDisplay(key);
  else if (key === '%')                 appendToDisplay('%');
  else if (key === '.')                 appendToDisplay('.');
  else if (key === 'Enter' || key === '=') calculate();
  else if (key === 'Escape' || key === 'c' || key === 'C') clearDisplay();
  else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateScreen(expression === '' ? '0' : expression);
  }
});