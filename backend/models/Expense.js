const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
    title: String,
    category: String,
    amount: Number
});