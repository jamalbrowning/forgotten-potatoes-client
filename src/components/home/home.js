import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

export const Home = () => {
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
          history.push("/profile");
          window.location.reload();
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <h1>Forgotten Potatoes</h1>
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Email or password was not valid.</div>
        <button
          className="btn btn-danger button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section className="login-section">
        <Form className="form--login" onSubmit={handleLogin}>
          <h2 className="text-center">Please log in </h2>
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
            <button className="btn btn-1 btn-sep icon-send" type="submit">
              Sign In
            </button>
          </fieldset>
        </Form>
      </section>
      <section>
        <Link to="/register" className="link--register">
          Don't Have an account? Click to register.
        </Link>
      </section>
    </main>
  );
};
