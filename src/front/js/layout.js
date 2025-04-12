import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/home";
import { About } from "./pages/aboutUs";
import { Brands } from "./pages/brands";
import { Users } from "./pages/usersacces.js";
import { Admin } from "./pages/usersadmin.js";
import { Sales } from "./pages/sales";
import { Single } from "./pages/single";
import { Crystals } from "./pages/crystals";
import { Consultations } from "./pages/consultations";

import injectContext from "./store/appContext";

import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Dashboard from "./pages/Dashboard.jsx";
//patients imports
import { PatientsPage } from './pages/Patients/PatientsPage.jsx';
import { CreatePatient } from "./pages/Patients/CreatePatient.jsx";
import { EditPatient } from "./pages/Patients/EditPatient.jsx";
import { ViewPatient } from "./pages/Patients/ViewPatient.jsx";
//orders imports
import { OrdersPage } from "./pages/Orders/OrdersPage.jsx";
import { CreateOrder } from "./pages/Orders/CreateOrder.jsx";
import { EditOrder } from "./pages/Orders/EditOrder.jsx";
import { ViewOrder } from "./pages/Orders/ViewOrder.jsx";
//prescription imports
import { PrescriptionsPage } from "./pages/Prescriptions/PrescriptionsPage.jsx";
import { CreatePrescription } from "./pages/Prescriptions/CreatePrescription.jsx";
import { EditPrescription } from "./pages/Prescriptions/EditPrescription.jsx";
import { ViewPrescription } from "./pages/Prescriptions/ViewPrescription.jsx";


import AppointmentsPage from "./pages/AppointmentsPage.jsx";
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

                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/patients/new" element={<CreatePatient />} />
                        <Route path="/patients/:id/update" element={<EditPatient />} />
                        <Route path="/patients/:id" element={<ViewPatient />} />

                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/orders/new" element={<CreateOrder />} />
                        <Route path="/orders/:id/edit" element={<EditOrder />} />
                        <Route path="/orders/:id" element={<ViewOrder />} />


                        <Route path="/prescriptions" element={<PrescriptionsPage />} />
                        <Route path="/prescriptions/new" element={<CreatePrescription />} />
                        <Route path="/prescriptions/:id/edit" element={<EditPrescription />} />
                        <Route path="/prescriptions/:id" element={<ViewPrescription />} />


                        <Route path="/doctors" element={<DoctorsPage />} />

                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/comments" element={<CommentsPage />} />
                        <Route path="/stats" element={<StatsPage />} />

                        <Route element={<Home />} path="/" />
                        <Route element={<About />} path="/aboutUs" />
                        <Route element={<Brands />} path="/brands" />
                        <Route element={<Users />} path="/usersacces" />
                        <Route element={<Admin />} path="/usersadmin" />
                        <Route element={<Sales />} path="/sales" />
                        <Route element={<Crystals />} path="/crystals" />
                        <Route element={<Consultations />} path="/consultations" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
