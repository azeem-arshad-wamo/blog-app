import { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import "./Post.css";

export default function Posts() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { posts, setPosts } = useContext(PostContext);
  const [Comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id > 100) {
      const current = posts.find((now) => now.id == id);
      setPost(current);
      setLoading(false);
    } else {
      async function getData() {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await response.json();
        setPost(data);

        const secondResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const secondData = await secondResponse.json();
        setComments(secondData);

        setLoading(false);
      }
      getData();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <h1>Loading....</h1>
      </>
    );
  } else {
    return (
      <>
        <div id="postPageContainer">
          <div id="postDiv">
            <div>
              <h1 id="postHeading">{post.title}</h1>
            </div>
            <div>
              <p id="postDesc">Description: {post.body}</p>
            </div>
            <div id="subHeading">
              <p>User ID: {post.userId}</p>
              <p>Post ID: {post.id}</p>
            </div>
          </div>
          <div id="commentsDiv">
            <h1>Comments</h1>
            {Comments && Comments.length > 0 ? (
              Comments.map((comment) => (
                <div className="commentContainer" key={comment.id}>
                  <p>
                    <b>
                      {comment.name} ({comment.email})
                    </b>
                  </p>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <h2>No Comments Here</h2>
            )}
          </div>
        </div>
      </>
    );
  }
}
