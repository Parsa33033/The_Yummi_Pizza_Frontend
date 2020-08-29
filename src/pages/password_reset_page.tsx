import {connect} from "react-redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {WithT} from "i18next";
import * as React from "react";
import bg1 from "../assets/images/bg_1.jpg";
import bg3 from "../assets/images/bg_3.jpg";
import Footer from "../component/footer";
import {aboutUsRef, contactUsRef, menuSectionRef, signinRef, signupRef} from "./main_page";
import {RouteComponentProps } from "react-router-dom"
import querystring from "querystring"
import axios, {AxiosRequestConfig} from 'axios'
import {activatoin_url, password_reset_url} from "../config/urls";
import {ChangeEvent} from "react";
import {KeyAndPasswordDTO} from "../dto/key_and_password_dto";
import validator from "validator";
import HeaderMin from "../component/header_min";
import Breadcrumb from "../component/breadcrumb";
import {loadScripts} from "../config/load_scripts";

interface MatchParams {
    key: string;
}

interface PasswordResetPageStates {
    password: string,
    passwordRepeat: string,
    passwordHasReset: boolean,
    errorMessage: string,
}

class PasswordResetPage extends React.Component<WithTranslation & RouteComponentProps<MatchParams>, PasswordResetPageStates> {

    t = this.props.t

    constructor(props: WithTranslation & RouteComponentProps<MatchParams>) {
        super(props)

        this.state = {
            password: "",
            passwordRepeat: "",
            passwordHasReset: false,
            errorMessage: ""
        }
    }

    componentWillMount(): void {
        loadScripts()
        window.scrollTo(0, 0)
    }

    resetPassword = async () => {
        if (this.state.password == this.state.passwordRepeat) {
            if (validator.isAlphanumeric(this.state.password) && this.state.password.length > 7) {
                var key = new URLSearchParams(this.props.location.search).get("key")
                const keyAndPasswordDTO: KeyAndPasswordDTO = {
                    key: key != null? key : "",
                    newPassword: this.state.password
                }

                const config: AxiosRequestConfig = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                console.log("---->" + JSON.stringify(keyAndPasswordDTO))
                axios.post(password_reset_url, JSON.stringify(keyAndPasswordDTO), config).then((response) => {
                    if (response.status == 200) {
                        this.setState({
                            passwordHasReset: true
                        })
                    }
                }).catch((error) => {
                    this.setState({
                        errorMessage: this.t("failure")
                    })
                    console.log("error: " + error.response.data)
                })
            } else {
                this.setState({
                    errorMessage: this.t("login.pass-invalid")
                })
            }
        } else {
            this.setState({errorMessage: this.t("login.pass-not-match")})
        }
    }

    handlePasswordChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: password.target.value});
    }

    handlePasswordRepeatChange = (password: ChangeEvent<HTMLInputElement>) => {
        this.setState({passwordRepeat: password.target.value});
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <HeaderMin aboutUsRef={aboutUsRef}
                           contactUsRef={contactUsRef}
                           menuSectionRef={menuSectionRef}
                           signinRef={signinRef}
                           signupRef={signupRef}
                           staticContext={this.props.staticContext}
                           match={this.props.match}
                           location={this.props.location}
                           history={this.props.history}/>

                <Breadcrumb title={this.t("login.reset-pass")}/>

                <div >
                    {
                        this.state.passwordHasReset ?
                            <div style={{padding: 300}}><h2>{this.t("login.pass-has-reset")}</h2></div>
                            :
                            <div style={{ padding: 400}}>
                                <div style={{height: 500, padding: 300}}>
                                    <h1>{this.t("login.reset-pass")}</h1>
                                </div>

                                <div>
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

                                    <div className="container-login100-form-btn" style={{margin: 20}}>
                                        <button className="login100-form-btn" onClick={this.resetPassword}>
                                            {this.t("login.reset-pass")}
                                        </button>
                                    </div>
                                    {
                                        this.state.errorMessage != "" ?
                                            <h3>{this.state.errorMessage}</h3>
                                            :
                                            <div/>
                                    }
                                </div>
                            </div>
                        }
                </div>

                <Footer aboutUsRef={aboutUsRef}/>

            </div>
        )
    }
}

export default withTranslation()(PasswordResetPage)