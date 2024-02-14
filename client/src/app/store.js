import { configureStore } from '@reduxjs/toolkit';
import expenseReducer, { fetchExpenseData } from './expense.slice'

export const store = configureStore({
    reducer: {
        expense: expenseReducer
    }
});

store.dispatch(fetchExpenseData);

export const trackerActions = {
    fetchExpenseData,
}

