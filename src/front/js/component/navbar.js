import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const [user, setUser] = useState("");
  const { store, actions } = useContext(Context);
  let history = useHistory();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  return (
    <nav className="navbar navbar-light bg-light">
      {store.loggedIn != null ? (
        <div className="container d-flex justify-content-end">
          <Link to="/">
            <span className="navbar-brand mb-0">Home</span>
          </Link>
          {store.loggedIn == true ? (
            <Link to="/private">
              <button className="btn btn-warning">Private</button>
            </Link>
          ) : null}
          {store.loggedIn == true ? (
            <div>
              <Link to="/login">
                <button
                  className="btn btn-primary mx-2"
                  title="Log out"
                  onClick={() => {
                    actions.logout();
                    history.push("/");
                  }}
                >
                  Log out
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="m-2">
                <Link to="/signup">
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </div>
              <div className="m-2">
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};
