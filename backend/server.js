
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());


const expenses = [
    {
        id: 1,
        title: "Food",
        category: "Food",
        amount: 500
    },
    {
        id: 2,
        title: "Movie",
        category: "Entertainment",
        amount: 300
    }
];

app.get("/" , function(req,res){
    res.send("hello manan");
});

app.get("/expenses" , function(req,res){
    res.json(expenses);
});

app.post("/expenses",function(req,res){
    const expense =req.body;
    expenses.push(expense);
    res.json(expense);
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});




// for delete api 
app.delete("/expenses/:id",function(req,res){
    const id = Number(req.params.id);
    const index = expenses.findIndex(function(expense){
        return expense.id === id ;

    });

    expenses.splice(index,1);
    
    res.json({ message: "Expense deleted"});
});



//for edit api
app.put("/expenses/:id",function(req,res){
        
        const id = Number(req.params.id);
        
        const index = expenses.findIndex(function(expense){
            return expense.id === id
        });

        if(index === -1){
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        expenses[index].title = req.body.title;
        expenses[index].category = req.body.category;
        expenses[index].amount = req.body.amount;

        res.json(expenses[index]);
});
