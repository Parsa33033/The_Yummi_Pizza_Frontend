import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./pages/main_page";
import Signin from "./component/signin";
import Signup from "./component/signup";
import ActivationPage from "./pages/activation_page"
import ResetPasswordPage from "./pages/password_reset_page"
import {BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/" exact component={MainPage}/>
          <Route path="/activate" exact component={ActivationPage}/>
          <Route path="/password-reset" exact component={ResetPasswordPage}/>
          {/*<Route component={MainPage}/>*/}
      </Router>
    </div>
  );
}

export default App;
