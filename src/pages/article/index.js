import { withAuthPermission } from '../../features'
import ArticleHome from './ArticlePage'
import ArticleCreate from './ArticleCreate'
import ArticleDetail from './ArticleDetail'
import ArticleUpdate from './ArticleUpdate'

export default {
  Home: ArticleHome,
  Create: withAuthPermission(ArticleCreate),
  Detail: ArticleDetail,
  Edit: withAuthPermission(ArticleUpdate),
}