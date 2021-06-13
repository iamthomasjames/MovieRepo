import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import user from "./Assets/Images/user.svg";
import logo from "./Assets/Images/logo.svg";
import { SetAuth } from "./store/actions/authAction";
import { useDispatch } from "react-redux";
import { hasAuthenticated, getUsername,removeUser } from "./utils/settings";
import Footer from "./components/Footer";

function App() {
  const [islogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState();

  const dispatch = useDispatch();
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const Login = React.lazy(() => import("./pages/login"));

  const handleLogout = () => {
    dispatch(SetAuth(false));
    removeUser();
    window.location = "/login";
  };

  const isAuthenticated = (isAuth) => {
    if (isAuth) {
      setIsLogged(isAuth);
    }
  };
  useEffect(() => {
    hasAuthenticated().then((res) => {
      if (res === true) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    getUsername().then((res) => {
      setUsername(res);
    });
  }, [islogged, username]);

  return (
    <div>
      <Suspense
        fallback={
          <div className="ui segment" style={{ height: "100vh" }}>
            <div className="ui active dimmer">
              <div className="ui text loader">Loading..</div>
            </div>
            <p></p>
          </div>
        }
      >
        <Router>
          <div>
            <div className="header-container">
              <div className="logo-container">
                <img src={logo} width="30px" height="30px" alt="logo" />
                <h3 className="heading-white">MovieEnginee</h3>
              </div>
              {islogged && (
                <div className="logo-container">
                  <img src={user} width="30px" height="30px" alt="user" />
                  <span className="user-container">&nbsp;&nbsp;{username}</span>
                  <span
                    className="logout-container"
                    onClick={() => handleLogout()}
                  >
                    &nbsp;&nbsp;(Logout)
                  </span>
                </div>
              )}
            </div>
            <Switch>
              <Route
                exact
                path="/login"
                render={(props) =>
                  !islogged ? (
                    <Login {...props} isAuthenticated={isAuthenticated} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  islogged ? (
                    <Dashboard {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/login" />}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
