import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { PasswordCreator } from "./PasswordCreator";

export function App() {
  const [validForm, setValidForm] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  useEffect(() => setValidForm(!!password && !!email), [email, password]);

  return (
    <div className={styles.container}>
      <form className={styles.content}>
        <input
          type="email"
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="Email Address"
          autoComplete="username"
        />
        <PasswordCreator onChange={(password) => setPassword(password)} />
        <input disabled={!validForm} type="submit" value="Sign Up!" />
      </form>
    </div>
  );
}

export default App;
