import { connect } from 'react-redux'
import { fetchProductList } from './productActions'
import { store } from '../../../utils'

export const withProduct = (WrapperComponent) => (
  connect(
    // MapStateToProps
    (state) => ({
      keys: store(state).product.keys,
      byID: store(state).product.byID,
    }),
    {
      fetchProductList,
    }
  )(WrapperComponent)
)

