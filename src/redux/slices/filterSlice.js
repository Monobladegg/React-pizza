import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: 'Популярности',
    sortProperty: 'rating',
  }
}

const filterSlice = createSlice({
  name: 'Filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log('action setCategoryId', action)
      state.categoryId = action.payload
    },
    setSort(state, action) {
      console.log('action setCategoryId', action)
      state.sort = action.payload
    }
  }
})

export const { setCategoryId, setSort } = filterSlice.actions

export default filterSlice.reducer