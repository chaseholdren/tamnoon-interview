export const getHTMLFormattedDate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

export default getHTMLFormattedDate;
