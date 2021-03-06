import React, { useEffect, useState } from "react";
import "./auth.css";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase/Firebase";
import firebase from "firebase";
import { useAuthProvider } from "../../Context/AuthProvider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";



function Auth() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthProvider();
  const [rightPanel, setRightPanel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);

  

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClick = () => {
    setOpen(true);
  };

  const fillForm = ()=>{
    setEmail("testuser@gmail.com")
    setPassword("test@45")
  }

  const signInGoogle = async () => {
    try {
      let response = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      setUser(response.user);
      setError("");
    } catch (error) {
      let errorMessage = error.message;
      setError(errorMessage);
      handleClick();
    }
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        handleClick();
      });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    setError("");
  };

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        handleClick();
      });
  };

  return (
    <div>
      <div className="content desktop-login">
        <div className={`container ${rightPanel}`} id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={() => signInGoogle()}>
                  <FcGoogle />
                </a>
              </div>
              <span>or use your email for registration</span>
              {/* <input className="input" type="text" value={userName}placeholder="Name" onChange={(e)=> setUserName(e.target.value)}  /> */}
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button className="button" onClick={() => handleSignUp()}>
                Sign Up
              </button>
              
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={() => signInGoogle()}>
                  <FcGoogle />
                </a>
              </div>
              <span>or use your account</span>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {/* <a href="#">Forgot your password?</a> */}
              <button className="button" onClick={() => handleSignIn()}>
                Sign In
              </button>
              <button className="button guest" onClick={() => fillForm()}>
                Guest
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost button"
                  onClick={() => {
                    setRightPanel("");
                    clearInputs();
                  }}
                  id="signIn"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost button"
                  onClick={() => {
                    setRightPanel("right-panel-active");
                    clearInputs();
                  }}
                  id="signUp"
                >
                  Sign Up
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-login">
        <div className="content">
          <div className="container" id="container">
            <div className="form-container sign-in-container">
              <form action="#">
                <h1>{newUser ? "Sign Up" : "Sign in"}</h1>
                <div className="social-container">
                  <a href="#" className="social" onClick={() => signInGoogle()}>
                    <FcGoogle />
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {newUser ? (
                  <p>
                    Have an account?
                    <a href="#" onClick={() => setNewUser(false)}>
                      SignIn
                    </a>
                  </p>
                ) : (
                  <p>
                    Don't have an account?
                    <a href="#" onClick={() => setNewUser(true)}>
                      SignUp
                    </a>
                  </p>
                )}
                {newUser ? (
                  <button className="button" onClick={() => handleSignUp()}>
                    Sign Up
                  </button>
                ) : (
                  <button className="button" onClick={() => handleSignIn()}>
                    Sign In
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="warning">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Auth;
