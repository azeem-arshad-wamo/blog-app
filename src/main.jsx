import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./LoginProvider.jsx";
import { UserProvider } from "./providers/UserProvider.jsx";
import { CurrentUserProvider } from "./providers/CurrentUserProvider.jsx";
import { PostProvider } from "./providers/PostProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <LoginProvider>
        <PostProvider>
          <UserProvider>
            <CurrentUserProvider>
              <App />
            </CurrentUserProvider>
          </UserProvider>
        </PostProvider>
      </LoginProvider>
    </StrictMode>
  </BrowserRouter>
);
