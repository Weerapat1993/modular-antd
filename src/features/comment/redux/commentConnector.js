import { connect } from 'react-redux'
import { Comment } from './commentReducer'
import { postComment, fetchCommentList, deleteCommentByID } from './commentActions'

export const withComment = (
  connect(
    (state) => ({
      comment: Comment(state),
      auth: state.auth,
    }),
    {
      fetchCommentList,
      postComment,
      deleteCommentByID,
    }
  )
)
