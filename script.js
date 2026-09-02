const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");

const expenses = [];
const addBtn = document.getElementById("addBtn");

amount.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addBtn.click();
    }
});


let total = 0;

addBtn.addEventListener("click",function(){

    if(title.value ===""|| amount.value === "" || category.value ===""){
        return;
    }

    const expense = {
        title:title.value,
        category: category.value,
        amount: amount.value
    }
    expenses.push(expense);
    total += Number(expense.amount); 
    balance.textContent = `₹${total}`;  
    console.log(expenses); 

    const li = document.createElement("li"); 
    li.textContent = `${expense.title}-${expense.category}-₹${expense.amount}`;
    expenseList.appendChild(li);
    title.value = "";
    amount.value = "";
    category.value = "";
});


