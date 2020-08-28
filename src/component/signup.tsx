import {withTranslation, WithTranslation} from "react-i18next";
import * as React from "react";
import {ButtonHTMLAttributes, ChangeEvent, createRef, DetailedHTMLProps, Key, RefObject} from "react";
import {connect} from "react-redux";
import {UserState} from "../states/user_state";
import {registerUser} from "../actions/user_action";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "../actions/app_action";
import {RegisterDTO} from "../dto/register_dto";
import {AppState} from "../states/app_state";
import {AuthenticationState} from "../states/authentication_state";
import validator from "validator";

interface SignupProps {
    signupRef: RefObject<HTMLDivElement>
}

interface SignupStates {
    email: string,
    password: string,
    passwordRepeat: string,
    showAlert: boolean,
    successfulRegistration: boolean,
    registrationMessage: string,
    errorMessage: string,
}

class Signup extends React.Component<WithTranslation & SignupProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>, SignupStates> {

    t = this.props.t;
    alertRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
    registrationRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()

    constructor(props: WithTranslation & SignupProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>) {
        super(props)

        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
            showAlert: false,
            successfulRegistration: false,
            registrationMessage: "",
            errorMessage: ""
        }

    }

    registerUser = async () => {
        var email = this.state.email.toLowerCase().trim()
        if (validator.isEmail(email)) {
            if (validator.isAlphanumeric(this.state.password) && this.state.password.length > 7) {
                if (this.state.passwordRepeat == this.state.password) {
                    const user: RegisterDTO = {
                        email: email,
                        password: this.state.password,
                        login: email,
                        firstName: "",
                        lastName: "",
                        authorities: []
                    }
                    var i = await this.props.registerUser(user)
                    if (i == 1) {
                        // show error alert for 3 seconds
                        this.setState({
                            showAlert: true,
                            successfulRegistration: true,
                            registrationMessage: this.t("registration.successful") + ", " + this.t("registration.check-email")
                        })
                        this.endingRegistration()
                    } else if (i == 2) {
                        // show error alert for 3 seconds
                        this.setState({
                            showAlert: true,
                            successfulRegistration: false,
                            registrationMessage: this.t("registration.email-used")
                        })
                        this.endingRegistration()
                    } else {
                        // show error alert for 3 seconds
                        this.setState({
                            showAlert: true,
                            successfulRegistration: false,
                            registrationMessage: this.t("registration.failed")
                        })
                        this.endingRegistration()
                    }
                } else {
                    this.setState({
                        errorMessage: this.t("registration.pass-not-match")
                    })
                    console.log("passwords not matching")
                }
            } else {
                this.setState({
                    errorMessage: this.t("registration.pass-invalid")
                })
                console.log("passwords must be numbers and letters and must contain at least 7 characters!")
            }

        } else {
            this.setState({
                errorMessage: this.t("registration.email-invalid")
            })
            console.log("email is not valid!")
        }
    }

    endingRegistration = () => {
        setTimeout(() => {
            this.registrationDisappear()
            this.setState({
                email: "",
                password: "",
                passwordRepeat: "",
                showAlert: false,
                successfulRegistration: false,
                registrationMessage: "",
                errorMessage: ""
            })

        }, 3000)
    }

    registrationDisappear = () => {
        if (this.props.signupRef.current) {
            this.props.signupRef.current.setAttribute("style", "display:none;");
        }
    }

    handleEmailChange = (email: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: email.target.value.trim()});
    }

    handlePasswordChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: password.target.value});
    }

    handlePasswordRepeatChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({passwordRepeat: password.target.value});
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div ref={this.props.signupRef} style={{display: "none", position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 1000}}>
                {
                    this.state.showAlert ?
                        <div style={{display: "block", width: "100%"}}>
                            {
                                this.state.successfulRegistration ?
                                    <div className="alert alert-success registration-alert" style={{position:"fixed", top: 100, left: 100, width: 300}} role="alert">
                                        <strong>{this.t("well-done")}</strong> {this.state.registrationMessage}
                                    </div> :
                                    <div className="alert alert-danger registration-alert" style={{position:"fixed", top: 100, left: 100, width: 300}} role="alert">
                                        <strong>{this.t("error")}</strong> {this.state.registrationMessage}
                                    </div>
                            }
                        </div>
                        :
                        <div>
                            <div className="limiter">
                                <div className="container-login100" style={{backgroundColor: "grey", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}/>
                                <div className="container-login100" style={{backgroundColor: "transparent"}}>
                                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                                        <div style={{position: "absolute", top: 10, right: 20}} ><a style={{cursor: "pointer"}} onClick={this.registrationDisappear}><i className="fas fa-times fa-2x"></i></a> </div>
                                        <div className="login100-form validate-form flex-sb flex-w">
                                            <span className="login100-form-title p-b-32">
                                                {this.t("registration.registration")}
                                            </span>

                                            <span className="txt1 p-b-11">
                                                {this.t("input.email")}
                                            </span>
                                            <div className="wrap-input100 validate-input m-b-36"
                                                 data-validate="Username is required">
                                                <input className="input100" type="text" name="username" value={this.state.email} onChange={this.handleEmailChange}/>
                                                <span className="focus-input100"></span>
                                            </div>

                                            <span className="txt1 p-b-11">
                                                {this.t("input.password")}
                                            </span>
                                            <div className="wrap-input100 validate-input m-b-12"
                                                 data-validate="Password is required">
                                                <span className="btn-show-pass">
                                                    <i className="fa fa-eye"></i>
                                                </span>
                                                    <input className="input100" type="password" name="pass" onChange={this.handlePasswordChange} value={this.state.password}/>
                                                    <span className="focus-input100"></span>
                                            </div>

                                            <span className="txt1 p-b-11">
                                                {this.t("input.repeat-password")}
                                            </span>
                                            <div className="wrap-input100 validate-input m-b-12"
                                                 data-validate="Password is required">
                                                <span className="btn-show-pass">
                                                    <i className="fa fa-eye"></i>
                                                </span>
                                                <input className="input100" type="password" name="pass" onChange={this.handlePasswordRepeatChange} value={this.state.passwordRepeat}/>
                                                <span className="focus-input100"></span>
                                            </div>

                                            <div>
                                                {
                                                    this.state.errorMessage != "" ?
                                                        <h6 style={{color: "red", textAlign: "left"}}>
                                                            * {this.state.errorMessage}
                                                        </h6>
                                                        :
                                                        <div/>
                                                }
                                            </div>
                                            <div className="container-login100-form-btn" style={{margin: 20}}>
                                                <button className="login100-form-btn" onClick={this.registerUser}>
                                                    {this.t("registration.register")}
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

        );
    }
}

const mapStateToProps = (state: any) : AuthenticationState => {
    return {
        id_token: state.authentication.id_token,
        authenticated: state.authentication.authenticated
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        registerUser: (registerDTO: RegisterDTO) => registerUser(dispatch, registerDTO)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Signup))