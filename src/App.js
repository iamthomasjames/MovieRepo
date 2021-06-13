import React, { Suspense, useEffect } from "react";
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
import { hasAuthenticated, getUsername } from "./utils/settings";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const Login = React.lazy(() => import("./pages/login"));

  useEffect(() => {
    hasAuthenticated().then((res) => {
      if (res) {
        dispatch(SetAuth(true));
      } else {
        dispatch(SetAuth(false));
      }
    });
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(SetAuth(false));
    localStorage.removeItem("_token", "_user");
    localStorage.removeItem("_user");
    window.location = "/login";
  };

  return (
    <div>
      <Suspense
        fallback={
          <div className="ui segment" style={{ height: "100vh" }}>
            <div className="ui active dimmer">
              <div className="ui text loader">Loading</div>
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
              {localStorage.getItem("_token") && (
                <div className="logo-container">
                  <img src={user} width="30px" height="30px" alt="user" />
                  <span className="user-container">
                    &nbsp;&nbsp;{getUsername()}
                  </span>
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
                  !hasAuthenticated() ? (
                    <Login {...props} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  hasAuthenticated() ? (
                    <Dashboard {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/"
                render={(props) => <Redirect to="/login" />}
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
