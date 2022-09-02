import { combineReducers } from 'redux'
import {categoryItemsReducers} from './categoryReducers'

export default combineReducers({
    categoryItems: categoryItemsReducers,
})