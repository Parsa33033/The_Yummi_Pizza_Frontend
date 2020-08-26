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


class ProfilePage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps> {
    t = this.props.t

    componentWillMount(): void {
        loadScripts()
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

                <Breadcrumb title={this.t("profile.page") + " " + this.props.userState.login}/>

                <h1>{this.props.userState.login}</h1>

                <div className="container">
                    <div className="container bootstrap snippets bootdey">
                        <h1 className="text-primary"><span className="glyphicon glyphicon-user"></span>Edit Profile</h1>
                        <hr/>
                            <div className="row">

                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img src="//placehold.it/100" className="avatar img-circle" alt="avatar"/>
                                            <h6>{this.t("profile.page")} {this.t("profile.image")}</h6>

                                            <input type="file" className="form-control"/>
                                    </div>
                                </div>


                                <div className="col-md-9 personal-info">
                                    <div className="alert alert-info alert-dismissable">
                                        <a className="panel-close close" data-dismiss="alert">×</a>
                                        <i className="fa fa-coffee"></i>
                                        This is an <strong>.alert</strong>. Use this to show important messages to the
                                        user.
                                    </div>
                                    <h3>Personal info</h3>

                                    <div className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.email")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text" value="bootdey"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.firstname")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text" value=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.lastname")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value="janesemail@gmail.com"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.gender")}:</label>
                                                <div className="col-lg-8">
                                                    <div className="ui-select" >
                                                        <select id="user_time_zone" className="form-control" >
                                                            <option style={{backgroundColor: "grey"}} value={Gender.FEMALE}>female</option>
                                                            <option style={{backgroundColor: "grey"}} value={Gender.MALE}>male</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-secondary btn-lg" style={{margin: 40, width: 100, height: 40}}>{this.t("profile.update")}</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <hr/>
                </div>
                <Footer aboutUsRef={aboutUsRef}/>
            </div>
        )
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
        pizzariaState: state.pizzariaState
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        updateProfile : () => null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ProfilePage)))