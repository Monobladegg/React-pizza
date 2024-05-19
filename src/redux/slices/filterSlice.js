import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  categoryId: 0,
  currentPage: 1,
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
    },
    setCurrentPage(state,action) {
      state.currentPaget = action.payload
    },
  }
})

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer