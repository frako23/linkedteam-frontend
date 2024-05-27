/* -------------------------- ORIGINAL CON REACT 16 ------------------------- */
// import react into the bundle
// import React from "react";
// import ReactDOM from "react-dom";
// include your index.scss file into the bundle
// import "../styles/index.css";
// import your own components
// import Layout from "./layout";
// render your react application
// ReactDOM.render(<Layout />, document.querySelector("#app"));

/* ---------------------- // NUEVO CÓDIGO CON REACT +18 --------------------- */
//import react into the bundle
import React from "react";
import { createRoot } from "react-dom/client";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

const container = document.querySelector("#app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

//render your react application
root.render(<Layout />);
