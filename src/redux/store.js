import { combineReducers ,configureStore } from '@reduxjs/toolkit'
import  questionReducer from './questionReducer'
import  resultReducer  from './resultReducer'

export const store = configureStore({
    reducer:{
        questions : questionReducer,
        result : resultReducer
    }
})
// const rootReducer = combineReducers({
//     questions : questionReducer,
//     // 
// })
// export default configureStore({ reducer : rootReducer})
