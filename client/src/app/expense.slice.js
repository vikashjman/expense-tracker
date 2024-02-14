import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getExpense } from '../api';

const defaultState = {
    month: "JANUARY",
    title: "",
    amount: 0,
    category: "FOOD",
};
const initialState = {
    loading: false,
    expenses: [],
    error: null
}

const fetchExpenseData = createAsyncThunk(
    'community/fetchExpenseData',
    async () => {
        return await getExpense();
    }
)

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        add: (state, action) => {
            state.expenses = [action.payload, ...state.expenses]
        },
        remove: (state, action) => {
            const { id } = action.payload;
            state.expenses = state.expenses.filter((expense) => expense.uuid !== id)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExpenseData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
            state.loading = false
            state.expenses = action.payload
            state.success = true
        })
        builder.addCase(fetchExpenseData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default expenseSlice.reducer
export const { add, remove } = expenseSlice.actions;
export { fetchExpenseData }
