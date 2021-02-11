class Calculator {
  constructor(Operand2Text, Operand1Text) {
    this.Operand2Text = Operand2Text
    this.Operand1Text = Operand1Text
    this.clear()
  }

  clear() {
    this.Operand1 = ''
    this.Operand1 = ''
    this.operation = undefined
  }

  delete() {
    this.Operand1 = this.Operand1.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.Operand1.includes('.')) return
    this.Operand1 = this.Operand1.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.Operand1 === '') return
    if (this.Operand2 !== '') {
      this.compute()
    }
    this.operation = operation
    this.Operand2 = this.Operand1
    this.Operand1 = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.Operand2)
    const current = parseFloat(this.Operand1)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.Operand1 = computation
    this.operation = undefined
    this.Operand2 = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.Operand1Text.innerText =
      this.getDisplayNumber(this.Operand1)
    if (this.operation != null) {
      this.Operand2Text.innerText =
        `${this.getDisplayNumber(this.Operand2)} ${this.operation}`
    } else {
      this.Operand2Text.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const Operand2Text = document.querySelector('[data-previous-operand]')
const Operand1Text = document.querySelector('[data-current-operand]')

const calculator = new Calculator(Operand2Text, Operand1Text)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})