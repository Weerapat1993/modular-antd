

/**
 * Set Normalize data
 * @param {Array.<Object>} data 
 * @param {string} primaryKey
 * @return {Object.<Object>}
 */
export const setNormalize = (data, primaryKey) => {
  if(Array.isArray(data)) {
    let newData = {}
    data.forEach((item) => {
      newData = {
        ...newData,
        [item[primaryKey || 'id']]: {
          isFetching: false,
          error: '',
          isReload: false,
          data: item,
        }
      }
    });
    return newData;
  }
  console.warn('Data is not array.')
  return {}
}