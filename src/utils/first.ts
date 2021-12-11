export const first = <T>(arr: T[]) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }
  return arr[0];
};
