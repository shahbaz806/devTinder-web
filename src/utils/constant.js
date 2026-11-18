
// export const BASE_URL =
//   location.hostname === "localhost" ? "http://localhost:3000" : "/api";


export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://dev-tinder-b.vercel.app");
