import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import {connect} from "react-redux";
import {AppState} from "../states/app_state";
import {AuthenticationState} from "../states/authentication_state";
import {Authority} from "../models/user";
import {RouteComponentProps, useHistory} from "react-router";

interface HeaderProps {
    menuSectionRef: RefObject<HTMLDivElement>,
    aboutUsRef: RefObject<HTMLDivElement>,
    contactUsRef: RefObject<HTMLDivElement>,
    signinRef: RefObject<HTMLDivElement>,
    signupRef: RefObject<HTMLDivElement>
}

class HeaderMin extends React.Component<WithTranslation & HeaderProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps> {
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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                     id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html"><span className="flaticon-pizza-1 mr-1"></span>Pizza<br/>
                            <small>Delicous</small></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
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
                                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        <h6>{this.props.userState.login}</h6>
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.props.history.push("/profile")}><i style={{paddingRight: 4}}
                                                                                                                                                                        className="fas fa-user"></i>   Profile</a>
                                                        <a className="dropdown-item" href="#"><i style={{paddingRight: 4}}
                                                                                                 className="fa fa-list-alt" aria-hidden="true"></i>
                                                            Orders</a>
                                                        <a className="dropdown-item" href="#"><i style={{paddingRight: 4}}
                                                                                                 className="fas fa-sign-out-alt"></i>   Logout</a>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div style={{padding: 10, margin: "0 auto", width: "100%", zIndex:100}}>

                                                <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        <h6>{this.props.userState.login} - Manager</h6>
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" href="#">Action</a>
                                                        <a className="dropdown-item" href="#">Another action</a>
                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>

                                }

                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" ><i style={{height: 40, width: 40}}
                                                                                                                 className="fas fa-shopping-cart"><span className="badge badge-light" style={{position: "relative", top: 0, right: 0}}>9</span></i></a> </li>
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
        pizzariaState: state.pizzariaState
    }
}

const mapDispatchToProps = () => {
    return {
        doNone: () => {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderMin))