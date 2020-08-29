import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import {connect} from "react-redux";
import {AppState} from "../states/app_state";
import {AuthenticationState} from "../states/authentication_state";
import {Authority} from "../models/user";
import {RouteComponentProps, useHistory} from "react-router";
import {createRef} from "react";
import {appActions, logout} from "../actions/app_action";
import {ThunkDispatch} from "redux-thunk";

interface HeaderProps {
    menuSectionRef: RefObject<HTMLDivElement>,
    aboutUsRef: RefObject<HTMLDivElement>,
    contactUsRef: RefObject<HTMLDivElement>,
    signinRef: RefObject<HTMLDivElement>,
    signupRef: RefObject<HTMLDivElement>
}

class HeaderMin extends React.Component<WithTranslation & HeaderProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps> {

    dropdownMenuRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
    menuRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()

    slideToMenuSection = () => {
        if (this.props.menuSectionRef.current)
            this.props.menuSectionRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToContactUs = () => {
        if (this.props.contactUsRef.current)
            this.props.contactUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToAboutUs = () => {
        if (this.props.aboutUsRef.current)
            this.props.aboutUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    loginAppear = () => {
        if (this.props.signinRef.current)
            this.props.signinRef.current.setAttribute("style", "display:block;position: fixed; top: 0; right: 0; left: 0; bottom: 0;");
    }

    registrationAppear = () => {
        if (this.props.signupRef.current)
            this.props.signupRef.current.setAttribute("style", "display:block;position: fixed; top: 0; right: 0; left: 0; bottom: 0;");

    }

    toggleMenu = () => {
        if (this.dropdownMenuRef.current) {
            this.dropdownMenuRef.current.getAttribute("style") == "display: none;"
                ? this.dropdownMenuRef.current.setAttribute("style", "display: block;")
                : this.dropdownMenuRef.current.setAttribute("style", "display: none;")
        }
    }


    openNavbar = () => {
        if (this.menuRef.current) {
            this.menuRef.current.getAttribute("style") == "display: none;"
                ? this.menuRef.current.setAttribute("style", "display: block;")
                : this.menuRef.current.setAttribute("style", "display: none;")
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                     id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="/"><span className="flaticon-pizza-1 mr-1"></span>The Yummi<br/>
                            <small>Pizza</small></a>
                        <button className="navbar-toggler" type="button" onClick={this.openNavbar}//data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav" ref={this.menuRef}>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active  border-right"><a style={{cursor: "pointer"}} onClick={() => this.props.history.push("/")} className="nav-link">Home</a></li>
                                {
                                    this.props.authentication.authenticated == false ?
                                        <div>
                                            {/*<ul className="navbar-nav ml-auto">*/}
                                            {/*    <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.loginAppear}>Login</a></li>*/}
                                            {/*    <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.registrationAppear} >Register</a></li>*/}
                                            {/*</ul>*/}
                                        </div>
                                        :
                                        this.props.userState.authorities.includes(Authority[Authority.ROLE_USER]) ?
                                            <div style={{padding: 10, margin: "0 auto", width: "100%", zIndex:100}}>

                                                <div className="dropdown">
                                                    <button className="btn btn-secondary " type="button"
                                                            onClick={this.toggleMenu} id="dropdownMenuButton"
                                                            aria-expanded="false">
                                                        <h6>{this.props.userState.login}</h6>
                                                        <i className="fas fa-angle-down"></i>
                                                    </button>
                                                    <div className="dropdown-menu" ref={this.dropdownMenuRef} style={{display: "none"}} id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/profile")}><i style={{paddingRight: 4}}
                                                                                                                                                                        className="fas fa-user"></i>   Profile</a>
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/orders")}><i style={{paddingRight: 4}}
                                                                                                 className="fa fa-list-alt" aria-hidden="true"></i>
                                                            Orders</a>
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.logout()}><i style={{paddingRight: 4}}
                                                                                                 className="fas fa-sign-out-alt"></i>   Logout</a>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div style={{padding: 10, margin: "0 auto", width: "100%", zIndex:100}}>

                                                <div className="dropdown">
                                                    <button className="btn btn-secondary " type="button"
                                                            onClick={this.toggleMenu} id="dropdownMenuButton"
                                                            aria-expanded="false">
                                                        <h6>{this.props.userState.login} - <small>Manager</small></h6>
                                                        <i className="fas fa-angle-down"></i>
                                                    </button>
                                                    <div className="dropdown-menu" ref={this.dropdownMenuRef} style={{display: "none"}} id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/profile")}><i style={{paddingRight: 4}}
                                                                                                                                                                        className="fas fa-user"></i>   Profile</a>
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/orders")}><i style={{paddingRight: 4}}
                                                                                                 className="fa fa-list-alt" aria-hidden="true"></i>
                                                            Orders</a>
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/menu")}><i style={{paddingRight: 4}}
                                                                                                                                                                     className="fa fa-list-alt" aria-hidden="true"></i>
                                                            Menu</a>
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.logout()}><i style={{paddingRight: 4}}
                                                                                                 className="fas fa-sign-out-alt"></i>   Logout</a>
                                                    </div>
                                                </div>
                                            </div>

                                }

                                {/*<li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" ><i style={{height: 40, width: 40}}*/}
                                {/*                                                                                 className="fas fa-shopping-cart"><span className="badge badge-light" style={{position: "relative", top: 0, right: 0}}>9</span></i></a> </li>*/}

                                {
                                    !this.props.userState.authorities.includes(Authority[Authority.ROLE_MANAGER]) ?
                                        <li className="nav-item"><a style={{cursor: "pointer"}} onClick={() => this.props.history.push("/cart")} className="nav-link" >
                                            <i style={{height: 20, width: 40}}
                                               className="fas fa-shopping-cart">
                                                {
                                                    this.props.cartState.items.length >= 1 ?
                                                        <span className="badge badge-light" style={{position: "relative", top: 0, right: 0}}>{this.props.cartState.items.map((orderItem) => {return orderItem.number}).reduce((oldVal, newVal)=> oldVal + newVal)}</span>
                                                        :
                                                        <div/>
                                                }
                                            </i>
                                        </a>
                                        </li>
                                        :
                                        <div/>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
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
        logout: () => logout(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderMin))