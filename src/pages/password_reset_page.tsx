import {connect} from "react-redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {WithT} from "i18next";
import * as React from "react";
import bg1 from "../assets/images/bg_1.jpg";
import bg3 from "../assets/images/bg_3.jpg";
import Footer from "../component/footer";
import {aboutUsRef} from "./main_page";
import {RouteComponentProps } from "react-router-dom"
import querystring from "querystring"
import axios, {AxiosRequestConfig} from 'axios'
import {activatoin_url, password_reset_url} from "../config/urls";
import {ChangeEvent} from "react";
import {KeyAndPasswordDTO} from "../dto/key_and_password_dto";
import validator from "validator";

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
                                <li className="nav-item active"><a style={{cursor: "pointer"}} href="/" className="nav-link">Home</a></li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <section className="home-slider owl-carousel img" style={{backgroundImage: `url(${bg1})`}}>

                    <div className="slider-item" style={{backgroundImage: `url(${bg3})`}}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center">

                                <div className="col-md-7 col-sm-12 text-center ftco-animate">
                                    <h1 className="mb-3 mt-5 bread">{this.t("login.reset-pass")}</h1>
                                    <p className="breadcrumbs"><span className="mr-2"><a
                                        href="/">Home</a></span> <span>{this.t("login.reset-pass")}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

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