const mongoose = require("mongoose");
const budgetSchema = new mongoose.Schema({
  month: {type:String, required:true},
  monthlyBudget: {type:Number, required:true},
  budgets: [
    {
      amount: {type:Number, required:true},
      category: {type:String, required:true},
    },
  ],
});

const budget = mongoose.model("budget", budgetSchema);
module.exports = budget;
