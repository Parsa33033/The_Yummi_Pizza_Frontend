import {withTranslation, WithTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";

interface SigninProps {
    signinRef: RefObject<HTMLDivElement>
}

class Signin extends React.Component<WithTranslation & SigninProps> {

    loginDisappear = () => {
        if (this.props.signinRef.current)
            this.props.signinRef.current.setAttribute("style", "display:none;");
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div ref={this.props.signinRef} style={{display: "none", position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}>
                <div className="limiter">
                    <div className="container-login100" style={{backgroundColor: "grey", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0}}/>
                    <div className="container-login100" style={{backgroundColor: "transparent"}}>
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55" >
                            <div style={{position: "absolute", top: 10, right: 20}} ><a style={{cursor: "pointer"}} onClick={this.loginDisappear}><i className="fas fa-times fa-2x"></i></a> </div>
                            <form className="login100-form validate-form flex-sb flex-w" >
                                <span className="login100-form-title p-b-32">
                                    Account Login
                                </span>

                                <span className="txt1 p-b-11">
                                    Email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36"
                                     data-validate="Username is required">
                                    <input className="input100" type="text" name="username"/>
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
                                    <input className="input100" type="password" name="pass"/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="flex-sb-m w-full p-b-48">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox"
                                               name="remember-me"/>
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Remember me
                                        </label>
                                    </div>

                                    <div>
                                        <a href="#" className="txt3">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
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

export default withTranslation()(Signin)