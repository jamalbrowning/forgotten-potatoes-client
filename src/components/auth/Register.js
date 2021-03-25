import React from "react";
import { Link } from "react-router-dom";
import "./register.css"


export const Register = (props) => {
  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const passwordDialog = React.createRef();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      return fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("fp_token", res.token);
            props.history.push("/login");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control-register"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control-register"            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control-register"            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control-register"            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control-register"            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-primary icon-send" type="submit">
            Register
          </button>
        </fieldset>
        <section className="link-register">
        Already registered? <Link to="/login">Login</Link>
      </section>
      </form>
      
    </main>
  );
};
