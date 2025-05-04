/**
 * get value in browser cookie - js
 * @param name
 * @returns
 */
export default function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}
