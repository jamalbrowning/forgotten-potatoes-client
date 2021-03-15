import React from "react";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
  const email = React.createRef();
  const password = React.createRef();
  const invalidDialog = React.createRef();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("fp_token", res.token);
          localStorage.setItem("fp_user_id", res.user_id);
          history.push("/fp-signup");
          window.location.reload();
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Email or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section className="login-section">
        <form className="form--login" onSubmit={handleLogin}>
          <h2>Please log in to access the tutoring signup</h2>
          <fieldset>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <button className="login-button" type="submit">
              Login
            </button>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register" className="link--register">
          Click here to register a new account.
        </Link>
      </section>
    </main>
  );
};
