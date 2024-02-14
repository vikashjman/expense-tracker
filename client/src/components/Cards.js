import React, { useEffect } from "react";
import Education from "../images/Education.png";
import FOOD from "../images/Food.png";
import Travel from "../images/Travel.png";
import "./Elements.css";
import { getExpense } from "../api";

function Elements(props) {
  // Map each category to its corresponding image
  const categoryImageMap = {
    EDUCATION: Education,
    FOOD: FOOD,
    TRAVEL: Travel,
  };
  useEffect(() => {
    const getExpenseData = async () => {
      const expenseData = await getExpense();
      props.setExpenses(expenseData.data);
    }
    getExpenseData();
  }, [])
  return (
    <div className="expenseBody">
      {props.expenses.map((expense, index) => (
        <div key={index} className="expenseCard">
          <img
            className="expenseIcon"
            src={categoryImageMap[expense.transaction.category]}
            alt="image"
          />
          <label className="expenseTitle" key={index}>
            {expense.transaction.title}
          </label>
          <label className="expenseAmount" key={index}>
            {expense.transaction.amount}
          </label>
          <button onClick={() => props.handleDeleteExpense(expense.uuid)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Elements;
