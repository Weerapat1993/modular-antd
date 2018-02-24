import { productReducer } from './product'
import { articleReducer } from './article'

// RootReducer
const rootReducer = {
  product: productReducer,
  article: articleReducer,
}

export default rootReducer

/**
 * Redux Store
 * @param {rootReducer} state
 * @return {rootReducer}
 */
export const store = (state) => state