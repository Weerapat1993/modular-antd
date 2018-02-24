import { connect } from 'react-redux'
import { fetchProductList, reloadGithibProfile, handleGithubProfile } from './productActions'
import { store } from '../../../utils'

export const withProduct = (WrapperComponent) => (
  connect(
    // MapStateToProps
    (state) => ({
      // product: _.get(store(state),'product.keys.Weerapat1993', defaultData),
      keys: store(state).product.keys,
      byID: store(state).product.byID,

    }),
    {
      fetchProductList,
      reloadGithibProfile, 
      handleGithubProfile
    }
  )(WrapperComponent)
)

