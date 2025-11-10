import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./LoginProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <LoginProvider>
        <App />
      </LoginProvider>
    </StrictMode>
  </BrowserRouter>
);
