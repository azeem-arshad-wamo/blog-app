import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../providers/UserProvider.jsx";
import { LoginContext } from "../../LoginProvider.jsx";
import { CurrentUserContext } from "../../providers/CurrentUserProvider.jsx";
import "./SignUp.css";

export default function LogOut() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigator = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username should be at least 4 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  function handleSignUp(values) {
    const { username, email, password } = values;
    const newId = userInfo.length + 1;
    const newUser = { id: newId, username, email, password };
    setUserInfo([...userInfo, newUser]);
    console.log("User Info");
    console.log(userInfo);
    setCurrentUser(newUser);
    console.log("Current User");
    console.log(currentUser);
    setIsLogged(true);
    navigator("/");
  }

  return (
    <>
      <div id="container">
        <form onSubmit={formik.handleSubmit}>
          <div id="main">
            <div id="loginHeading">
              <h2>Sign Up</h2>
            </div>
            <div id="usernameDiv">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <p style={{ color: "#ff3333" }}>{formik.errors.username}</p>
              ) : (
                ""
              )}
            </div>
            <div id="emailDiv">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p style={{ color: "#ff3333" }}>{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div id="passwordDiv">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p style={{ color: "#ff3333" }}>{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <div id="formSubmitDiv">
              <button id="submitButton" type="submit">
                Submit
              </button>
            </div>
            <div id="signupLinkDiv">
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <span style={{ color: "#3366CC" }}>Log In</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
