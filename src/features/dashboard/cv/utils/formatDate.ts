export const formatDate = (date: Date | string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
