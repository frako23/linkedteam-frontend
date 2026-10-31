import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/utils/scrollToTop";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import injectContext from "./store/appContext";
import { Courses } from "./pages/courses";
import { Perfil } from "./pages/perfil";
import { Video } from "./pages/video";
import { Login } from "./pages/login";
import { Todo } from "./pages/todo";
import { SignUp } from "./pages/signUp";
import { Pricing } from "./pages/pricing";
import { OwnAgencyCourses } from "./pages/ownAgencyCourses";
import { TutorialVideos } from "./pages/tutorialVideos";
import { VideoTutorial } from "./pages/videoTutorial";
import { AppShell } from "./components/layout/app-shell";
import { ThemeProvider } from "./components/theme-provider";
import { SalesFunnel } from "./pages/SalesFunnel";
import { Clients } from "./pages/Clients";
import { Toaster } from "./components/ui/sonner";
import { AssociateSalesFunnel } from "./pages/AssociateSalesFunnel";
import { Bugs } from "./pages/Bugs";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Toaster position="bottom-right" />
        <ScrollToTop>
          <AppShell>
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
              <Route element={<Todo />} path="/todo" />
              <Route element={<Perfil />} path="/perfil" />
              <Route element={<Video />} path="/video/:theid" />
              <Route element={<VideoTutorial />} path="/videoTutorial/:theid" />
              <Route element={<Bugs />} path="/bugs" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </AppShell>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default injectContext(Layout);
