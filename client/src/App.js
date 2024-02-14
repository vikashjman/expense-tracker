import "./App.css";
import { deleteExpense, postExpense } from "./api";
import ResponsiveDrawer from "./components/Nav";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CATEGORY, MONTH } from "./constants/constant";
const Homepage = () => {
  
  const [newExpense, setnewExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const handleAdd = async (e) => {
    const payload = {
      uuid: "",
      month: newExpense.month,
      transaction: {
        title: newExpense.title,
        amount: newExpense.amount,
        category: newExpense.category,
      },
    };
    await postExpense(payload);//dB post 
    setnewExpense(null);// state update
    console.log("payload",payload);
    setExpenses([payload,...expenses]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setnewExpense({ ...newExpense, [name]: value });
  };

  const handleDeleteExpense = async (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.uuid !== id);
    setExpenses(updatedExpenses);
    await deleteExpense(id);
  };

  const generateYearlyExpense = () => {
    const monthlyTotals = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
    };

    expenses.forEach((exp) => {
      const monthKey = exp.month.toLowerCase();
      if (monthKey in monthlyTotals) {
        monthlyTotals[monthKey] += parseInt(exp.transaction.amount) || 0;
      }
    });

    return Object.values(monthlyTotals);
  };

  const getMonthlyCategoryExpense = (month) => {
    let categorySpent = {};

    Object.values(CATEGORY).forEach(cat => {
      categorySpent[cat] = 0;
    });

    expenses.forEach(({transaction}) => {
      const { category, amount } = transaction;
      if (categorySpent.hasOwnProperty(category)) {
        categorySpent[category] += parseInt(amount) || 0;
      }
    });
    return Object.values(categorySpent);
  };
  return (
    <div className="App">
      <ResponsiveDrawer
        newExpense={newExpense}
        setExpenses={setExpenses}
        handleDeleteExpense={handleDeleteExpense}
        generateYearlyExpense={generateYearlyExpense}
        getMonthlyCategoryExpense={getMonthlyCategoryExpense}
        budgets={budgets}
        setBudgets={setBudgets}
      />
    </div>
  );
};
function App() {

  return (
    <Routes>
      <Route index element={<Homepage />} />

      {/* 
      <Route /> */}
    </Routes>
  );
}

export default App;
