import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/home";
import { About } from "./pages/aboutUs";
import { Brands } from "./pages/brands";
import { Users } from "./pages/usersacces.js";
import { Admin } from "./pages/usersadmin.js";
import { Crystals } from "./pages/crystals";
import { Consultations } from "./pages/consultations";

import injectContext from "./store/appContext";

import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Reset } from "./pages/reset";
import { Dashboard } from "./pages/dashboard";
import { New_Password } from "./pages/new_password";

import { Profile } from "./pages/dashboard/profile";
import { Orders } from "./pages/dashboard/orders";
import { Appointments } from "./pages/dashboard/appointments";
import { Schedule } from "./pages/dashboard/schedule";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
// import POST
import PostList from "./pages/postList";
import Post from "./pages/post";
import EditPost from "./pages/editPost";


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

import { Sales } from "./pages/sales.js"
import DoctorsPage from "./pages/DoctorsPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CommentsPage from "./pages/CommentsPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Router basename={basename}>
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
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />

                        // post
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/create/post" element={<Post />} />
                        <Route path="/edit_post/:id" element={<EditPost />} />

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
            </Router>
        </div>
    );
};

export default injectContext(Layout);
