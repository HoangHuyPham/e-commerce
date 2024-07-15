import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./views/Home";
import Panel from "./views/Panel";
import NotFound from "./views/NotFound";
import SignInOut from "./views/SignInUp";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Info from "./views/Info";
import WatchList from "./components/WatchList";
import WatchDetail from "./views/WatchDetail";
import FavoriteWatches from "./views/FavoriteWatches";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="panel" element={<Panel />} />
      </Route>

      <Route path="sign" element={<SignInOut />}>
        <Route index element={<Navigate to="in" />} />
        <Route path="in" element={<SignIn />} />
        <Route path="up" element={<SignUp />} />
      </Route>

      <Route path="info" element={<Info />}>
        <Route index element={<Navigate to="me" />} />
        <Route path="me" element={<Info />} />
        <Route path="up" element={<SignUp />} />
      </Route>

    <Route>
        <Route path="/" element={<WatchList />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/favorites" element={<FavoriteWatches />} />
    </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
