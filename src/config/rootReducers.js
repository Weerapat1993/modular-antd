import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { productReducer } from '../features/product'

export default combineReducers({
  form: formReducer,
  product: productReducer,
})