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


class CartPage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps> {
    t = this.props.t

    componentWillMount(): void {
        loadScripts()
    }

    switchCurrency = () => {
        this.props.switchCurrency(this.props.localeState.currency)
    }

    addToItemInCart = (orderItemState: OrderItemState) => {
        const cartState: CartState = {
            items:  this.props.cartState.items.map((item) => {
                if (item.menuItem.name == orderItemState.menuItem.name) {
                    if (item.number < 100) {
                        item.number = item.number + 1
                    }
                }
                return item
            })
        }
        this.props.setCartState(cartState)
    }

    deductItemFromCart = (orderItemState: OrderItemState) => {
        const cartState: CartState = {
            items:  this.props.cartState.items.map((item) => {
                if (item.menuItem.name == orderItemState.menuItem.name) {
                    if (item.number > 1) {
                        item.number = item.number - 1
                    }
                }
                return item
            })
        }
        this.props.setCartState(cartState)
    }

    deleteItemFromCart = (orderItemState: OrderItemState) => {
        const cartState: CartState = {
            items:  this.props.cartState.items.filter((item) => item.menuItem.name != orderItemState.menuItem.name)
        }
        this.props.setCartState(cartState)
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

                <Breadcrumb title={"Cart"}/>



                <div className="container" style={{marginTop: 300, marginBottom: 300}}>

                    <div>
                        <i className="fas fa-euro-sign"></i>
                        <div className="switch" style={{margin: 10}}>

                            <label >

                                <input type="checkbox" checked={Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR]} onClick={this.switchCurrency}/>
                                <span className="slider round" ></span>
                            </label>

                        </div>
                        <i className="fas fa-dollar-sign"></i>
                    </div>

                    <div className="card shopping-cart">
                        <div className="card-header bg-dark text-light">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            Shopping Cart
                            {/*<a href="" className="btn btn-outline-info btn-sm pull-right">Continiu shopping</a>*/}
                            <div className="clearfix"></div>
                        </div>
                        <div className="card-body">


                            {/*<div className="row">*/}
                            {/*    <div className="col-12 col-sm-12 col-md-2 text-center">*/}
                            {/*        <img className="img-responsive" src="http://placehold.it/120x80" alt="prewiew"*/}
                            {/*             width="120" height="80"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">*/}
                            {/*        <h4 className="product-name"><strong>Product Name</strong></h4>*/}
                            {/*        <h4>*/}
                            {/*            <small>Product description</small>*/}
                            {/*        </h4>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">*/}
                            {/*        <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{paddingTop: "5px"}}>*/}
                            {/*            <h6><strong>25.00 <span className="text-muted">x</span></strong></h6>*/}
                            {/*        </div>*/}
                            {/*        <div className="col-4 col-sm-4 col-md-4">*/}
                            {/*            <div className="quantity">*/}
                            {/*                <input type="button" value="+" className="plus" style={{zIndex: 1}}/>*/}
                            {/*                    <input type="number" step="1" max="99" min="1" value="1" title="Qty"*/}
                            {/*                           className="qty"*/}
                            {/*                           size={4}/>*/}
                            {/*                        <input type="button" value="-" className="minus" style={{zIndex: 1}}/>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="col-2 col-sm-2 col-md-2 text-right">*/}
                            {/*            <button type="button" className="btn btn-outline-danger btn-xs">*/}
                            {/*                <i className="fa fa-trash" aria-hidden="true"></i>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<hr/>*/}


                            {
                                this.props.cartState.items.length >= 1 ? this.props.cartState.items.map((orderItem) => {
                                    return (
                                        <div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-2 text-center">
                                                    <img className="img-responsive" src={`data:image/jpeg;base64,${orderItem.menuItem.picJpg}`} alt="prewiew"
                                                         width="120" height="80"/>
                                                </div>
                                                <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                                    <h4 className="product-name"><strong>{orderItem.menuItem.name}</strong></h4>
                                                    <h4>
                                                        <small>{orderItem.menuItem.description}</small>
                                                    </h4>
                                                </div>
                                                <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                                    <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{paddingTop: "5px"}}>
                                                        {
                                                            Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                                                <h6> $ <strong>{orderItem.menuItem.priceDollor}</strong></h6>
                                                                :
                                                                <h6> € <strong>{orderItem.menuItem.priceEuro}</strong></h6>
                                                        }
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4">
                                                        <div className="quantity">
                                                            <input type="button" value="+" className="plus" style={{zIndex: 1}} onClick={() => this.addToItemInCart(orderItem)}/>
                                                            <input type="number" step="1" max="99" min="1" value={orderItem.number} title="Qty"
                                                                   className="qty"
                                                                   size={4}/>
                                                            <input type="button" value="-" className="minus" style={{zIndex: 1}}  onClick={() => this.deductItemFromCart(orderItem)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 col-sm-2 col-md-2 text-right">
                                                        <button type="button" className="btn btn-outline-danger btn-xs" onClick={() => this.deleteItemFromCart(orderItem)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                    )
                                }) :
                                    <div/>
                            }

                        </div>
                        <div className="card-footer">

                            <div className="pull-right" style={{margin: "10px"}}>
                                <a  className="btn btn-success pull-right" style={{color: "white"}} onClick={() => this.props.cartState.items.length >= 1 ? this.props.history.push("/checkout") : null}>Checkout</a>
                                <div className="pull-right" style={{margin: "5px"}}>
                                    {
                                        Currency[this.props.localeState.currency].toString() == Currency[Currency.DOLLOR] ?
                                            this.props.cartState.items.length >= 1 ?
                                                <h4 style={{marginRight: 5}}>
                                                    Total price: <b>$ {this.props.cartState.items.map((item) => item.menuItem.priceDollor * item.number).reduce((oldVal, newVal) => oldVal + newVal)}</b>
                                                </h4>
                                                :
                                                <div/>
                                                :
                                            this.props.cartState.items.length >= 1 ?
                                                <h4 style={{marginRight: 5}}>
                                                    Total price: <b>€ {this.props.cartState.items.map((item) => item.menuItem.priceEuro * item.number).reduce((oldVal, newVal) => oldVal + newVal)}</b>
                                                </h4>
                                                :
                                                <div/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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
        localeState: state.localeState,
        orderListState: state.orderListState
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    return {
        updateProfile : () => null,
        switchCurrency: (currency: Currency) => {
            const localState: LocaleState = {
                currency: Currency[currency].toString() == Currency[Currency.DOLLOR] ? Currency.EURO : Currency.DOLLOR
            }

            dispatch({
                type: SWITCH_CURRENCY,
                payload: localState
            })
        },
        setCartState: (cartState: CartState) => {
            dispatch({
                type: SET_CART,
                payload: cartState
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(CartPage)))