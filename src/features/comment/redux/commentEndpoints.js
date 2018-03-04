import { API_ENDPOINT } from "../../../config";

export const API_ENDPOINT_COMMENT_LIST = (id) => API_ENDPOINT(`/comments?article_id=${id}`)
export const API_ENDPOINT_POST_COMMENT = () => API_ENDPOINT('/comments')