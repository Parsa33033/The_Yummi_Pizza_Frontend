import {withTranslation, WithTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "../actions/app_action";
import {LoginDTO} from "../dto/login_dto";
import {loginUser, sendPassResetEmail} from "../actions/authentication_action";
import {connect} from "react-redux";
import {ChangeEvent} from "react";
import {store} from "../config/store";
import validator from "validator";
import {getCustomer} from "../actions/cutomer_action";
import {AuthenticationState} from "../states/authentication_state";
import {AppState} from "../states/app_state";
import {Authority} from "../models/user";
import {getManager} from "../actions/manager_action";

interface SigninProps {
    signinRef: RefObject<HTMLDivElement>
}

interface SigninStates {
    email: string,
    password: string,
    rememberMe: boolean,
    showAlert: boolean,
    forgotPass: boolean
    message: string
}

class Signin extends React.Component<WithTranslation & SigninProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>, SigninStates> {

    t = this.props.t

    constructor(props: WithTranslation & SigninProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
        super(props)

        this.state = {
            email: "",
            password: "",
            rememberMe: false,
            showAlert: false,
            forgotPass: false,
            message: ""
        }

    }

    loginUser = async () => {
        var email = this.state.email.toLowerCase().trim()
        if (validator.isEmail(email)) {
            if (validator.isAlphanumeric(this.state.password) && this.state.password.length > 6) {
                const loginDTO: LoginDTO = {
                    username: email,
                    password: this.state.password,
                    rememberMe: this.state.rememberMe
                }
                var i = await this.props.loginUser(loginDTO)
                if (i == 1) {
                    console.log("logged in!")
                    if(this.props.userState.authorities.includes(Authority[Authority.ROLE_USER])) {
                        i = await this.props.getCustomer(this.props.authentication.id_token)
                    } else {
                        i = await this.props.getManager(this.props.authentication.id_token)
                    }
                    if (i != 1) {
                        this.setState({
                            message: "there was a problem fetching your profile info!"
                        })
                    } else {
                        this.setState({
                            message: ""
                        })
                        this.loginDisappear()
                    }
                } else {
                    this.setState({
                        showAlert: true,
                        message: "there was a problem with login. please make sure you entered your credentials right!"
                    })
                    console.log("login error!")
                }
            } else {
                this.setState({
                    message: this.t("login.pass-invalid")
                })
            }
        } else {
            this.setState({
                message: this.t("login.email-invalid")
            })
        }
    }

    sendPassResetEmail = async () => {
        var email = this.state.email.toLowerCase().trim()
        if (validator.isEmail(email)) {
            var i = await sendPassResetEmail(email)
            if (i == 1) {
                this.setState({
                    message: this.t("success") + ", " + this.t("check-email")
                })
            } else {
                this.setState({
                    message: this.t("failure")
                })
            }
        } else {
            this.setState({
                message: this.t("email-invalid")
            })
        }
    }

    loginDisappear = () => {
        if (this.props.signinRef.current)
            this.props.signinRef.current.setAttribute("style", "display:none;");
    }

    handleEmailChange = (email: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: email.target.value.trim()});
    }

    handlePasswordChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: password.target.value});
    }

    handleRememberMe = (rememberMe: ChangeEvent<HTMLInputElement>) => {
        this.setState({rememberMe: rememberMe.target.checked});
    }



    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div ref={this.props.signinRef} style={{display: "none", position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 1000}}>
                <div className="limiter">
                    <div className="container-login100" style={{backgroundColor: "grey", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}/>
                    <div className="container-login100" style={{backgroundColor: "transparent"}}>
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55" >
                            <div style={{position: "absolute", top: 10, right: 20}} ><a style={{cursor: "pointer"}} onClick={this.loginDisappear}><i className="fas fa-times fa-2x"></i></a> </div>
                            {
                                this.state.forgotPass ?
                                    <div className="login100-form validate-form flex-sb flex-w" >

                                        <div style={{position: "absolute", top: 10, left: 20}} >
                                            <a style={{cursor: "pointer"}} className="txt3" onClick={() => {this.setState({forgotPass: false})}}>
                                                <i className="fas fa-arrow-left fa-2x"></i>
                                            </a>
                                        </div>
                                        <span className="login100-form-title p-b-32">
                                            {this.t("login.reset-pass")}
                                        </span>

                                        <span className="txt1 p-b-11">
                                            Email
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36"
                                             data-validate="Username is required">
                                            <input className="input100" type="text" name="username" onChange={this.handleEmailChange} value={this.state.email}/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div >
                                            <h6 style={{color: "red", textAlign: "left"}}>
                                                {
                                                    this.state.message
                                                }
                                            </h6>
                                        </div>

                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn" onClick={this.sendPassResetEmail}>
                                                {this.t("login.send-email")}
                                            </button>
                                        </div>

                                    </div>
                                    :
                                    <div className="login100-form validate-form flex-sb flex-w" >
                                <span className="login100-form-title p-b-32">
                                    Account Login
                                </span>

                                        <span className="txt1 p-b-11">
                                    Email
                                </span>
                                        <div className="wrap-input100 validate-input m-b-36"
                                             data-validate="Username is required">
                                            <input className="input100" type="text" name="username" onChange={this.handleEmailChange} value={this.state.email}/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <span className="txt1 p-b-11">
                                    Password
                                </span>
                                        <div className="wrap-input100 validate-input m-b-12"
                                             data-validate="Password is required">
                                    <span className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                            <input className="input100" type="password" name="pass" onChange={this.handlePasswordChange} value={this.state.password}/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div className="flex-sb-m w-full p-b-48">
                                            <div className="contact100-form-checkbox">
                                                <input className="input-checkbox100" id="ckb1" type="checkbox"
                                                       name="remember-me" onChange={this.handleRememberMe} checked={this.state.rememberMe}/>
                                                <label className="label-checkbox100" htmlFor="ckb1">
                                                    {this.t("login.remember-me")}
                                                </label>
                                            </div>

                                            <div>
                                                <a style={{cursor: "pointer"}} className="txt3" onClick={() => {this.setState({forgotPass: true})}}>
                                                    {this.t("login.forgot-password")}
                                                </a>
                                            </div>
                                        </div>

                                        <div >
                                            <h6 style={{color: "red", textAlign: "left"}}>
                                                {
                                                    this.state.message
                                                }
                                            </h6>
                                        </div>

                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn" onClick={this.loginUser}>
                                                Login
                                            </button>
                                        </div>

                                    </div>
                            }
                        </div>
                    </div>
                </div>
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
        loginUser: (loginDTO: LoginDTO) => loginUser(dispatch, loginDTO),
        getCustomer: (jwt: string) => getCustomer(dispatch, jwt),
        getManager: (jwt: string) => getManager(dispatch, jwt)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Signin))