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
import {CustomerDTO} from "../dto/customer_dto";
import {updateCustomer} from "../actions/cutomer_action";
import {ChangeEvent, InputHTMLAttributes} from "react";
import {AddressDTO} from "../dto/address_dto";
import profileAvatar from "../assets/images/profile.png"
import header from "../component/header";


interface ProfilePageState {
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    image: string,
    imageContentType: string,
    phoneNumber: string,
    country: string,
    state: string,
    city: string,
    address1: string,
    address2: string,
    errorMessage: string,
    done: boolean
}



class ProfilePage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps, ProfilePageState> {
    t = this.props.t
    customer = this.props.customerState

    constructor(props: WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
        super(props);
        this.state = {
            firstName: this.customer.firstName,
            lastName: this.customer.lastName,
            email: this.customer.email,
            gender: Gender.FEMALE,
            image: this.customer.image,
            imageContentType: this.customer.imageContentType,
            address1: this.customer.address.address1,
            address2: this.customer.address.address2,
            city: this.customer.address.city,
            country: this.customer.address.country,
            phoneNumber: this.customer.address.phoneNumber,
            state: this.customer.address.state,
            done: false,
            errorMessage: ""
        }
    }

    componentWillMount(): void {
        loadScripts()
    }

    updateCustomer = () => {
        const address: AddressDTO = {
            id: -1,
            state: this.state.state,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            country: this.state.country,
            phoneNumber: this.state.phoneNumber
        }
        const customerDTO: CustomerDTO = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            image: this.state.image,
            imageContentType: this.state.imageContentType,
            email: this.state.email,
            id: this.customer.id,
            addressId: this.customer.addressId,
            address: address,
            gender: this.customer.gender,
            username: this.customer.username,
            mobileNumber: this.customer.mobileNumber,
            orders: []
        }
        this.props.updateCustomer(this.props.authentication.id_token, customerDTO)
    }

    handleImageChange = async (input: ChangeEvent<HTMLInputElement>) => {
        if(input.target.files) {
            var file = await input.target.files[0]
            let reader = new FileReader();
            reader.readAsBinaryString(file)
            var image = ""
            reader.onload =  () => {
                image = reader.result != null ? reader.result.toString() : ""
                this.setState({
                    image: btoa(image)
                })
            };



        }
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

                <Breadcrumb title={this.t("profile.page")}/>


                <div className="container">
                    <div className="container bootstrap snippets bootdey">
                        <h1 className="text-primary" style={{margin: 50}} ><span className="glyphicon glyphicon-user"></span>Edit Profile</h1>
                        <hr/>
                            <div className="row">

                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img style={{height: 100, width: 100}} src={this.state.image != "" && this.state.image != null ? `data:image/jpeg;base64,${this.state.image}`: profileAvatar} className="avatar img-circle" alt="avatar"/>
                                        {/*<img style={{height: 100, width: 100}} src={this.state.image != "" && this.state.image != null ? this.state.image : profileAvatar} className="avatar img-circle" alt="avatar"/>                                            <h6>{this.t("profile.page")} {this.t("profile.image")}</h6>*/}

                                            <input type="file" className="form-control" onChange={this.handleImageChange}/>
                                    </div>
                                </div>


                                <div className="col-md-9 personal-info" >
                                    {/*<div className="alert alert-info alert-dismissable">*/}
                                    {/*    <a className="panel-close close" data-dismiss="alert">×</a>*/}
                                    {/*    <i className="fa fa-coffee"></i>*/}
                                    {/*    This is an <strong>.alert</strong>. Use this to show important messages to the*/}
                                    {/*    user.*/}
                                    {/*</div>*/}
                                    <h3>Personal info</h3>

                                    <div className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.email")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text" value={this.state.email} disabled={true}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.firstname")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text" value={this.state.firstName} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({firstName: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.lastname")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.lastName} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({lastName: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.gender")}:</label>
                                                <div className="col-lg-8">
                                                    <div className="ui-select" >
                                                        <select id="user_time_zone" className="form-control" >
                                                            <option style={{backgroundColor: "grey"}} value={Gender.FEMALE} onClick={() => {this.setState({gender: Gender.FEMALE})}}>female</option>
                                                            <option style={{backgroundColor: "grey"}} value={Gender.MALE} onClick={() => {this.setState({gender: Gender.MALE})}}>male</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.phone-number")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.phoneNumber} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({phoneNumber: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.country")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.country} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({country: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.state")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.state} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({state: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.city")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.city} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({city: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.address1")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.address1} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({address1: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <label className="col-lg-3 control-label">{this.t("profile.address2")}:</label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text"
                                                           value={this.state.address2} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        this.setState({address2: event.target.value})
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" className="btn btn-secondary btn-lg" style={{margin: 40, width: 100, height: 40}} onClick={this.updateCustomer}>{this.t("profile.update")}</button>
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
        pizzariaState: state.pizzariaState,
        localeState: state.localeState
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        updateProfile : () => null,
        updateCustomer: (jwt: string, customerDTO: CustomerDTO) =>  updateCustomer(dispatch, jwt, customerDTO)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ProfilePage)))