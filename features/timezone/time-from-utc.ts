export function getTimeFromUTC(utcOffset: string) {
  const offset = parseInt(utcOffset.replace("UTC", ""));

  const now = new Date();

  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

  // hours to milissecons
  const targetTime = new Date(utcTime + offset * 3600000);

  return targetTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
