// script.js

const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalBudget = parseFloat(localStorage.getItem('totalBudget')) || 0;

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function updateBudgetDisplay() {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;

  income.innerText = `₹${totalBudget.toFixed(2)}`;
  expense.innerText = `₹${totalSpent.toFixed(2)}`;
  balance.innerText = `₹${remaining.toFixed(2)}`;
}

function addExpenseDOM(expenseObj) {
  const item = document.createElement('li');
  item.classList.add('minus');
  item.innerHTML = `
    ${expenseObj.text} <span>-₹${expenseObj.amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="removeExpense(${expenseObj.id})">❌</button>
  `;
  list.appendChild(item);
}

function removeExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  updateLocalStorage();
  init();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '' || isNaN(amount.value)) {
    alert('Please enter valid expense details');
    return;
  }

  const exp = {
    id: generateID(),
    text: text.value,
    amount: parseFloat(parseFloat(amount.value).toFixed(2)),
  };

  expenses.push(exp);
  updateLocalStorage();
  addExpenseDOM(exp);
  updateBudgetDisplay();

  text.value = '';
  amount.value = '';
});

budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (budgetInput.value.trim() === '' || isNaN(budgetInput.value)) {
    alert('Please enter a valid total budget');
    return;
  }
  totalBudget = parseFloat(parseFloat(budgetInput.value).toFixed(2));
  localStorage.setItem('totalBudget', totalBudget);
  updateBudgetDisplay();
  budgetInput.value = '';
});

function updateLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function init() {
  list.innerHTML = '';
  expenses.forEach(addExpenseDOM);
  updateBudgetDisplay();
}

init();
