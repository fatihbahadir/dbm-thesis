import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThesisProvider } from "./context/ThesisProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ThesisProvider>
          <App/>
        </ThesisProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
