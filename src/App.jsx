
import "./index.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import Body from "./Components/Body";

const LandingPage = lazy(() => import("./Components/LandingPage"));
const Login = lazy(() => import("./Components/Login"));
const Profile = lazy(() => import("./Components/Profile"));
const Feed = lazy(() => import("./Components/Feed"));
const Connection = lazy(() => import("./Components/Connection"));
const Request = lazy(() => import("./Components/Request"));
const Premium = lazy(() => import("./Components/Premium"));
const Chat = lazy(() => import("./Components/Chat"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<Body />}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connection />} />
                <Route path="/requests" element={<Request />} />
                <Route path="/premium" element={<Premium />} />

                {/* Chat Routes */}
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
