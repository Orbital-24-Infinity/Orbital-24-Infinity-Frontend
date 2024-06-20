export const getDateNow = (offset?: number): Date => {
  const date = new Date();
  if (offset) {
    date.setDate(date.getDate() + offset);
  }
  return date;
};
