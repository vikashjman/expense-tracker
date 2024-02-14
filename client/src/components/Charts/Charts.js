import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORY, MONTH } from "../../constants/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts(props) {
  console.log("props", props.getMonthlyCategoryExpense(MONTH.january))
  const data = {
    labels: Object.values(CATEGORY),
    datasets: [
      {
        label: "You Spent ₹",
        data: props.getMonthlyCategoryExpense(MONTH.january),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 205, 8)",
        ],
        hoverOffset: 4,
      },
    ],
  };


  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}
