const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || +amount.value === 0) return alert('Please enter valid data');
    const transaction = { id: Math.floor(Math.random()*1000000000), text: text.value, amount: +amount.value };
    transactions.push(transaction);
    updateApp();
    text.value = ''; amount.value = '';
}

function addTransactionDOM(t) {
    const item = document.createElement("li");
    item.classList.add(t.amount < 0 ? "minus" : "plus");
    item.innerHTML = `${t.text} <span>Rs. ${Math.abs(t.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>`;
    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);
    balance.innerText = `Rs. ${total}`;
    money_plus.innerText = `+Rs. ${amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2)}`;
    money_minus.innerText = `-Rs. ${Math.abs(amounts.filter(a => a < 0).reduce((a, b) => a + b, 0)).toFixed(2)}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateApp();
}

function clearAll() {
    if(confirm("Delete all records?")) { transactions = []; updateApp(); }
}

function updateApp() {
    list.innerHTML = "";
    if (transactions.length === 0) list.innerHTML = '<li style="text-align:center; color:#999;">No transactions</li>';
    transactions.forEach(addTransactionDOM);
    updateValues();
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);
updateApp();