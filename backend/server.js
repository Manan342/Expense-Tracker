
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());


const expenses = [
    {
        id: 1,
        title: "Food",
        category: "500"
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