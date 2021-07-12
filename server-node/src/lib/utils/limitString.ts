/**
 * Returns the first `limit` characters from the given `string`.
 *
 * @param {String} string
 * @param {Number} limit
 *
 * @returns {String}
 */
export const limitString = (string: string = '', limit: number = 0) => {
  return string.substring(0, limit);
};
