import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster";
import AuthContextWrapper from "./context/context-wrapper.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthContextWrapper>
        <App />
        <Toaster />
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
