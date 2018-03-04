import { config } from './env'

const APP_ENDPOINT = config.REACT_APP_ENDPOINT
const APP_URL = config.REACT_APP_URL

export const API_ENDPOINT = (PATH) => `${APP_ENDPOINT}${PATH}`
export const URL = (PATH) => `${APP_URL}${PATH}`