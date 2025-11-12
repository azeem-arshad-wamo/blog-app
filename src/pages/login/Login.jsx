import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../../providers/UserProvider";
import { LoginContext } from "../../LoginProvider";
import { CurrentUserContext } from "../../providers/CurrentUserProvider";
import * as Yup from "yup";
import "./Login.css";

export default function Login() {
  const navigator = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogIn(values);
    },
  });

  function handleLogIn(values) {
    const { email, password } = values;

    const existing = userInfo.find((user) => user.email === email);
    if (!existing) {
      console.log("Errror. No find email.");
      setError(
        <p style={{ color: "#ff3333" }}>Can't find a user with that email</p>
      );
      return;
    }
    if (existing.password !== password) {
      console.log("Wrong Password!");
      setError(<p style={{ color: "#ff3333" }}>Incorrect Password</p>);
      return;
    }
    setIsLogged(true);
    setCurrentUser({
      id: existing.id,
      username: existing.username,
      email: existing.email,
      password: existing.password,
    });
    navigator("/");
  }

  return (
    <>
      <div id="container">
        <form onSubmit={formik.handleSubmit}>
          <div id="main">
            <div id="loginHeading">
              <h2>Log In</h2>
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
              {error ? error : null}
              <button id="submitButton" type="submit">
                Submit
              </button>
            </div>
            <div id="signupLinkDiv">
              <p>
                Don't have an account?{" "}
                <Link to="/signup">
                  <span style={{ color: "#3366CC" }}>Sign Up</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
