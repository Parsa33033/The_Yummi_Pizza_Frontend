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
import {RouteComponentProps, withRouter} from "react-router";
import {loadScripts} from "../config/load_scripts";
import {Currency, LocaleState} from "../states/locale_state";
import {SWITCH_CURRENCY} from "../actions/locale_action";
import {Authority} from "../models/user";
import about_img from "../assets/images/about.jpg";
import {FoodType} from "../models/menu_item";

interface MenuPageState {
    addMenuItemFormAppear: boolean
    foodType: FoodType
}

class MenuPage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps, MenuPageState> {
    t = this.props.t

    constructor(props: WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
        super(props);
        this.state = {
            addMenuItemFormAppear: false,
            foodType: FoodType.PIZZA
        }
    }

    componentWillMount = async () => {
        loadScripts()
    }

    switchCurrency = () => {
        this.props.switchCurrency(this.props.localeState.currency)
    }

    appearMenuItemForm = (foodType: FoodType) => {
        this.setState({
            addMenuItemFormAppear: !this.state.addMenuItemFormAppear,
            foodType: foodType
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
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

                <Breadcrumb title={"Orders"}/>


                {
                    this.props.userState.authorities.includes(Authority[Authority.ROLE_MANAGER]) ?

                        <div>
                            <div className="row justify-content-center mb-5 pb-3 mt-5 pt-5">
                                <div className="col-md-7 heading-section text-center ftco-animate">
                                    <h2 className="mb-4">Menu Pricing</h2>
                                    <p className="flip"><span className="deg1"></span><span className="deg2"></span><span
                                        className="deg3"></span></p>
                                    <i className="fas fa-euro-sign"></i>
                                    <div className="switch" style={{margin: 10}}>

                                        <label >

                                            <input type="checkbox" checked={Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR]} onClick={this.switchCurrency}/>
                                            <span className="slider round" ></span>
                                        </label>

                                    </div>
                                    <i className="fas fa-dollar-sign"></i>
                                </div>
                            </div>

                            <section className="ftco-menu">
                                <div className="container-fluid">
                                    <div className="row d-md-flex">
                                        <div className="col-lg-4 ftco-animate img f-menu-img mb-5 mb-md-0"
                                             style={{backgroundImage: `url(${about_img})`}}>
                                        </div>
                                        <div className="col-lg-8 ftco-animate p-md-5">
                                            <div className="row">


                                                <div className="col-md-12 nav-link-wrap mb-5">
                                                    <div className="nav ftco-animate nav-pills" id="v-pills-tab" role="tablist"
                                                         aria-orientation="vertical">
                                                        <a className="nav-link active" id="v-pills-1-tab" data-toggle="pill"
                                                           href="#v-pills-1" role="tab" aria-controls="v-pills-1"
                                                           aria-selected="true">{FoodType[FoodType.PIZZA]}</a>

                                                        <a className="nav-link" id="v-pills-2-tab" data-toggle="pill"
                                                           href="#v-pills-2" role="tab" aria-controls="v-pills-2"
                                                           aria-selected="false">{FoodType[FoodType.DRINK]}</a>

                                                        <a className="nav-link" id="v-pills-3-tab" data-toggle="pill"
                                                           href="#v-pills-3" role="tab" aria-controls="v-pills-3"
                                                           aria-selected="false">{FoodType[FoodType.BURGER]}</a>

                                                        <a className="nav-link" id="v-pills-4-tab" data-toggle="pill"
                                                           href="#v-pills-4" role="tab" aria-controls="v-pills-4"
                                                           aria-selected="false">{FoodType[FoodType.PASTA]}</a>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 d-flex align-items-center">

                                                    <div className="tab-content ftco-animate" id="v-pills-tabContent">

                                                        <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel"
                                                             aria-labelledby="v-pills-1-tab">
                                                            <div className="row">

                                                                {
                                                                    this.props.menuItemListState.items.length >= 1 ? this.props.menuItemListState.items.map((value) => {
                                                                        if (value.type.toString() == FoodType[FoodType.PIZZA])
                                                                            return <div className="col-md-4 text-center">
                                                                                <div className="menu-wrap">
                                                                                    <a href="#" className="menu-img img mb-4"
                                                                                       style={{backgroundImage: `url(data:image/jpeg;base64,${value.picJpg})`}}></a>
                                                                                    {/*src={`data:image/jpeg;base64,${this.props.image}`}*/}
                                                                                    <div className="text">
                                                                                        <h3><a href="#">{value.name}</a></h3>
                                                                                        <p>{value.ingredient}</p>
                                                                                        <p className="price"><span>{
                                                                                            Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                                                                                "$ " + value.priceDollor :
                                                                                                "€ " + value.priceEuro
                                                                                        }</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    }): <div/>
                                                                }
                                                                <div className="col-md-4 text-center" style={{textAlign: "center",  margin: "auto", display: "block"}} onClick={() => this.appearMenuItemForm(FoodType.PIZZA)}>
                                                                    <a style={{cursor: "pointer"}}><i className="fas fa-plus fa-5x"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="v-pills-2" role="tabpanel"
                                                             aria-labelledby="v-pills-2-tab">
                                                            <div className="row">

                                                                {
                                                                    this.props.menuItemListState.items.length >= 1 ?this.props.menuItemListState.items.map((value) => {
                                                                        if (value.type.toString() == FoodType[FoodType.DRINK])
                                                                            return <div className="col-md-4 text-center">
                                                                                <div className="menu-wrap">
                                                                                    <a href="#" className="menu-img img mb-4"
                                                                                       style={{backgroundImage: `url(data:image/jpeg;base64,${value.picJpg})`}}></a>
                                                                                    {/*src={`data:image/jpeg;base64,${this.props.image}`}*/}
                                                                                    <div className="text">
                                                                                        <h3><a href="#">{value.name}</a></h3>
                                                                                        <p>{value.ingredient}</p>
                                                                                        <p className="price"><span>{
                                                                                            Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                                                                                "$ " + value.priceDollor :
                                                                                                "€ " + value.priceEuro
                                                                                        }</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                    }): <div/>
                                                                }
                                                                <div className="col-md-4 text-center" style={{textAlign: "center",  margin: "auto", display: "block"}} onClick={() =>this.appearMenuItemForm(FoodType.DRINK)}>
                                                                    <a style={{cursor: "pointer"}}><i className="fas fa-plus fa-5x"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="v-pills-3" role="tabpanel"
                                                             aria-labelledby="v-pills-3-tab">
                                                            <div className="row">
                                                                {
                                                                    this.props.menuItemListState.items.length >= 1 ?this.props.menuItemListState.items.map((value) => {
                                                                        if (value.type.toString() == FoodType[FoodType.PASTA])
                                                                            return <div className="col-md-4 text-center">
                                                                                <div className="menu-wrap">
                                                                                    <a href="#" className="menu-img img mb-4"
                                                                                       style={{backgroundImage: `url(data:image/jpeg;base64,${value.picJpg})`}}></a>
                                                                                    {/*src={`data:image/jpeg;base64,${this.props.image}`}*/}
                                                                                    <div className="text">
                                                                                        <h3><a href="#">{value.name}</a></h3>
                                                                                        <p>{value.ingredient}</p>
                                                                                        <p className="price"><span>{
                                                                                            Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                                                                                "$ " + value.priceDollor :
                                                                                                "€ " + value.priceEuro
                                                                                        }</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                    }): <div/>
                                                                }
                                                                <div className="col-md-4 text-center" style={{textAlign: "center",  margin: "auto", display: "block"}} onClick={() =>this.appearMenuItemForm(FoodType.PASTA)}>
                                                                    <a style={{cursor: "pointer"}}> <i className="fas fa-plus fa-5x"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="v-pills-4" role="tabpanel"
                                                             aria-labelledby="v-pills-4-tab">
                                                            <div className="row">
                                                                {
                                                                    this.props.menuItemListState.items.length >= 1 ? this.props.menuItemListState.items.map((value) => {
                                                                        if (value.type.toString() == FoodType[FoodType.BURGER])
                                                                            return <div className="col-md-4 text-center">
                                                                                <div className="menu-wrap">
                                                                                    <a className="menu-img img mb-4"
                                                                                       style={{backgroundImage: `url(data:image/jpeg;base64,${value.picJpg})`}}></a>
                                                                                    {/*src={`data:image/jpeg;base64,${this.props.image}`}*/}
                                                                                    <div className="text">
                                                                                        <h3><a href="#">{value.name}</a></h3>
                                                                                        <p>{value.ingredient}</p>
                                                                                        <p className="price"><span>{
                                                                                            Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                                                                                "$ " + value.priceDollor :
                                                                                                "€ " + value.priceEuro
                                                                                        }</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    }): <div/>
                                                                }
                                                                <div className="col-md-4 text-center" style={{textAlign: "center",  margin: "auto", display: "block"}} onClick={() =>this.appearMenuItemForm(FoodType.BURGER)}>
                                                                    <a style={{cursor: "pointer"}}><i className="fas fa-plus fa-5x"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                this.state.addMenuItemFormAppear ?
                                    <div>
                                        <div style={{backgroundColor: "gray", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 10}}/>
                                        <div className="alert alert-success" style={{position: "fixed", top: "30%", left: "25%", width: "50%", zIndex: 10}} role="alert">
                                            <h4 className="alert-heading">{FoodType[this.state.foodType]}</h4>
                                            <p>Your order has been done</p>
                                            <hr/>
                                            <p className="mb-0"><button type="button" className="btn btn-secondary" onClick={() => this.setState({addMenuItemFormAppear: false})} >
                                                Redirect to your Home page
                                            </button></p>
                                        </div>
                                    </div>
                                    :
                                    <div/>
                            }
                        </div>

                        :
                        <div/>


                }


                <Footer aboutUsRef={aboutUsRef}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any): AppState => {
    return {
        userState: state.userState,
        authentication: state.authentication,
        cartState: state.cartState,
        customerState: state.customerState,
        managerState: state.managerState,
        menuItemListState: state.menuItemListState,
        pizzariaState: state.pizzariaState,
        localeState: state.localeState,
        orderListState: state.orderListState,
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        updateProfile: () => null,
        switchCurrency: (currency: Currency) => {
            const localState: LocaleState = {
                currency: Currency[currency].toString() == Currency[Currency.DOLLOR] ? Currency.EURO : Currency.DOLLOR
            }

            dispatch({
                type: SWITCH_CURRENCY,
                payload: localState
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(MenuPage)))