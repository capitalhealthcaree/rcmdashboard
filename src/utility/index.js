export  function formatDate(dateString) {
  const date = new Date(dateString);

  const day = ("0" + date.getDate()).slice(-2);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(date)
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedDate = `${day}-${month}-${year}, ${formattedHours}:${minutes}:${seconds} ${amOrPm}`;
  return formattedDate;
}
