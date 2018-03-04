import { connect } from 'react-redux'
import { Comment } from './commentReducer'
import { postComment, fetchCommentList } from './commentActions'

export const withComment = (
  connect(
    (state) => ({
      comment: Comment(state),
      auth: state.auth,
    }),
    {
      fetchCommentList,
      postComment
    }
  )
)
