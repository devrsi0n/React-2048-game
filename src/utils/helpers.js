/* eslint-disable import/prefer-default-export */
export function isObjEqual(preObj, obj) {
  return JSON.stringify(preObj) === JSON.stringify(obj);
}
