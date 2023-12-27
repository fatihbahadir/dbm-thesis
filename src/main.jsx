import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThesisProvider } from "./context/ThesisProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThesisProvider>
        <App/>
      </ThesisProvider>
    </AuthProvider>
  </BrowserRouter>
);
