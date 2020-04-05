import React, { FormEvent, useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import styles from "./App.module.scss";
import { PasswordCreator } from "./PasswordCreator";

export function App() {
  const [validForm, setValidForm] = useState(false);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setValidForm(!!password && !!email), [email, password]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handlePassword = useCallback((password?: string) => {
    setPassword(password);
  }, [setPassword]);

  return (
    <div className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="Email Address"
          autoComplete="username"
        />
        <PasswordCreator onChange={handlePassword} />
        <input disabled={!validForm} type="submit" value="Sign Up!" />
      </form>

      <Modal isOpen={submitted} className={styles.modal}>
        You are now registered!
      </Modal>
    </div>
  );
}

export default App;
