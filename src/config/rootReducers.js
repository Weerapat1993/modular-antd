import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { productReducer } from '../features/product'
import { articleReducer } from '../features/article'

export default combineReducers({
  form: formReducer,
  product: productReducer,
  article: articleReducer,
})