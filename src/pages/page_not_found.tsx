import {connect} from "react-redux";
import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {AppState} from "../states/app_state";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "../actions/app_action";
import HeaderMin from "../component/header_min";
import {aboutUsRef, contactUsRef, menuSectionRef, signinRef, signupRef} from "./main_page";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import {Gender} from "../models/gender";
import {RouteComponentProps, withRouter} from "react-router";
import {loadScripts} from "../config/load_scripts";
import {Currency, LocaleState} from "../states/locale_state";
import {SWITCH_CURRENCY} from "../actions/locale_action";
import {CartState, OrderItemState} from "../states/order_state";
import {SET_CART} from "../actions/order_action";


class PageNotFound extends React.Component<WithTranslation & RouteComponentProps> {
    t = this.props.t

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



                <div className="container" style={{marginTop: 300, marginBottom: 300}}>
                    <h1>404 - Page Not Found</h1>
                </div>
                <Footer aboutUsRef={aboutUsRef}/>
            </div>
        )
    }
}


export default withTranslation()(withRouter(PageNotFound))