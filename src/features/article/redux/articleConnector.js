import { connect } from 'react-redux'
import { 
  fetchArticleList, 
  fetchArticleDetail,
  createArticle,
} from './articleActions'
import { store } from '../../../utils';


export const withArticle = (WrapperComponent) => (
  connect(
    (state) => ({
      article: store(state).article,
    }),
    {
      fetchArticleList,
    }
  )(WrapperComponent)
)

export const withArticleByID = (WrapperComponent) => (
  connect(
    (state) => ({
      keys: store(state).article.keys,
      byID: store(state).article.byID,
    }),
    {
      fetchArticleDetail,
    }
  )(WrapperComponent)
)

export const withArticlePost = (WrapperComponent) => (
  connect(
    (state) => ({
      article: store(state).article,
    }),
    {
      createArticle,
    }
  )(WrapperComponent)
)