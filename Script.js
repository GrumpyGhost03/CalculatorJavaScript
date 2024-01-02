class Calculator {
  constructor(prevOperandElem, currOperandElem) {
    this.prevOperandElem = prevOperandElem
    this.currOperandElem = currOperandElem
    this.clear()
  }

  clear() {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  appendNumber(number) {
    this.currOperand = `${this.currOperand}${number}`
  }

  chooseOperation(operation) {
    if (this.currOperand === '') return
    if (this.prevOperand !== '') this.compute()
    
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ''
  }

  compute() {
    let result
    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currOperand)
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        result = prev / current
        break
      default:
        return
    }

    this.currOperand = result
    this.operation = undefined
    this.prevOperand = ''
  }

  getDisplayNumber(number) {
    const strNumber = number.toString()
    const integerDigits = parseFloat(strNumber.split('.')[0])
    const decimalDigits = strNumber.split('.')[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    }
    else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    }
    else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currOperandElem.innerText = this.getDisplayNumber(this.currOperand)
    if (this.operation != null) {
      this.prevOperandElem.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
    }
    else {
      this.prevOperandElem.innerText = ''
    }
  }
}

const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const prevOperandElem = document.querySelector('[data-previous-operand]');
const currOperandElem = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandElem, currOperandElem);

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})
