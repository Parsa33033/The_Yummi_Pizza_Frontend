import React from 'react';
import './App.css';
import MainPage from "./pages/main_page";
import ActivationPage from "./pages/activation_page"
import ResetPasswordPage from "./pages/password_reset_page"
import ProfilePage from "./pages/profile_page"
import CartPage from "./pages/cart_page"
import CheckoutPage from "./pages/checkout_page"
import OrderPage from "./pages/order_page"
import MenuPage from "./pages/menu_page"
import PageNotFound from "./pages/page_not_found"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {loadScripts} from "./config/load_scripts";
import {appActions, appInit} from "./actions/app_action";
import {AppState} from "./states/app_state";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {Authority} from "./models/user";

class App extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {

    constructor(props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
        super(props)
        this.props.appInit()
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/"  component={MainPage}/>
                        <Route path="/activate"  component={ActivationPage}/>
                        <Route path="/password-reset"  component={ResetPasswordPage}/>
                        {this.props.userState.authorities.length >= 1 ? <Route path="/profile"  component={ProfilePage}/> : null}
                        {this.props.userState.authorities.length >= 1 ? <Route path="/orders"  component={OrderPage}/> : null}
                        {!this.props.userState.authorities.includes(Authority[Authority.ROLE_USER]) ? <Route path="/menu"  component={MenuPage}/> : null}
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/checkout" component={CheckoutPage}/>
                        <Route path="*" component={PageNotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

const mapStateToProps = (state: any) : AppState => {
    return {
        userState: state.userState,
        authentication: state.authentication,
        cartState: state.cartState,
        customerState: state.customerState,
        managerState: state.managerState,
        menuItemListState: state.menuItemListState,
        pizzariaState: state.pizzariaState,
        localeState: state.localeState,
        orderListState: state.orderListState
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        appInit: () => appInit(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
