import React, { useState } from "react";
import Charts from "./Charts/Charts";
import LineGraph from "./Charts/LineGraph";

export const ChartsView = (props) => {
  const [view, setView] = useState("donught");
  const { generateYearlyExpense, getMonthlyCategoryExpense ,expenses} = props;
  const viewCheck = (graph) => view === graph;

  
  return (
    <div>
      <select name="view" value={view}  id="" onChange={(e => setView(e.target.value))}>
        <option value="donught">Monthly</option>
        <option value="line">Yearly</option>
      </select>

      <div>
        {viewCheck("donught") && <Charts  expenses={expenses} getMonthlyCategoryExpense={getMonthlyCategoryExpense}  />}
        {viewCheck("line") && (
          <LineGraph expenses={expenses} generateYearlyExpense={generateYearlyExpense} />
        )}
      </div>
    </div>
  );
};
