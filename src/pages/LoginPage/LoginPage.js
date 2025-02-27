import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email required'),
      password: Yup.string().min(6, 'Password too short').required('Password required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:PORT/login', values);
        // pt răspuns (ex. stochează token/redirecționează)
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.tabContainer}>
          <Link to="/register" className={styles.tabButton}>Registration</Link>
          <button className={`${styles.tabButton} ${styles.activeTab}`}>Log In</button>
        </div>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            className={styles.inputField}
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className={styles.errorText}>{formik.errors.email}</div>}
          
          <input
            className={styles.inputField}
            name="password"
            type="password"
            placeholder="Confirm a password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div className={styles.errorText}>{formik.errors.password}</div>}

          <button type="submit" className={styles.loginButton}>Log In Now</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
