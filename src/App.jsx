import React, { Suspense, useContext } from "react";
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import { CurrentUserContext } from "./providers/CurrentUserProvider.jsx";
import "./App.css";

const Home = React.lazy(() => import("./pages/home/Home.jsx"));
const Post = React.lazy(() => import("./pages/post/Post.jsx"));
const Login = React.lazy(() => import("./pages/login/Login.jsx"));
const CreatePost = React.lazy(() =>
  import("./pages/createPost/CreatePost.jsx")
);
const SignUp = React.lazy(() => import("./pages/signup/SignUp.jsx"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard.jsx"));

export default function App() {
  const navigator = useNavigate();
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  function handleLogOut() {
    setIsLogged(false);
    setCurrentUser(null);
  }

  return (
    <>
      <nav>
        <div>
          <Link to="/">Blog App</Link>
        </div>
        <div id="rightNav">
          {isLogged ? (
            <button id="logoutButton" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <button id="logoutButton" onClick={() => navigator("/login")}>
              Log In
            </button>
          )}
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/create-post">Create a Post</NavLink>
        </div>
      </nav>

      <Suspense fallback={<h2>Loading Page....</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}
