import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllBudgets } from '../api';


const initialState = {
    loading: false,
    budgets: [],
    error: null
}

const fetchBudgetData = createAsyncThunk(
    'community/fetchBudgetData',
    async () => {
        return await fetchAllBudgets();
    }
)

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchBudgetData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchBudgetData.fulfilled, (state, action) => {
            state.loading = false
            state.budgets = action.payload
            state.success = true
        })
        builder.addCase(fetchBudgetData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default budgetSlice.reducer
export { fetchBudgetData }
