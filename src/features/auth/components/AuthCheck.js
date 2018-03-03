import { withAuth } from '../redux'

const AuthCheck = ({ auth, children }) => (
  auth.isAuth ? children : null
)

export default withAuth(AuthCheck)