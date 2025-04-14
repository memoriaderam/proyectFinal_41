import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { About} from "./pages/aboutUs";
import { Brands} from "./pages/brands";
import {Users} from "./pages/usersacces";
import {Admin} from "./pages/usersadmin";
import {Sales} from "./pages/sales";
import { Single } from "./pages/single";
import { Crystals } from "./pages/crystals";
import { Consultations } from "./pages/consultations";

import Testimonys2 from "./pages/testimony2.jsx";
import Testimonys3 from "./pages/testimony3.jsx";
import Testimonys4 from "./pages/testimony4.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
// import POST
import PostList from "./pages/postList"; 
import Post from "./pages/post";
import EditPost from "./pages/editPost";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<About />} path="/aboutUs" />
                        <Route element={<Brands />} path="/brands" />
                        <Route element={<Users />} path="/usersacces" />
                        <Route element={<Admin />} path="/usersadmin" />
                        <Route element={<Sales />} path="/sales" />
                        <Route element={<Crystals />} path="/crystals" />
                        <Route element={<Consultations/>} path="/consultations"/>
                        <Route element={<Testimonys2 />} path="/testimony2"  />
                        <Route element={<Testimonys3 />} path="/testimony3"  />
                        <Route element={<Testimonys3 />} path="/testimony4/:id"  />
                        <Route element={<Testimonys4/>} path="/testimony4"/>
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />

                        // post
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/create/post" element={<Post />} />
                        <Route path="/edit_post/:id" element={<EditPost />} />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
