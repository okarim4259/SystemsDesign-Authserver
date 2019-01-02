export const isEmpty = (obj: any): boolean => {
  if (
    obj === null ||
    obj === undefined ||
    (obj.length !== undefined && obj.length === 0) ||
    Object.keys(obj).length === 0
  ) {
    return true;
  }

  return false;
};
