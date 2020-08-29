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
import axios from 'axios'
import {activatoin_url} from "../config/urls";
import Header from "../component/header";
import HeaderMin from "../component/header_min";
import Breadcrumb from "../component/breadcrumb";
import {loadScripts} from "../config/load_scripts";

interface MatchParams {
    key: string;
}

interface ActivationPageState {
    activated: boolean
}

class ActivationPage extends React.Component<WithTranslation & RouteComponentProps<MatchParams>, ActivationPageState, RouteComponentProps> {
    t = this.props.t



    constructor(props: WithTranslation & RouteComponentProps<MatchParams>) {
        super(props);
        this.state = {
            activated: false
        }

        var key = new URLSearchParams(this.props.location.search).get("key")
        var url = activatoin_url + "?key="+ key
        axios.get(url).then((response) => {
            if (response.status == 200) {
                this.setState({
                    activated: true
                })
            }
        }).catch((error) => {
            console.log("error: " + error.response.data)
        })
    }

    componentWillMount(): void {
        loadScripts()
        window.scrollTo(0, 0)
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
                <Breadcrumb title={this.t("registration.activation")}/>
                {
                    this.state.activated ?
                        <div>

                           <div style={{height: 500, padding: 300}}>
                               <h1>{this.props.t("activation")}</h1>
                           </div>

                        </div>
                        :
                        <div/>
                }
                <Footer aboutUsRef={aboutUsRef}/>
            </div>
        )
    }
}

export default withTranslation()(ActivationPage)