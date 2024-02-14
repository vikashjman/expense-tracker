const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique:true },
  month: { type: String, required: true },
  transaction: {
    title: String,
    amount: { type: Number, required: true },
    category: { type: String, required: true },
  },
}, {
  timestamps: true
});

const expense = mongoose.model("expense", expenseSchema);
module.exports = expense;
