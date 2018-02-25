import { API_ENDPOINT } from "../../../config";

export const API_ENDPOINT_ARTICLE_LIST = () => API_ENDPOINT('/articles')
export const API_ENDPOINT_ARTICLE_DETAIL = (id) => API_ENDPOINT(`/articles/${id}`)