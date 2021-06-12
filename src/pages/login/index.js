import React, { useState } from "react";
import "../../App.css";
import loginBG from "../../Assets/Images/login-bg.jpg";
import { Button, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {SetAuth} from '../../store/actions/authAction'
const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const dispatch= useDispatch();

  const validateLogin = () => {
    if (username && password) {
      if (username === "admin" && password === "admin") {
        dispatch(SetAuth(true));
        localStorage.setItem('_token','22850cad');
        localStorage.setItem('_user','Admin');
        props.isAutheticated(true);
        history.push("/dashboard");
      }
      else{
          setErrorMessage("Incorrect login details!!")
      }
    } else {
      setErrorMessage("Please enter username and password!!");
    }
  };


  return (
    <div className="login-container">
      <div className="login-outer">
        <div className="login-left">
          <img src={loginBG} className="img-cover" alt="login-cover" />
        </div>
        <div className="login-right">
          <div className="login-heading">
            <h2 className="heading-text">
              We are{" "}
              <span className="text-highlight">Movie Search Engine!!</span>
            </h2>
          </div>
          <div className="login-inner-container">
            <div className="input-field">
              <Form error className="form-login">
                <Form.Input
                  label="Username"
                  placeholder="Enter username.."
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage(null)
                  }}
                />
                <Form.Input
                  label="Password"
                  type="password"
                  placeholder="Enter password.."
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null)
                  }}
                />
                {errorMessage && (
                  <Message
                    error
                    header="Error"
                    content="Please enter correct details."
                  />
                )}

                <Button  onClick={validateLogin}>Login</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
