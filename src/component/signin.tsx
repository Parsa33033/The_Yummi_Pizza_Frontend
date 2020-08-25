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

class Signin extends React.Component<WithTranslation & SigninProps & ReturnType<typeof mapDispatchToProps>, SigninStates> {

    t = this.props.t

    constructor(props: WithTranslation & SigninProps & ReturnType<typeof mapDispatchToProps> ) {
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
        if (validator.isEmail(this.state.email)) {
            if (validator.isAlphanumeric(this.state.password) && this.state.password.length > 7) {
                const loginDTO: LoginDTO = {
                    username: this.state.email,
                    password: this.state.password,
                    rememberMe: this.state.rememberMe
                }
                var i = await this.props.loginUser(loginDTO)
                if (i == 1) {
                    console.log("logged in!")
                    this.loginDisappear()
                } else {
                    this.setState({
                        showAlert: true
                    })
                    console.log("login error!")
                }
                this.setState({
                    message: this.t("")
                })
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
        if (validator.isEmail(this.state.email)) {
            var i = await sendPassResetEmail(this.state.email)
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
        this.setState({email: email.target.value});
    }

    handlePasswordChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: password.target.value});
    }

    handleRememberMe = (rememberMe: ChangeEvent<HTMLInputElement>) => {
        this.setState({rememberMe: rememberMe.target.checked});
    }



    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div ref={this.props.signinRef} style={{display: "none", position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}>
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

                                        {
                                            this.state.showAlert ?
                                                <div style={{textAlign: "left", color: "red", padding: 20}}>there was a problem with login. please make sure you entered your credentials right!</div>
                                                :
                                                <div/>
                                        }

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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        loginUser: (loginDTO: LoginDTO) => loginUser(dispatch, loginDTO),
    }
}

export default connect(null, mapDispatchToProps)(withTranslation()(Signin))