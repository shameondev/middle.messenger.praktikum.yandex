export const last = (arr) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }
  return arr[arr.length - 1];
};
