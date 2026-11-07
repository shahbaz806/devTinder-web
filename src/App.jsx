
import "./index.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { ThemeProvider } from "./Components/Context/ThemeContext";

import Body from "./Components/Body";

const Login = lazy(() => import("./Components/Login"));
const Profile = lazy(() => import("./Components/Profile"));
const Feed = lazy(() => import("./Components/Feed"));
const Connection = lazy(() => import("./Components/Connection"));
const Request = lazy(() => import("./Components/Request"));
const Premium = lazy(() => import("./Components/Premium"));
const Chat = lazy(() => import("./Components/Chat"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
  </div>
);

// function App() {
//   return (
//     <Provider store={appStore}>
//       <BrowserRouter basename="/">
//         <Suspense fallback={<PageLoader />}>
//           <Routes>
//             <Route path="/" element={<Body />}>
//               <Route index element={<Feed />} />
//               <Route path="login" element={<Login />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="connections" element={<Connection />} />
//               <Route path="requests" element={<Request />} />
//               <Route path="premium" element={<Premium />} />
//               <Route path="chat/:targetUserId" element={<Chat />} />
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </Provider>
//   );
// }
function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route index element={<Feed />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="connections" element={<Connection />} />
                <Route path="requests" element={<Request />} />
                <Route path="premium" element={<Premium />} />
                <Route path="chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
