import React, { Suspense } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import "./App.css";

const Home = React.lazy(() => import("./pages/home/Home.jsx"));
const Post = React.lazy(() => import("./pages/post/Post.jsx"));

export default function App() {
  return (
    <>
      <nav>
        <div>
          <Link to="/">Blog App</Link>
        </div>
        <div>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>

      <Suspense fallback={<h2>Loading Page....</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </Suspense>
    </>
  );
}
