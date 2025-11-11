import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./LoginProvider.jsx";
import { UserProvider } from "./providers/UserProvider.jsx";
import { CurrentUserProvider } from "./providers/CurrentUserProvider.jsx";
import { CommentProvider } from "./providers/CommentsProvider.jsx";
import { PostProvider } from "./providers/PostProvider.jsx";
import { UserActivityProvider } from "./providers/UserActivityProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <LoginProvider>
        <UserActivityProvider>
          <PostProvider>
            <CommentProvider>
              <UserProvider>
                <CurrentUserProvider>
                  <App />
                </CurrentUserProvider>
              </UserProvider>
            </CommentProvider>
          </PostProvider>
        </UserActivityProvider>
      </LoginProvider>
    </StrictMode>
  </BrowserRouter>
);
