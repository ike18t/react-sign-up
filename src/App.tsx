import React, { useState } from "react";
import styles from "./App.module.scss";
import { ReactComponent as Key } from "tabler-icons/icons/key.svg";

export function App() {
  const [validForm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  return (
    <div className={styles.container}>
      <form className={styles.content}>
        <input type="email" placeholder="Email Address" autoComplete="username" />
        <span className={styles.passwordContainer}>
          <input className="password" type="password" placeholder="Password" autoComplete="new-password" />
          <Key className={passwordsMatch ? styles.matchingKey : styles.key} />
        </span>
        <span className={styles.passwordContainer}>
          <input
            className="confirm"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <Key className={passwordsMatch ? styles.matchingKey : styles.key} />
        </span>
        <input disabled={!validForm} type="submit" value="Sign Up!" />
      </form>
      <button onClick={() => setPasswordsMatch(!passwordsMatch)}>hi</button>
    </div>
  );
}

export default App;
