export const first = (arr) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }
  return arr[0];
};
