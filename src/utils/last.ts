export const last = <T>(arr: T[]) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }
  return arr[arr.length - 1];
};
