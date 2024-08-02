import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
    },
    title: {
      fontSize: '96px',
      fontWeight: 'bold',
    },
    message: {
      fontSize: '24px',
      margin: '20px 0',
    },
    link: {
      fontSize: '18px',
      color: '#007bff',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={styles.link}
        onMouseOver={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration}
        onMouseOut={(e) => e.currentTarget.style.textDecoration = styles.link.textDecoration}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
