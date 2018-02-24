import { productReducer } from './product'

// RootReducer
const rootReducer = {
  product: productReducer,
}

export default rootReducer

/**
 * Redux Store
 * @param {rootReducer} state
 * @return {rootReducer}
 */
export const store = (state) => state