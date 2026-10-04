import { motion } from "framer-motion";
import { useState } from "react";
import { birthdayConfig } from "./birthday";

type PasswordScreenProps = {
  onSuccess?: () => void;
};

export default function PasswordScreen({
  onSuccess,
}: PasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password === "0710") {
      setError("");

      if (onSuccess) {
        onSuccess();
      }

      return;
    }

    setError("That isn't quite right.");
    setPassword("");
  };

  return (
    <main className="password-page">
      <div className="password-glow" />

      <motion.div
        className="password-content"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="password-eyebrow">
          A LITTLE WORLD MADE FOR YOU
        </span>

        <h1>
          This is
          <br />
          <em>just for you.</em>
        </h1>

        <div className="password-divider" />

        <p>
          Some things are meant to be
          <br />
          opened with a little secret.
        </p>

        <div className="password-box">
          <label htmlFor="birthday-password">
            ENTER THE SECRET
          </label>

          <div className="password-input-row">
            <input
              id="birthday-password"
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              placeholder="••••"
              autoComplete="off"
            />

            <button
              type="button"
              onClick={handleSubmit}
              aria-label="Enter"
            >
              →
            </button>
          </div>

          {error && (
            <motion.span
              className="password-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.span>
          )}
        </div>

        <span className="password-footer">
          MADE ESPECIALLY FOR {birthdayConfig.name} ♥
        </span>
      </motion.div>
    </main>
  );
}
