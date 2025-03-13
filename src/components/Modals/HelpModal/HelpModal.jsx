import React, { useState } from "react";
import styles from "./HelpModal.module.css";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";
import { useContext } from "react";

function HelpModal({ isOpen, onClose }) {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !comment) {
      setSubmitStatus({ success: false, message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/help/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, comment }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent successfully!",
        });
        setEmail("");
        setComment("");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Failed to send message",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        style={{ background: theme.background }}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          style={{ color: theme.text }}
        >
          ✕
        </button>
        <h2 className={styles.modalTitle} style={{ color: theme.text }}>
          Need help
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              style={{ background: theme.inputBackground, color: theme.text }}
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentInput}
              style={{ background: theme.inputBackground, color: theme.text }}
            />
          </div>

          {submitStatus && (
            <div
              className={
                submitStatus.success
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            className={styles.sendButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelpModal;
