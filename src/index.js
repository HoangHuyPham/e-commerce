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
    Navigate, Routes
} from "react-router-dom";
import Home from "./views/Home";
import Panel from "./views/Panel";
import NotFound from "./views/NotFound";
import WatchList from "./components/WatchList";
import WatchDetail from "./views/WatchDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="panel" element={<Panel />} />
            </Route>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<WatchList />} />
            <Route path="/watch/:id" element={<WatchDetail />} /> {/* Định tuyến trang chi tiết */}

        </>
    )
);

root.render(<RouterProvider router={router}></RouterProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
