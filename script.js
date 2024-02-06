const visor = document.querySelector('.visor span');
let currentExpression = "";

function exibirNoVisor(value) {
  if (visor.textContent === "0" || visor.textContent === "Erro") {
    visor.textContent = value;
  } else {
    visor.textContent += value;
  }

  currentExpression = visor.textContent;
  
  if (currentExpression.length > 16) {
    currentExpression = currentExpression.slice(0, 16);
    visor.textContent = currentExpression;
  }
}

function limparVisor() {
  currentExpression = "";
  visor.textContent = "0";
}

function calcularResultado() {
  try {
    const expressionWithOperators = currentExpression.replace(/÷/g, '/').replace(/x/g, '*');
    const result = eval(expressionWithOperators);
    if (!isFinite(result)) {
      throw new Error("Erro");
    }
    visor.textContent = result;
    currentExpression = result.toString();
  } catch (error) {
    visor.textContent = "Erro";
    currentExpression = "";
  }
}

document.querySelectorAll('.teclas button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;
    const action = e.target.dataset.action;

    if (!action) {
      exibirNoVisor(value);
    } else if (action === 'clearAll') {
      limparVisor();
    } else if (action === 'clear') {
      currentExpression = currentExpression.slice(0, -1) || "0";
      visor.textContent = currentExpression;
    } else if (action === 'calculate') {
      calcularResultado();
    } else {
      if (currentExpression !== "" && !isNaN(currentExpression[currentExpression.length - 1])) {
        exibirNoVisor(value);
      }
    }
  });
});