
// export const BASE_URL =
//   location.hostname === "localhost" ? "http://localhost:3000" : "/api";


const API_URL =
  import.meta.env.VITE_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://dev-tinder-b.vercel.app");

export const BASE_URL = API_URL.replace(/\/+$/, "");
