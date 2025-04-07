import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import injectContext from "./store/appContext";

import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Dashboard from "./pages/Dashboard.jsx";
import PatientsPage from "./pages/PatientsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import PrescriptionsPage from "./pages/PrescriptionsPage.jsx";
import DoctorsPage from "./pages/DoctorsPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CommentsPage from "./pages/CommentsPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";



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
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/appointments" element={<AppointmentsPage />} />
                        <Route path="/prescriptions" element={<PrescriptionsPage />} />
                        <Route path="/doctors" element={<DoctorsPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/comments" element={<CommentsPage />} />
                        <Route path="/stats" element={<StatsPage />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
