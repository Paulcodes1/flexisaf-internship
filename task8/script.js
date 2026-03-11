let currentInput = '0';   // The bottom display (current number)
let fullHistory = '';    // The top display (the whole equation)
let isCalculated = false; // Tracks if we just finished an equation

const display = document.getElementById('display');
const previousDisplay = document.getElementById('previous-operand');

// Helper to update the UI
function updateDisplay() {
    display.innerText = currentInput;
    previousDisplay.innerText = fullHistory;
}

// --- 1. THE DELETE FUNCTION ---
function deleteLast() {
    if (isCalculated) return; // Don't delete if equation is finished
    
    // Remove last char from both strings
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    
    fullHistory = fullHistory.slice(0, -1);
    updateDisplay();
}

// --- 2. APPENDING NUMBERS ---
function appendNumber(number) {
    // If user starts typing after a result, reset everything
    if (isCalculated) {
        currentInput = number;
        fullHistory = number;
        isCalculated = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            // Check for double decimals
            if (number === '.' && currentInput.includes('.')) return;
            currentInput += number;
        }
        fullHistory += number;
    }
    updateDisplay();
}

// --- 3. APPENDING OPERATORS ---
function appendOperator(op) {
    if (isCalculated) {
        // If we just got a result, use that result to start a new equation
        fullHistory = currentInput;
        isCalculated = false;
    }

    const lastChar = fullHistory.slice(-1);
    // Prevent double operators (e.g., "5++")
    if (['+', '-', '*', '/'].includes(lastChar)) {
        // Replace the old operator with the new one
        fullHistory = fullHistory.slice(0, -1) + op;
    } else {
        fullHistory += op;
    }
    
    currentInput = '0'; // Reset bottom for the next number
    updateDisplay();
}

// --- 4. THE MATH ENGINE ---
function calculate() {
    if (isCalculated || fullHistory === '') return;

    try {
        // Using Function constructor to safely evaluate the string
        let result = new Function('return ' + fullHistory)();
        
        // Formatting the top display
        fullHistory = `${fullHistory} = ${result}`;
        currentInput = result.toString();
        isCalculated = true;
    } catch (error) {
        currentInput = "Error";
        fullHistory = "";
    }
    updateDisplay();
}

// --- 5. EVENT LISTENERS ---
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const val = button.innerText;

        if (id === 'clear') {
            currentInput = '0';
            fullHistory = '';
            isCalculated = false;
            updateDisplay();
        } else if (id === 'delete') {
            deleteLast();
        } else if (id === 'equals') {
            calculate();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
            // Map the IDs to math symbols
            const ops = { add: '+', subtract: '-', multiply: '*', divide: '/' };
            appendOperator(ops[id]);
        } else {
            // It's a number or decimal
            appendNumber(val);
        }
    });
});