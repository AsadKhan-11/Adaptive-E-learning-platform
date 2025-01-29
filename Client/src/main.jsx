import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoaderProvider } from "./Context/LoaderContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContext, UserProvider } from "./Context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
