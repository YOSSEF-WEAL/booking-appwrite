export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Get month
  const options = { month: "short" };
  const month = date.toLocaleString("en-US", options, { timeZone: "UTC" });

  // Get day
  const day = date.getUTCDate();

  // Format time in UTC 12-hour
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const time = date.toLocaleString("en-US", timeOptions);

  // Final formatted string
  return `${month} ${day} at ${time}`;
}
