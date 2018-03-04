import { productReducer } from './product'
import { articleReducer } from './article'
import { commentReducer } from './comment'
import { authReducer } from './auth'

// RootReducer
const rootReducer = {
  product: productReducer,
  article: articleReducer,
  comment: commentReducer,
  auth: authReducer,
}

export default rootReducer