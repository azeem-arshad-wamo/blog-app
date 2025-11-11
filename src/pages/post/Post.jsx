import { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";
import { CurrentUserContext } from "../../providers/CurrentUserProvider";
import * as Yup from "yup";
import "./Post.css";

export default function Posts() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { posts, setPosts } = useContext(PostContext);
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [Comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object({
    comment: Yup.string()
      .min(4, "Comment too short")
      .required("Can't post an empty comment"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleCommentSubmit(values);
    },
  });

  function handleCommentSubmit(values) {
    console.log(`Comment: ${values.comment}`);

    let updated = [...Comments];

    let newId = updated[updated.length - 1];
    newId = newId.id + 1;

    const newEntry = {
      id: newId,
      postId: post.id,
      name: currentUser.username,
      email: currentUser.email,
      body: values.comment,
    };

    console.log("Before Addition!");
    console.log(updated);
    updated = [...updated, newEntry];
    console.log("After Addition!");
    console.log(updated);
    setComments(updated);
  }

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
            <div>
              {isLogged ? (
                <div>
                  <div>
                    <h1>Make a new comment</h1>
                  </div>
                  <div>
                    <p>
                      <b>Username: </b>
                      {currentUser.username}
                    </p>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div id="commentInputDiv">
                      <input
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="commentInput"
                        type="text"
                      />
                      <button id="commentSubmit" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {formik.touched.comment && formik.errors.comment ? (
                        <p style={{ color: "#ff3333" }}>
                          {formik.errors.comment}
                        </p>
                      ) : null}
                    </div>
                  </form>
                </div>
              ) : (
                <h1>Log in to make a post</h1>
              )}
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
