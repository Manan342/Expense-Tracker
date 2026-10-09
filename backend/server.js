require("dotenv").config();
process.env.MONGO_URI
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");
const app = express();


//connect mongoose to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(function(){
        console.log("MongoDB connected");
    })
    .catch(function(error){
        console.log("MongoDB connection error:",error)
    });



app.use(cors());
app.use(express.json());



app.get("/expenses" , async function(req,res){
    
    const expenses = await Expense.find();
    
    res.json(expenses);

});



app.post("/expenses",async function(req,res){
    
    const expense =await Expense.create(req.body);
    
    res.json(expense);

});




app.listen(3000,function(){
    console.log("server is running on port 3000");
});




// for delete api 
app.delete("/expenses/:id",async function(req,res){
    
    const id = Number(req.params.id);
   
    const deletedExpense = await Expense.findOneAndDelete({id: id});

    if (deletedExpense === null){
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    res.json({ 
            message: "Expense deleted",
            expense: deletedExpense
        });
});



//for edit api
app.put("/expenses/:id",async function(req,res){
      
    try{
        const id = Number(req.params.id);
        
       const updatedExpense = await Expense.findOneAndUpdate(

            {id:id},
            {
                title:req.body.title,
                category:req.body.category,
                amount:Number(req.body.amount)
            },
            {
                new: true,
                runValidators: true
            }
       );

        if(!updatedExpense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(updatedExpense);
    }
    catch(error){
    console.log("Update error:",error);

    res.status(500).json({
        message: "Failed to update expense"
    });
    }
});
