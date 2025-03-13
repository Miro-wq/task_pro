import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="google-auth-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        // width: "100%",
        padding: "5px",
        marginTop: "15px",
        backgroundColor: "black",
        color: "#fff",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
    >
      <FcGoogle size={24} />
      <span>Log in</span>
    </button>
  );
};

export default GoogleAuthButton;
