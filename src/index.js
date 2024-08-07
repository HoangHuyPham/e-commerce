import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
} from "react-router-dom";
import "./assets/styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./stores/providers/AppProvider";
import App from "./views/App";
import DashBoard from "./views/DashBoard";
import FavoriteWatches from "./views/FavoriteWatches";
import Home from "./views/Home";
import Info from "./views/Info";
import NotFound from "./views/NotFound";
import ProductPanel from "./views/ProductPanel";
import SearchPage from "./views/SearchPage";
import SignIn from "./views/SignIn";
import SignInOut from "./views/SignInUp";
import SignUp from "./views/SignUp";
import WatchDetail from "./views/WatchDetail";
import WatchList from "./components/WatchList";
import Cart from "./views/Cart";
import CheckOutList from "./views/CheckOutList";
import OrderSuccess from "./views/OrderSuccsess";
import CheckOutItem from "./views/CheckOutItem";
import BuyNow from "./components/BuyNow";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App/>}>
                <Route index element={<Navigate to="home"/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="watch-list" element={<WatchList/>}/>
                <Route path="watch-detail/:id" element={<WatchDetail/>}/>
                <Route path="favorites" element={<FavoriteWatches/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="buynow" element={<BuyNow/>}/>
                <Route path="cart/thanhtoan" element={<CheckOutList/>}/>
                <Route path="order-success" element={<OrderSuccess/>}/>
            </Route>

            <Route path="/dashboard" element={<DashBoard/>}>
                <Route index element={<Navigate to="products"/>}/>
                <Route path="products" element={<ProductPanel/>}/>
            </Route>

            <Route path="/sign" element={<SignInOut/>}>
                <Route index element={<Navigate to="in"/>}/>
                <Route path="in" element={<SignIn/>}/>
                <Route path="up" element={<SignUp/>}/>
            </Route>

            <Route path="/info" element={<Info/>}>
                <Route index element={<Navigate to="me"/>}/>
                <Route path="me" element={<Info/>}/>
                <Route path="up" element={<SignUp/>}/>
            </Route>


            <Route path="/" element={<App/>}>
                <Route path="watch-list" element={<WatchList/>}/>
                <Route path="/favorites" element={<FavoriteWatches/>}/>
                <Route path="watch-detail/:id" element={<WatchDetail/>}/>
            </Route>


            <Route path="*" element={<NotFound/>}/>
        </>
    )
);

root.render(
    <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
