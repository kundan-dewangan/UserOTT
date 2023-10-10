import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'

import { combineReducers } from 'redux'
const reducer = combineReducers({
  // here we will be adding reducers
  authReducer
})
export const store = configureStore({reducer:reducer})