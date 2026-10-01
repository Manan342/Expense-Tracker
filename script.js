const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");
const emptyMessage = document.getElementById("emptyMessage");




//for localstorage
const savedExpenses = JSON.parse(localStorage.getItem("expenses"))||[];
const expenses = [...savedExpenses];  // ... means copy all saved expenses to expenses.
const addBtn = document.getElementById("addBtn");



amount.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addBtn.click();
    }
});




let total = 0;
let editedExpense = null;


savedExpenses.forEach(function(expense){
    total += expense.amount;
    displayExpense(expense);
});



balance.textContent = `₹${total}`;







function displayExpense(expense) {
    
    emptyMessage.style.display = "none";
        
    
        const li = document.createElement("li"); 
            
            expense.element = li;
            
            const expenseText = document.createElement("span");
            expense.textElement = expenseText;
            expenseText.textContent = `${expense.title} | ${expense.category} | ₹${expense.amount}`;

            li.appendChild(expenseText);
    
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");

            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete";
            editBtn.textContent = "Edit";
            
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
        
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

        editBtn.addEventListener("click",function(){

            title.value = expense.title;
            category.value = expense.category;
            amount.value = expense.amount;

            editedExpense = expense;
            addBtn.textContent = "Update Expense";

        });
    
    
    expenseList.appendChild(li);
}











addBtn.addEventListener("click",function(){

    if(title.value ===""|| amount.value === "" || category.value ===""){
        return;
    }
    //remove old data amount from total
    if(editedExpense !== null){
     
        //save the old amount first
        const oldAmount = editedExpense.amount;


        //Update expense data
        editedExpense.title = title.value;   
        editedExpense.category = category.value;
        editedExpense.amount = Number(amount.value);
        

        // Add new amount to total
        total = total - oldAmount + editedExpense.amount;

        
        //update only the text not, the whole <li>
        editedExpense.textElement.textContent =
                `${editedExpense.title} | ${editedExpense.category} | ₹${editedExpense.amount}`;
        
        
        
        //Update localStorage
        localStorage.setItem("expenses",JSON.stringify(expenses));

        
        //Update Balance
        balance.textContent = `₹${total}`;

        
        //Go back to Add mode
        editedExpense = null;
        addBtn.textContent = "Add Expense";


        //clearing the old txt after updating 
        title.value = "";
        amount.value = "";
        category.value = "";
        
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
    
    total += (expense.amount); 
    balance.textContent = `₹${total}`;  

    displayExpense(expense);
    
    
    
    
    title.value = "";
    amount.value = "";
    category.value = "";

});




//connecting backend with frontend 
fetch("http://localhost:3000/expenses")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    });
    


