import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Reset } from "./pages/reset";
import { Dashboard } from "./pages/dashboard";
import { New_Password } from "./pages/new_password";
import injectContext from "./store/appContext";

import { Profile } from "./pages/dashboard/profile";
import { Orders } from "./pages/dashboard/orders";
import { Appointments } from "./pages/dashboard/appointments";
import { Schedule } from "./pages/dashboard/schedule";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Reset />} path="/reset" />
                        <Route element={<New_Password />} path="/new_password" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Profile />} /> {/* Muestra Perfil al entrar a /dashboard */}
                            <Route path="profile" element={<Profile />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="appointments" element={<Appointments />} />
                            <Route path="schedule" element={<Schedule />} />

                        </Route>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
