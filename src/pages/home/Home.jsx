import { useEffect, useMemo, useState } from "react";
import Welcome from "./components/Welcome";
import Blogs from "./components/Blogs";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setBlogs(data);
    }
    getData();
  }, [page]);

  const filtered = useMemo(() => {
    if (blogs) {
      let result = [...blogs];

      if (search.trim()) {
        if (!isNaN(search)) {
          result = result.filter((post) =>
            post.userId.toString().includes(search)
          );
        }
      }

      if (searchTitle.trim()) {
        result = result.filter((post) => post.title.includes(searchTitle));
      }

      if (sort) {
        if (sort === "new-first") {
          result.sort((a, b) => b.id - a.id);
        }
        if (sort === "old-first") {
          result.sort((a, b) => a.id - b.id);
        }
      }

      return result;
    }
  }, [search, sort, searchTitle]);

  return (
    <>
      <Welcome />
      <div id="sortDiv">
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by User ID"
            type="text"
          />
        </div>
        <div>
          <input
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search by Title"
            type="text"
          />
        </div>
        <div>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">--- Select Sort --- </option>
            <option value="new-first">Newest First</option>
            <option value="old-first">Oldest First</option>
          </select>
        </div>
      </div>
      <Blogs blogs={filtered ? filtered : blogs} />
    </>
  );
}
