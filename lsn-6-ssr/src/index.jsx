import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App.jsx";

const props = window.__DATA__.props;

ReactDOM.hydrate(<App {...props} />, document.getElementById("index"));
