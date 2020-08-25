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
import axios from 'axios'
import {activatoin_url} from "../config/urls";

interface MatchParams {
    key: string;
}

interface ActivationPageState {
    activated: boolean
}

class ActivationPage extends React.Component<WithTranslation & RouteComponentProps<MatchParams>, ActivationPageState> {

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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                {
                    this.state.activated ?
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
                                                <h1 className="mb-3 mt-5 bread">Account Activation</h1>
                                                <p className="breadcrumbs"><span className="mr-2"><a
                                                    href="/">Home</a></span> <span>Account Activation</span></p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                           <div style={{height: 500, padding: 300}}>
                               <h1>{this.props.t("activation")}</h1>
                           </div>
                            <Footer aboutUsRef={aboutUsRef}/>
                        </div>
                        :
                        <div/>
                }

            </div>
        )
    }
}

export default withTranslation()(ActivationPage)