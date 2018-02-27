import { productReducer } from './product'
import { articleReducer } from './article'
import { authReducer } from './auth'

// RootReducer
const rootReducer = {
  product: productReducer,
  article: articleReducer,
  auth: authReducer,
}

export default rootReducer