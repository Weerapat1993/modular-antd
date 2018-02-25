import { connect } from 'react-redux'
import { fetchProductList } from './productActions'
import { Product } from './productReducer'

export const withProduct = (WrapperComponent) => (
  connect(
    // MapStateToProps
    (state) => ({
      keys: Product(state).keys,
      byID: Product(state).byID,
    }),
    {
      fetchProductList,
    }
  )(WrapperComponent)
)

