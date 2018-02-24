import { connect } from 'react-redux'
import { fetchArticleList } from './articleActions'
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