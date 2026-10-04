
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");
const emptyMessage = document.getElementById("emptyMessage");




const expenses = [];
const addBtn = document.getElementById("addBtn");



amount.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addBtn.click();
    }
});




let total = 0;

fetch("http://localhost:3000/expenses")
    .then(function(response) {
        return response.json();
    })
    
    
    .then(function(data) {

    console.log("Data from backend:", data);

    data.forEach(function(expense) {
        console.log("Expense:", expense);
        console.log("Amount:", expense.amount, typeof expense.amount);
            expenses.push(expense);
            total += expense.amount;
            displayExpense(expense);
        });

        balance.textContent = `₹${total}`;
    })
    .catch(function(error) {
        console.log("Error:", error);
    });

let editedExpense = null;







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

            fetch('http://localhost:3000/expenses/${expenses.id}',{
                method:"DELETE"
            })
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                const index = expenses.findIndex(function(item){
                        return item.id === expense.id;
                });
            
                    
                expenses.splice(index,1);
                total -= expense.amount;
                balance.textContent = `₹${total}`;
        
                li.remove();
                if(expenses.length === 0){
                emptyMessage.style.display = "block";
                }
            })
            .catch(function(error){
                console.log("delete error: ", error);
            });

            
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

    console.log("upadate/add but")

    if(title.value ===""|| amount.value === "" || category.value ===""){
        return;
    }
    //remove old data amount from total
    if(editedExpense !== null){
     
        //save the old amount first
        const oldAmount = editedExpense.amount;

        const updatedExpense = {
            title: title.value,
            category: category.value,
            amount: Number(amount.value)
        };
        fetch(`http://localhost:3000/expenses/${editedExpense.id}`,{

            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedExpense)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){

        

        //Update expense data
        editedExpense.title = data.title;   
        editedExpense.category = data.category;
        editedExpense.amount = data.amount;
        

        // Add new amount to total
        total = total - oldAmount + data.amount;

        
        //update only the text not, the whole <li>
        editedExpense.textElement.textContent =
                `${data.title} | ${data.category} | ₹${data.amount}`;
        
        

        
        //Update Balance
        balance.textContent = `₹${total}`;

        
        //Go back to Add mode
        editedExpense = null;
        addBtn.textContent = "Add Expense";


        //clearing the old txt after updating 
        title.value = "";
        amount.value = "";
        category.value = "";
        })
        .catch(function(error){
            console.log("Update error:",error);
        }); 
        return;
    }

    
    
    const expense = {
        
        id: Date.now(),
        title:title.value,
        category: category.value,
        amount: Number(amount.value)
        
    }

fetch("http://localhost:3000/expenses", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log("Backend received:", data);
 
 
    expenses.push(data);

    total += data.amount;

    balance.textContent = `₹${total}`;

    displayExpense(data);


})
.catch(function(error) {
    console.log("Error:", error);
});

    
    
    title.value = "";
    amount.value = "";
    category.value = "";

});







