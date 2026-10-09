const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
    id:{ 
        type:Number,
        required: true
    },
    title:{ 
        type: String,
        required:true,
        trim: true
    },
    category: {
        type:String,
        required: true,
        trim:true
    },
    amount: {
        type: Number,
        required:true,
        min:  0
    }
});

const Expense = mongoose.model("Expense",expenseSchema);
module.exports = Expense;