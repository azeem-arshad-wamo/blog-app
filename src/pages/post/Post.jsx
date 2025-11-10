import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";

export default function Posts() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [Comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            {Comments.map((comment) => (
              <div className="commentContainer" key={comment.id}>
                <p>
                  <b>
                    {comment.name} ({comment.email})
                  </b>
                </p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
