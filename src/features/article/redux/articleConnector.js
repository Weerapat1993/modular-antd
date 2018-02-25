import { connect } from 'react-redux'
import { 
  fetchArticleList, 
  fetchArticleDetail,
  formCreateArticle,
  formUpdateArticle,
} from './articleActions'
import { Article } from './articleReducer'

export const withArticle = (WrapperComponent) => (
  connect(
    (state) => ({
      article: Article(state),
    }),
    {
      fetchArticleList,
    }
  )(WrapperComponent)
)

export const withArticleByID = (WrapperComponent) => (
  connect(
    (state) => ({
      keys: Article(state).keys,
      byID: Article(state).byID,
    }),
    {
      fetchArticleDetail,
    }
  )(WrapperComponent)
)

export const withArticlePost = (WrapperComponent) => (
  connect(
    (state) => ({
      article: Article(state),
    }),
    {
      formCreateArticle,
      formUpdateArticle,
    }
  )(WrapperComponent)
)