import { API_ENDPOINT } from "../../../config";

export const API_ENDPOINT_AUTH_LOGIN = () => API_ENDPOINT('/users')
export const API_ENDPOINT_AUTH_USER_WITH_TOKEN = () => API_ENDPOINT('/users/token')