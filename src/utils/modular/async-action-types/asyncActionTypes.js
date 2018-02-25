/** 
 * @typedef {Object} AsyncActionTypes
 * @property {string} REQUEST
 * @property {string} SUCCESS
 * @property {string} FAILURE
 */

export const asyncActionType = (type) => ({
  REQUEST: type+'_REQUEST',
  SUCCESS: type+'_SUCCESS',
  FAILURE: type+'_FAILURE',
})

export const crudActionType = (name) => ({
  LIST: asyncActionType(`${name}_LIST`),
  DETAIL: asyncActionType(`${name}_DETAIL`),
  CREATE: asyncActionType(`${name}_CREATE`),
  UPDATE: asyncActionType(`${name}_UPDATE`),
  DELETE: asyncActionType(`${name}_DELETE`),
})

export class AsyncActions {
  /**
   * Async Actions Creator
   * @param {AsyncActionTypes} type 
   * @param {string} key
   */
  constructor(type, key) {
    this.type = type
    this.key = key
  }

  request(key) {
    return {
      type: this.type.REQUEST,
      key
    }
  }

  success(data, key) {
    return {
      type: this.type.SUCCESS,
      data,
      key,
    }
  }
  failure(error, key) {
    return {
      type: this.type.FAILURE,
      error,
      key,
    }
  }
}