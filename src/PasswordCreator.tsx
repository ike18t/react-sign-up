import React, { useEffect, useMemo, useState } from "react";
import styles from "./PasswordCreator.module.scss";
import { ReactComponent as Key } from "tabler-icons/icons/key.svg";

export const PasswordCreator = ({
  onChange,
}: {
  onChange: (password?: string) => void;
}) => {
  const [passwordsValid, setPasswordsValid] = useState(false);
  const [password, setPassword] = useState<undefined | string>();
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>();

  useEffect(
    () => setPasswordsValid(!!password && confirmPassword === password),
    [confirmPassword, password]
  );

  useEffect(() => onChange(passwordsValid ? password : undefined), [
    onChange,
    password,
    passwordsValid,
  ]);

  const strength = useMemo(
    () =>
      strengthChecks.reduce(
        (acc, check) => (password?.match(check) ? acc + 1 : acc),
        0
      ),
    [password]
  );

  return (
    <>
      <span className={styles.passwordContainer}>
        <input
          className="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        {password && (
          <Key className={passwordsValid ? styles.matchingKey : styles.key} />
        )}
      </span>
      <span className={styles.passwordContainer}>
        <input
          className="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        {password && (
          <Key className={passwordsValid ? styles.matchingKey : styles.key} />
        )}
      </span>
      {password && (
        <div className={styles.strength}>
          {Array(5)
            .fill(undefined)
            .map((_, index) => (
              <span
                key={index}
                className={index >= strength ? styles.weak : styles.strong}
              ></span>
            ))}
        </div>
      )}
    </>
  );
};

const strengthChecks = [/[A-Z]/, /[0-9]/, /[a-z]/, /.{6}/, /[!@#$%^&*]/];
