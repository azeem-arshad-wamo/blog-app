import { useState, useEffect, useContext, Children } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";
import { UserActivityContext } from "../../providers/UserActivityProvider";
import { CurrentUserContext } from "../../providers/CurrentUserProvider";
import * as Yup from "yup";
import "./Post.css";

export default function Posts({}) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { posts, setPosts } = useContext(PostContext);
  const { UserActivity, setUserActivity } = useContext(UserActivityContext);
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [Comments, setComments] = useState([]);
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
    if (!posts) return;

    let commentText = values.comment.trim();
    if (!commentText) return;

    const lastId =
      Comments && Comments.length > 0
        ? Number(Comments[Comments.length - 1].id)
        : 0;
    const newId = lastId + 1;

    const newEntry = {
      id: newId,
      postId: post.id,
      name: currentUser.username ? currentUser.username : "Anonymous",
      email: currentUser.email ? currentUser.email : "Anonymous",
      body: commentText,
    };

    const updatedComments = [...Comments, newEntry];
    setComments(updatedComments);

    setUserActivity((prev) => ({
      ...prev,
      comments: [...prev.comments, newEntry],
    }));

    formik.resetForm();
  }

  useEffect(() => {
    if (id > 100) {
      const current = posts.find((now) => now.id == id);
      setPost(current);

      const localComments =
        UserActivity.comments.filter((c) => c.postId == id) || [];

      const storedComments =
        current && current.comments ? current.comments : [];

      const merged = [...storedComments, ...localComments].filter(
        (comment, index, self) =>
          index === self.findIndex((c) => c.id === comment.id)
      );

      setComments(merged);
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

        const localComments =
          UserActivity.comments.filter((entry) => entry.postId == id) || [];

        setComments([...secondData, ...localComments]);

        setLoading(false);
      }
      getData();
    }
  }, [id, posts, UserActivity]);

  if (loading) {
    return (
      <>
        <h1>Loading....</h1>
      </>
    );
  } else if (!post) {
    return (
      <>
        <h1>Post not found</h1>
        <p>It may not exist in the current session anymore</p>
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
                <p id="postDesc">{post.body}</p>
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
