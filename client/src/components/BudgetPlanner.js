import React, { useEffect, useState } from "react";
import "./Budget.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "./Form";
import { fetchAllBudgets, getExpense } from "../api";

function BudgetPlanner({ expenses, setExpenses, budgets, setBudgets }) {
  const [totalData, setTotalData] = useState(0)

  useEffect(() => {
    const get_all_budget = async () => {
      const budgetData = await fetchAllBudgets();
      setBudgets(budgetData.data)
    }
    get_all_budget();
  }, []);



  useEffect(() => {
    const completionData = calculateTotalCompletion();
    
    setTotalData(completionData)
  }, [])

  const valToPercent = (value, total) => {
    console.log(value, total, "value")
    return Math.round((value / total) * 100) || 0;
  }

  const calculateTotalCompletion = () => {
    const value = expenses.reduce((sum, expense) => sum + expense.transaction.amount, 0);
    let budgetValue = 0;
    console.log(budgets)
    budgets.forEach(ele => {
      ele.budgets.forEach(item => {
        budgetValue += parseInt(item.amount);
      })
    })
    return valToPercent(value, budgetValue);
  }

  const yearlyCategoricalCal = () => {

  }

  const monthlyCategoricalCal = (month) => {

  }



  const budget = [
    {
      month: "January",
      amount: 1110324432,
      category: "Food",
      categoryBudget: 20000,
      monthlyBudget: 400000,
    },
    {
      month: "May",
      amount: 340,
      category: "Entertainment",
      categoryBudget: 20000,
      monthlyBudget: 420000,
    },
    {
      month: "January",
      amount: 220,
      category: "Education",
      categoryBudget: 10000,
      monthlyBudget: 400000,
    },
    {
      month: "May",
      amount: 220,
      category: "Education",
      categoryBudget: 10000,
      monthlyBudget: 420000,
    },
    {
      month: "November",
      amount: 220,
      category: "Food",
      categoryBudget: 10000,
      monthlyBudget: 450000,
    },
    {
      month: "March",
      amount: 220,
      category: "Travel",
      categoryBudget: 10000,
      monthlyBudget: 470000,
    },
    {
      month: "November",
      amount: 220,
      category: "Medical",
      categoryBudget: 10000,
      monthlyBudget: 450000,
    },
  ];

  const categories = [
    "Food",
    "Education",
    "Travel",
    "Entertainment",
    "Medical",
    "Other",
    "Groceries",
  ];
  const [selectedMonth, setSelectedMonth] = useState("Yearly");

  // Function to calculate total budget and total spent for each category for the whole year
  const yearlyData = categories.map((category) => {
    const categoryData = budget.filter((item) => item.category === category);
    const totalBudget = categoryData.reduce(
      (acc, item) => acc + item.categoryBudget,
      0
    );
    const totalSpent = categoryData.reduce((acc, item) => acc + item.amount, 0);
    return { category, totalBudget, totalSpent };
  });

  // Function to calculate completion percentage for a category
  const calculateCompletionPercentage = (totalSpent, totalBudget) => {
    return Math.round((totalSpent / totalBudget) * 100) || 0;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="budget-container">
      <div className="overall-budget">
        <label className="budget-title">Overall Budget Completion</label>
        <div className="progress-container">
          <progress
            id="overall-progress"
            value={totalData}
            max="100"
          >
            {totalData}
            %
          </progress>
          <span className="completion">
            {totalData}
            %
          </span>
        </div>
        {/* <Link to="/budget"> */}
        <Button onClick={handleShow} className="budget-button">Budget Planner</Button>
        {/* </Link> */}
      </div>
      <div className="selectorDiv">
        <select
          className="form-select"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option>Yearly</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>
      <div className="category-budgets">
        {yearlyData.map(({ category, totalSpent, totalBudget }, index) => (
          <div key={index} className="category">
            <label className="category-label">{category}</label>
            <div className="progress-container">
              <progress
                className="category-progress"
                value={calculateCompletionPercentage(totalSpent, totalBudget)}
                max="100"
              >
                {calculateCompletionPercentage(totalSpent, totalBudget)}%
              </progress>
              <span className="completion">
                {calculateCompletionPercentage(totalSpent, totalBudget)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BudgetPlanner;


/*
import React, { useState } from 'react';
import './Budget.css';
 
function Budget() {
    const budget = [{
        month: "January",
        amount: 1110,
        category: "Food",
        categoryBudget: 20000,
        monthlyBudget: 400000
    }, {
        month: "May",
        amount: 3440,
        category: "Entertainment",
        categoryBudget: 20000,
        monthlyBudget: 420000
    }, {
        month: "January",
        amount: 220,
        category: "Education",
        categoryBudget: 10000,
        monthlyBudget: 400000
    }, {
        month: "May",
        amount: 220,
        category: "Education",
        categoryBudget: 10000,
        monthlyBudget: 420000
    }, {
        month: "November",
        amount: 220,
        category: "Food",
        categoryBudget: 10000,
        monthlyBudget: 450000
    }, {
        month: "March",
        amount: 220,
        category: "Travel",
        categoryBudget: 10000,
        monthlyBudget: 470000
    },{
        month: "November",
        amount: 220,
        category: "Medical",
        categoryBudget: 10000,
        monthlyBudget: 450000
    }];
 
    const categories = ['Food', 'Education', 'Travel', 'Entertainment', 'Medical', 'Other', 'Groceries'];
    const [selectedMonth, setSelectedMonth] = useState('Yearly');
   
    // Function to calculate total budget and total spent for each category for the whole year
    const yearlyData = categories.map(category => {
        const categoryData = selectedMonth === 'Yearly' ? budget.filter(item => item.category === category) : budget.filter(item => item.category === category && item.month === selectedMonth);
        const totalBudget = categoryData.reduce((acc, item) => acc + item.categoryBudget, 0);
        const totalSpent = categoryData.reduce((acc, item) => acc + item.amount, 0);
        return { category, totalBudget, totalSpent };
    });
 
    // Calculate total budget without any filters
    const totalBudgetWithoutFilters = budget.reduce((acc, item) => acc + item.categoryBudget, 0);
 
    // Function to calculate completion percentage for a category
    const calculateCompletionPercentage = (totalSpent, totalBudget) => {
        return Math.round((totalSpent / totalBudget) * 100) || 0;
    };
 
    return (
        <div className="budget-container">
            <div className="overall-budget">
                <label className="budget-title">Overall Budget Completion</label>
                <div className="progress-container">
                    <progress id="overall-progress" value={calculateCompletionPercentage(yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0), yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0))} max="100">{calculateCompletionPercentage(yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0), yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0))}%</progress>
                    <span className="completion">{calculateCompletionPercentage(yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0), yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0))}%</span>
                </div>
                <button className="budget-button">Budget Planner</button>
            </div>
            <div className='selectorDiv'>
                <select className="form-select" onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option>Yearly</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                </select>
            </div>
            <div className="category-budgets">
                {yearlyData.map(({ category, totalSpent, totalBudget }, index) => (
                    <div key={index} className="category">
                        <label className="category-label">{category}</label>
                        <div className="progress-container">
                            <progress className="category-progress" value={calculateCompletionPercentage(totalSpent, totalBudget)} max="100">{calculateCompletionPercentage(totalSpent, totalBudget)}%</progress>
                            <span className="completion">{calculateCompletionPercentage(totalSpent, totalBudget)}%</span>
                        </div>
                    </div>
                ))}
            </div>
       
        </div>
    );
}
 
export default Budget;
*/
