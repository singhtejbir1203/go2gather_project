export const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const isFutureTime = (date) => {
  return date.getTime() > Date.now();
};
