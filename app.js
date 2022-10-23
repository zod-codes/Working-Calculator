class Calculator {
    constructor(prevText, nowText) {
        this.prevText = prevText
        this.nowText = nowText
        this.clear()
    }
    clear() {
        this.currentOperation = ''
        this.previousOperation = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperation.includes(".")) return
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperation === '') return
        if (this.previousOperation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
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
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperation = computation
        this.operation = undefined
        this.previousOperation = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.') [0])
        const decimalDigits = stringNumber.split('.') [1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.nowText.textContent =
            this.getDisplayNumber(this.currentOperation)
        if (this.operation != null) {
            this.prevText.textContent =
                `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        } else {
            this.prevText.textContent = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-num]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals-button]')
const deleteButton = document.querySelector('[data-del]')
const allClear = document.querySelector('[data-C]')
const prevText = document.querySelector('[data-prev]')
const nowText = document.querySelector('[data-now]')

const calculator = new Calculator(prevText, nowText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})