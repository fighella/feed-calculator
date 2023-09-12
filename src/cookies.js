// See if the customer has used the form and try and bring back some info
const cookieResult = checkAndSetCookie();
console.log("Cookie result:", cookieResult);

function setCookie(key, value) {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Cookie expires in 30 days
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${key}=${value}; ${expires}; path=/`;
}

function getCookie(key) {
  const cookies = document.cookie.split(";");
  var _email = "--not-set--";
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.trim().split("=");
    if (cookieKey === key) {
      console.log("CV", key, cookieKey, cookieValue);
      var _email = cookieValue;
    }
  }
  return _email;
}

function checkAndSetCookie() {
  const key = "calculator_customer_id";

  const existingValue = getCookie(key);
  console.log("Exisitng Value", existingValue);
  if (existingValue === null) {
    console.log("No Cookie Found");
    const now = new Date().toISOString();
    setCookie(key, now);
    return now;
  } else {
    console.log("Cookie Found", existingValue);
    return existingValue;
  }
}
