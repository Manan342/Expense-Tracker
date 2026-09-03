const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");
const emptyMessage = document.getElementById("emptyMessage");




const savedExpenses = JSON.parse(localStorage.getItem("expenses"))||[];
const expenses = [...savedExpenses];  // ... means copy all saved expenses to expenses.
const addBtn = document.getElementById("addBtn");



amount.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addBtn.click();
    }
});




let total = 0;
savedExpenses.forEach(function(expense){
    total += expense.amount;
});

savedExpenses.forEach(function(expense){
    displayExpense(expense);
});

balance.textContent = `₹${total}`;

function displayExpense(expense) {
    
    emptyMessage.style.display = "none";
        
    
        const li = document.createElement("li"); 
            li.classList.add("expense-item");
            li.textContent = `${expense.title} | ${expense.category} | ₹${expense.amount}`;

    
    
        const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete";
            li.appendChild(deleteBtn);
    
        deleteBtn.addEventListener("click",function(){
        
            const index = expenses.findIndex(function(item){
                    return item.id === expense.id;
            });
                    
                expenses.splice(index,1);
                total -= expense.amount;
                localStorage.setItem("expenses",JSON.stringify(expenses));
                balance.textContent = `₹${total}`;
        
                li.remove();
                if(expenses.length === 0){
                emptyMessage.style.display = "block";
                }
            
    });
    
    
    expenseList.appendChild(li);
}






addBtn.addEventListener("click",function(){

    if(title.value ===""|| amount.value === "" || category.value ===""){
        return;
    }

    const expense = {
        
        id: Date.now(),
        title:title.value,
        category: category.value,
        amount: Number(amount.value)
    }
    
    expenses.push(expense);
    

    localStorage.setItem("expenses",JSON.stringify(expenses));
    
    total += Number(expense.amount); 
    balance.textContent = `₹${total}`;  

    displayExpense(expense);
    
    
    
    
    title.value = "";
    amount.value = "";
    category.value = "";

});


