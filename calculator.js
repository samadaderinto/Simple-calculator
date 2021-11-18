class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement
            this.currentOperandTextElement = currentOperandTextElement
            this.clear()
    }

    clear() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes('.'))  return
        this.currentOperand = this.currentOperand.toString() +  number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
           this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const current = parseFloat(this.currentOperand)
        const prev = parseFloat(this.previousOperand)

        if (isNaN(prev) || isNaN(current)) return 
         switch (this.operation) {
             case '+':
                 computation = prev + current
                 break;
            case '-':
                computation = prev - current
            break;
            case '*':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;
         
             default:
                 break;
         }   

         this.previousOperand = ""
         this.currentOperand = computation
         this.operation = undefined
        
       
    }

    getDisplayNumber(number) {
        const stringNumber = number.toLocaleString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = parseFloat(stringNumber.split('.')[1])
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (!isNaN(decimalDigits)) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
     
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
        
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const btnClick = "click";

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener(btnClick, () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener(btnClick, () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

equalsButton.addEventListener(btnClick, button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener(btnClick, () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener(btnClick, () => {
    calculator.clear()
    calculator.updateDisplay()
})


