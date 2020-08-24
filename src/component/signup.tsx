import {withTranslation, WithTranslation} from "react-i18next";
import * as React from "react";
import {ChangeEvent, RefObject} from "react";
import {connect} from "react-redux";
import {UserState} from "../states/user_state";
import {registerUser} from "../actions/user_action";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "../actions/app_action";
import {RegisterDTO} from "../dto/register_dto";
import {AppState} from "../states/app_state";
import {AuthenticationState} from "../states/authentication_state";

interface SignupProps {
    signupRef: RefObject<HTMLDivElement>
}

interface SignupStates {
    email: string,
    password: string,
    passwordRepeat: string
}

class Signup extends React.Component<WithTranslation & SignupProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>, SignupStates> {

    constructor(props: WithTranslation & SignupProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>) {
        super(props)

        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
        }
    }

    registerUser = async () => {
        if (this.state.passwordRepeat == this.state.password) {
            const user : RegisterDTO = {
                email: this.state.email,
                password: this.state.password,
                login: this.state.email,
                firstName: "",
                lastName: ""
            }
            var i = await this.props.registerUser(user)
            if (i == 1) {
                this.registrationDisappear()
                console.log("jwt--->" + localStorage.getItem("jwt") + "---" + this.props.id_token)
            } else {
                console.log("error registering")
            }

        } else {
            console.log("passwords not matching")
        }
    }

    registrationDisappear = () => {
        if (this.props.signupRef.current)
            this.props.signupRef.current.setAttribute("style", "display:none;");
    }

    handleEmailChange = (email: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: email.target.value});
    }

    handlePasswordChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: password.target.value});
    }

    handlePasswordRepeatChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({passwordRepeat: password.target.value});
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div ref={this.props.signupRef} style={{display: "none", position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}>
                <div className="limiter">
                    <div className="container-login100" style={{backgroundColor: "grey", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}/>
                    <div className="container-login100" style={{backgroundColor: "transparent"}}>
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <div style={{position: "absolute", top: 10, right: 20}} ><a style={{cursor: "pointer"}} onClick={this.registrationDisappear}><i className="fas fa-times fa-2x"></i></a> </div>
                            <form className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Account Register
                                </span>

                                <span className="txt1 p-b-11">
                                    Email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36"
                                     data-validate="Username is required">
                                    <input className="input100" type="text" name="username" value={this.state.email} onChange={this.handleEmailChange}/>
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

                                <span className="txt1 p-b-11">
                                    Repeat Password
                                </span>
                                <div className="wrap-input100 validate-input m-b-12"
                                     data-validate="Password is required">
                                    <span className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                    <input className="input100" type="password" name="pass" onChange={this.handlePasswordRepeatChange}/>
                                    <span className="focus-input100"></span>
                                </div>


                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" onClick={this.registerUser}>
                                        Register
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) : AuthenticationState => {
    return {
        id_token: state.authentication.id_token
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        registerUser: (registerDTO: RegisterDTO) => registerUser(dispatch, registerDTO)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Signup))