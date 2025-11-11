import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../providers/CurrentUserProvider";
import { PostContext } from "../../providers/PostProvider";
import { UserActivityContext } from "../../providers/UserActivityProvider.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CreatePost.css";

export default function CreatePost() {
  const navigator = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { posts, setPosts } = useContext(PostContext);
  const { UserActivity, setUserActivity } = useContext(UserActivityContext);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Title should be at least 10 characters long")
      .required("Title is required."),
    body: Yup.string()
      .min(20, "Description should be at least 20 characters")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handlePostSubmit(values);
    },
  });

  function handlePostSubmit(values) {
    const { title, body } = values;
    const id = posts.length + 1;
    const userId = currentUser.id;

    let newPosts = posts;
    newPosts = [...newPosts, { userId, id, title, body }];
    console.log(newPosts);
    setPosts(newPosts);
    UserActivity.posts.push({ userId, id, title, body });
    console.log("User Activity:");
    console.log(UserActivity);
    navigator("/");
  }

  useEffect(() => {
    if (!currentUser) {
      navigator("/login");
    }
  }, []);

  return (
    <>
      <div id="container">
        <form onSubmit={formik.handleSubmit}>
          <div id="main">
            <div>
              <h1>Create a new Post</h1>
            </div>
            <div>
              <label>
                Post As: <b>{currentUser ? currentUser.username : null}</b>
              </label>
            </div>
            <div>
              <label>
                Email: <b>{currentUser ? currentUser.email : null}</b>
              </label>
            </div>
            <div>
              <label>
                UserID: <b>{currentUser ? currentUser.id : null}</b>
              </label>
            </div>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p style={{ color: "#ff3333" }}>{formik.errors.title}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="body"
                rows="10"
                cols="50"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.body && formik.errors.body ? (
                <p style={{ color: "#ff3333" }}>{formik.errors.body}</p>
              ) : (
                ""
              )}
            </div>
            <div id="postSubmitDiv">
              <button id="postSubmitButton" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
