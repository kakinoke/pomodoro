import React from "react";
import ReactDOM from "react-dom";

// import Component
import Layout from "./components/layout";

// import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import StyleSheet
import "../scss/style.scss";

// render App
const app = document.querySelector("#app");
ReactDOM.render(<Layout/>, app);
