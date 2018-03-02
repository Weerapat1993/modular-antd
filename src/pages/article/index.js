import { withPermission } from '../../features'
import ArticleHome from './ArticlePage'
import ArticleCreate from './ArticleCreate'
import ArticleDetail from './ArticleDetail'
import ArticleUpdate from './ArticleUpdate'

export default {
  Home: ArticleHome,
  Create: withPermission(ArticleCreate),
  Detail: ArticleDetail,
  Edit: withPermission(ArticleUpdate),
}