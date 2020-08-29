import {connect} from "react-redux";
import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {ChangeEvent} from "react";
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
import profileAvatar from "../assets/images/profile.png";
import {Gender} from "../models/gender";
import {MenuItemListState, MenuItemState} from "../states/menu_item_state";
import {MenuItemDTO} from "../dto/menu_item_dto";
import {addMenuItem} from "../actions/manager_action";

interface MenuPageState extends MenuItemState{
    addMenuItemFormAppear: boolean,
    errorMessage: string,
}

class MenuPage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps, MenuPageState> {
    t = this.props.t

    constructor(props: WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
        super(props);
        this.state = {
            addMenuItemFormAppear: false,
            errorMessage: "",
            name: "",
            id: 0,
            priceEuro: 0,
            priceDollor: 0,
            picJpg: "",
            description: "",
            ingredient: "",
            type: FoodType.PIZZA,
            pizzariaId: 0,
            picPngContentType: "",
            picPng: "",
            picJpgContentType: ""
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
            type: foodType
        })
    }

    addMenuItem = async () => {
        if (this.state.priceEuro != 0 && this.state.priceDollor != 0 &&
            this.state.name != "" && this.state.picJpg != "" && this.state.ingredient != "") {
            const menuItem: MenuItemDTO = {
                priceDollor: this.state.priceDollor,
                priceEuro: this.state.priceEuro,
                name: this.state.name,
                ingredient: this.state.ingredient,
                description: this.state.description,
                picJpg: this.state.picJpg,
                picJpgContentType: "image/jpeg",
                picPng: "",
                picPngContentType: "",
                pizzariaId: 1,
                type: this.state.type,
                id: 0,
            }
            var i = await this.props.addMenuItem(this.props.authentication.id_token, menuItem, this.props.menuItemListState)
            alert(i)
            if (i == 1) {
                this.setState({
                    addMenuItemFormAppear: false
                })
            } else {
                this.setState({
                    errorMessage: this.t("failure")
                })
            }
        } else {
            this.setState({
                errorMessage: "please fill in all the inputs!"
            })
        }
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
                    picJpg: btoa(image)
                })
            };
        }
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

                <Breadcrumb title={"Menu Management"}/>


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
                                                           href="#v-pills-1" role="tab" aria-controls="v-pills-1" onClick={() => this.setState({type: FoodType.PIZZA})}
                                                           aria-selected="true">{FoodType[FoodType.PIZZA]}</a>

                                                        <a className="nav-link" id="v-pills-2-tab" data-toggle="pill"
                                                           href="#v-pills-2" role="tab" aria-controls="v-pills-2" onClick={() => this.setState({type: FoodType.DRINK})}
                                                           aria-selected="false">{FoodType[FoodType.DRINK]}</a>

                                                        <a className="nav-link" id="v-pills-3-tab" data-toggle="pill"
                                                           href="#v-pills-3" role="tab" aria-controls="v-pills-3" onClick={() => this.setState({type: FoodType.BURGER})}
                                                           aria-selected="false">{FoodType[FoodType.BURGER]}</a>

                                                        <a className="nav-link" id="v-pills-4-tab" data-toggle="pill"
                                                           href="#v-pills-4" role="tab" aria-controls="v-pills-4" onClick={() => this.setState({type: FoodType.PASTA})}
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
                                                                        if (value.type.toString() == FoodType[FoodType.BURGER])
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
                                                                        if (value.type.toString() == FoodType[FoodType.PASTA])
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
                                        <div style={{backgroundColor: "gray", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 10, margin: "auto"}}/>
                                        <div className="" style={{ backgroundColor: "#c9c4a1", borderRadius: 10, position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 10, width: "75%", height: "75%", margin: "auto"}} role="alert">
                                            <h4 className="" style={{color: "gray", padding: 10}}>Add a {FoodType[this.state.type]}</h4>
                                            <div className="container" style={{zIndex: 10, color: "gray"}}>
                                                <div style={{position: "absolute", top: 10, right: 10}}><a style={{cursor: "pointer"}} onClick={() => this.setState({addMenuItemFormAppear: false})}><i
                                                    className="fas fa-times fa-2x"></i></a></div>
                                                <div className="container bootstrap snippets bootdey">
                                                    <hr/>
                                                    <div className="row">

                                                        <div className="col-md-3">
                                                            <div className="text-center">
                                                                <img style={{height: 100, width: 100}} src={this.state.picJpg != "" && this.state.picJpg != null ? `data:image/jpeg;base64,${this.state.picJpg}`: profileAvatar} className="avatar img-circle" alt="avatar"/>


                                                                <input type="file"  style={{color: "white"}} className="form-control" onChange={this.handleImageChange}/>
                                                            </div>
                                                        </div>


                                                        <div className="col-md-9 personal-info" >

                                                            <div className="form-horizontal" role="form">
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <label className="col-lg-3 control-label" style={{color: "white"}} >Name:</label>
                                                                        <div className="col-lg-8">
                                                                            <input className="form-control" type="text" style={{color: "white"}} value={this.state.name} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                this.setState({name: event.target.value})
                                                                            }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <label className="col-lg-3 control-label" style={{color: "white"}} >Ingredient</label>
                                                                        <div className="col-lg-8">
                                                                            <input className="form-control" type="text"  style={{color: "white"}} value={this.state.ingredient} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                this.setState({ingredient: event.target.value})
                                                                            }}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <label className="col-lg-3 control-label" style={{color: "white"}} >Price in Dollor:</label>
                                                                        <div className="col-lg-8">
                                                                            <input className="form-control" type="number" style={{color: "white"}}  value={this.state.priceDollor} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                this.setState({priceDollor: Number(event.target.value)})
                                                                            }}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <label className="col-lg-3 control-label" style={{color: "white"}} >Price in Dollor:</label>
                                                                        <div className="col-lg-8">
                                                                            <input className="form-control" type="number"  style={{color: "white"}} value={this.state.priceEuro} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                this.setState({priceEuro: Number(event.target.value)})
                                                                            }}/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h6 style={{color: "red"}}>{this.state.errorMessage}</h6>
                                                                <button type="button" className="btn btn-secondary" style={{margin: 40, width: 200, height: 40, color: "white"}} onClick={this.addMenuItem} >Add Menu Item</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
        addMenuItem: (jwt: string, menuItem: MenuItemDTO, menuItemListState: MenuItemListState) => addMenuItem(dispatch, jwt, menuItem, menuItemListState)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(MenuPage)))