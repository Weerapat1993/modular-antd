import { API_ENDPOINT } from "../../../config";

export const API_ENDPOINT_AUTH_LOGIN = () => API_ENDPOINT('/register')
export const API_ENDPOINT_AUTH_USER_WITH_TOKEN = (token) => API_ENDPOINT(`/users/token?token=${token}`)