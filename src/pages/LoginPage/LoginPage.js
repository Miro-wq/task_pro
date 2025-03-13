import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import GoogleAuthButton from "../../components/Google/GoogleAuthButton";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string()
        .min(6, "Password too short")
        .required("Password required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values.email, values.password);
        const { accessToken, refreshToken, user } = response.data;
        login(accessToken, user);
        localStorage.setItem("refreshToken", refreshToken); // salvează refresh token si in localStorage
        navigate("/home");
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.tabContainer}>
          <Link to="/register" className={styles.tabButton}>
            Registration
          </Link>
          <button className={`${styles.tabButton} ${styles.activeTab}`}>
            Log In
          </button>
          <GoogleAuthButton />
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            className={styles.inputField}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div className={styles.errorText}>{formik.errors.email}</div>
          )}

          <input
            className={styles.inputField}
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <div className={styles.errorText}>{formik.errors.password}</div>
          )}

          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>

        {errorMessage && <div className={styles.errorText}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
