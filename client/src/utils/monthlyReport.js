import { fetchExpenseByMonth } from "../api";
import { CATEGORY } from "../constants/constant";

export const getMonthlyCategorySpent = async (month) => {
  const monthlyExpense = await fetchExpenseByMonth(month);
  let food = 0,
    travel = 0,
    clothing = 0,
    other = 0;
  monthlyExpense.data.forEach(({ transaction }) => {
    if (transaction.category === CATEGORY.food) food += transaction.amount;
    if (transaction.category === CATEGORY.clothing)
      clothing += transaction.amount;
    if (transaction.category === CATEGORY.travel) travel += transaction.amount;
    if (transaction.category === CATEGORY.other) other += transaction.amount;
  });

  return [food, travel, clothing, other];
};



