const mainIncomeInput = document.getElementById('main_income');
const additionalIncomeInput = document.getElementById('additional_income');
const totalIncomeElement = document.getElementById('total_income');
const addExpenseInput = document.getElementById('add_expense');
const addExpenseBtn = document.getElementById('add_expense_btn');
const expensesList = document.getElementById('expenses_list');
const totalExpenseElement = document.getElementById('total_expenses');
const balanceElement = document.getElementById('balance');
const liveExpenseInput = document.getElementById('live_expense');
const foodExpenseInput = document.getElementById('food_expense');

const STORAGE_KEYS = {
    MAIN_INCOME: 'mainIncome',
    ADDITIONAL_INCOME: 'additionalIncome',
    LIVE_EXPENSE: 'liveExpense',
    FOOD_EXPENSE: 'foodExpense',
    ADDITIONAL_EXPENSES: 'additionalExpenses',
};

function loadData() {
    mainIncomeInput.value = localStorage.getItem(STORAGE_KEYS.MAIN_INCOME) || '';
    additionalIncomeInput.value = localStorage.getItem(STORAGE_KEYS.ADDITIONAL_INCOME) || '';
    liveExpenseInput.value = localStorage.getItem(STORAGE_KEYS.LIVE_EXPENSE) || '';
    foodExpenseInput.value = localStorage.getItem(STORAGE_KEYS.FOOD_EXPENSE) || '';

    const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDITIONAL_EXPENSES)) || [];
    savedExpenses.forEach(expense => {
        addExpenseToDOM(expense.name, expense.amount);
    });

    calculateBalance();
}// завантаженя даних

function saveData() {
    localStorage.setItem(STORAGE_KEYS.MAIN_INCOME, mainIncomeInput.value);
    localStorage.setItem(STORAGE_KEYS.ADDITIONAL_INCOME, additionalIncomeInput.value);
    localStorage.setItem(STORAGE_KEYS.LIVE_EXPENSE, liveExpenseInput.value);
    localStorage.setItem(STORAGE_KEYS.FOOD_EXPENSE, foodExpenseInput.value);

    const additionalExpenses = Array.from(expensesList.querySelectorAll('.expense_block')).map(block => {
        return {
            name: block.querySelector('p').textContent,
            amount: block.querySelector('.expense_amount').value,
        };
    });
    localStorage.setItem(STORAGE_KEYS.ADDITIONAL_EXPENSES, JSON.stringify(additionalExpenses));
}// зберіганя даних

function addExpenseToDOM(name, amount = '') {
    const expenseBlock = document.createElement('div');
    expenseBlock.classList.add('expense_block');

    const expenseLabel = document.createElement('p');
    expenseLabel.textContent = name;
    expenseBlock.appendChild(expenseLabel);

    const expenseAmountInput = document.createElement('input');
    expenseAmountInput.type = 'number';
    expenseAmountInput.placeholder = 'Сума';
    expenseAmountInput.classList.add('expense_amount');
    expenseAmountInput.value = amount;
    expenseAmountInput.addEventListener('input', () => {
        calculateBalance();
        saveData();
    });
    expenseBlock.appendChild(expenseAmountInput);

    const removeExpenseBtn = document.createElement('button');
    removeExpenseBtn.textContent = 'Видалити';
    removeExpenseBtn.classList.add('remove_expense');
    removeExpenseBtn.addEventListener('click', () => {
        expensesList.removeChild(expenseBlock);
        calculateBalance();
        saveData();
    });
    expenseBlock.appendChild(removeExpenseBtn);

    expensesList.appendChild(expenseBlock);
}


function calculateTotalIncome() {
    const mainIncome = parseFloat(mainIncomeInput.value) || 0;
    const additionalIncome = parseFloat(additionalIncomeInput.value) || 0;
    const totalIncome = mainIncome + additionalIncome;
    totalIncomeElement.textContent = `Всього дохід: ${totalIncome.toFixed(2)}`;
    return totalIncome;
}// Розрахунок загального доходу


function calculateTotalExpenses() {
    const liveExpense = parseFloat(liveExpenseInput.value) || 0;
    const foodExpense = parseFloat(foodExpenseInput.value) || 0;

    const expenseInputs = Array.from(expensesList.querySelectorAll('.expense_amount'));
    const additionalExpenses = expenseInputs.reduce((total, input) => {
        const value = parseFloat(input.value) || 0;
        return total + value;
    }, 0);

    const totalExpenses = liveExpense + foodExpense + additionalExpenses;
    totalExpenseElement.textContent = `Всього витрат: ${totalExpenses.toFixed(2)}`;
    return totalExpenses;
}// витрати

function calculateBalance() {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const balance = totalIncome - totalExpenses;
    balanceElement.textContent = `Залишок: ${balance.toFixed(2)}`;
}

function addExpense() {
    const expenseName = addExpenseInput.value.trim();

    if (expenseName) {
        addExpenseToDOM(expenseName);
        addExpenseInput.value = '';
        calculateBalance();
        saveData();
    } else {
        alert('Будь ласка, введіть назву витрати.');
    }
}// додаваня нрвих витрат

addExpenseBtn.addEventListener('click', addExpense);
mainIncomeInput.addEventListener('input', () => {
    calculateBalance();
    saveData();
});
additionalIncomeInput.addEventListener('input', () => {
    calculateBalance();
    saveData();
});
liveExpenseInput.addEventListener('input', () => {
    calculateBalance();
    saveData();
});
foodExpenseInput.addEventListener('input', () => {
    calculateBalance();
    saveData();
});

window.addEventListener('load', loadData);
