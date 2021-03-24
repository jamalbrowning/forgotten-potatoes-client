import React from "react";
import { Link } from "react-router-dom";
import "./auth.css"

export const Login = (props) => {
  const email = React.createRef();
  const password = React.createRef();
  const invalidDialog = React.createRef();
 
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
          localStorage.setItem("user_id", res.user_id);
          
          console.log(localStorage.getItem("user_id"));
          props.history.push("/profile");
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
      <section>
      <h2 className="welcome">Welcome to Forgotten Potatoes</h2>
        <form className="form--login text-center login-form" onSubmit={handleLogin}>
          
        <h3>Login</h3>
          <fieldset>
            {/* <label htmlFor="inputEmail"> Email address </label> */}
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
            {/* <label htmlFor="inputPassword"> Password </label> */}
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
            <button className="sign-in btn btn-primary" type="submit">
              Sign In
            </button>
          </fieldset>
          <button className="btn btn-dark link--register text-center" to="/register">
        Not a member yet?
      </button>
        </form>
      </section>
      
    </main>
    
   
  );
};
