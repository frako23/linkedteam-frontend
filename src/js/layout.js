import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/utils/scrollToTop";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { SingleManager } from "./pages/singleManager";
import injectContext from "./store/appContext";
import { Courses } from "./pages/courses";
import { Footer } from "./components/landing/footer";
import { Perfil } from "./pages/perfil";
import { Video } from "./pages/video";
import { Login } from "./pages/login";
import { Todo } from "./pages/todo";
import { SignUp } from "./pages/signUp";
import { Pricing } from "./pages/pricing";
import { AgencyToSelect } from "./pages/agencyToSelect";
import { OwnAgencyCourses } from "./pages/ownAgencyCourses";
import { TutorialVideos } from "./pages/tutorialVideos";
import { VideoTutorial } from "./pages/videoTutorial";
import { TopBar } from "../js/components/navbar/TopBar";
import { Navbar } from "./components/navbar/navbar";
import { SalesFunnel } from "./pages/SalesFunnel";
import { Clients } from "./pages/Clients";
import { Toaster } from "react-hot-toast";
import { AssociateSalesFunnel } from "./pages/AssociateSalesFunnel";
import { Bugs } from "./pages/Bugs";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Toaster />
        <ScrollToTop>
          <TopBar />
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<SalesFunnel />} path="/salesFunnel" />
            <Route element={<Clients />} path="/clients" />
            <Route
              element={<AssociateSalesFunnel />}
              path="/associatesalesfunnel"
            />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Courses />} path="/courses" />
            <Route element={<TutorialVideos />} path="/tutorialVideos" />
            <Route element={<OwnAgencyCourses />} path="/ownAgencyCourses" />
            <Route element={<Pricing />} path="/pricing" />
            <Route element={<AgencyToSelect />} path="/agencyToSelect" />
            <Route element={<Todo />} path="/todo" />
            <Route element={<Perfil />} path="/perfil" />
            <Route element={<Video />} path="/video/:theid" />
            <Route element={<VideoTutorial />} path="/videoTutorial/:theid" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<SingleManager />} path="/singleManager/:theid" />
            <Route element={<Bugs />} path="/bugs" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
