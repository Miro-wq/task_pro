import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Invalid email').required('Email required'),
      password: Yup.string().min(6, 'Password too short').required('Password required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:PORT/register', values);
        // pt procesare raspuns aici (ex.: token, redirecționare etc.)
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <div className={styles.tabContainer}>
          <button className={`${styles.tabButton} ${styles.activeTab}`}>Registration</button>
          <Link to="/login" className={styles.tabButton}>Log In</Link>
        </div>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            className={styles.inputField}
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div className={styles.errorText}>{formik.errors.name}</div>}

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
            placeholder="Create a password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div className={styles.errorText}>{formik.errors.password}</div>}

          <button type="submit" className={styles.registerButton}>Register Now</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
