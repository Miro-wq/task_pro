import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/api';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Invalid email').required('Email required'),
      password: Yup.string().min(6, 'Password too short').required('Password required'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values.name, values.email, values.password);

        const response = await loginUser(values.email, values.password);
        const { accessToken, refreshToken, user } = response.data;

        // pt stocare tokenuri și datele userului
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/home');
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
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
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div className={styles.errorText}>{formik.errors.name}</div>}

          <input
            className={styles.inputField}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className={styles.errorText}>{formik.errors.email}</div>}

          <input
            className={styles.inputField}
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div className={styles.errorText}>{formik.errors.password}</div>}

          <button type="submit" className={styles.registerButton}>Register</button>
        </form>

        {errorMessage && <div className={styles.errorText}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
