
export function findDay(index) {
  const days = ["Pzt", "Sal", "Çar", "Per", "Cuma", "Cmt", "Paz"]
  const day = new Date().getDay() - 1;
  return (days.slice(day, days.length).concat(days.slice(0, 2))[index])
}

export function today() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today
}

export function pmtotf(time) {
  if (time.substr(6) === "AM") {
    return time.substr(0, 5)
  }
  const hour = time.substr(0, 2)
  const rest = time.substr(2, 3)
  return parseInt(hour) + 12 + rest
}

export function convertCityName(cityName) {
  return cityName
    .replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "u")
    .replace(/Ş/gim, "s")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "o")
    .replace(/Ç/gim, "c")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c")
    .replace(/â/gim, "a");
}
