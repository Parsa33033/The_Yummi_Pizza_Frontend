import React from 'react';
import './App.css';
import MainPage from "./pages/main_page";
import ActivationPage from "./pages/activation_page"
import ResetPasswordPage from "./pages/password_reset_page"
import ProfilePage from "./pages/profile_page"
import CartPage from "./pages/cart_page"
import CheckoutPage from "./pages/checkout_page"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {loadScripts} from "./config/load_scripts";

class App extends React.Component {


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/"  component={MainPage}/>
                        <Route path="/activate"  component={ActivationPage}/>
                        <Route path="/password-reset"  component={ResetPasswordPage}/>
                        <Route path="/profile"  component={ProfilePage}/>
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/checkout" component={CheckoutPage}/>
                        <Route path="*" component={MainPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

export default App;
