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
import {ChangeEvent} from "react";
import {OrderDTO} from "../dto/order_dto";
import {order, SET_CART} from "../actions/order_action";
import {AddressDTO} from "../dto/address_dto";
import {CartState} from "../states/order_state";

interface CheckoutPageState {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    country: string,
    state: string,
    city: string,
    address1: string,
    address2: string,
    errorMessage: string,
    done: boolean
}



class CheckoutPage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps, CheckoutPageState> {
    t = this.props.t
    customer = this.props.customerState
    totalPrice = this.props.cartState.items.length >= 1 ? this.props.cartState.items.map((item) => item.menuItem.priceEuro * item.number).reduce((oldVal, newVal) => oldVal + newVal) : 0

    constructor(props: WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
        super(props);
        this.state = {
            firstName: this.customer.firstName,
            lastName: this.customer.lastName,
            email: this.customer.email,
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

    order = async () => {
        if (this.props.cartState.items.length >= 1) {
            const address: AddressDTO = {
                phoneNumber: this.state.phoneNumber,
                country: this.state.country,
                city: this.state.city,
                address2: this.state.address2,
                address1: this.state.address1,
                state: this.state.state,
                id: -1,
            }
            const orderDTO: OrderDTO = {
                pizzariaId: 1,
                totalPrice: this.totalPrice,
                paidIn: this.props.localeState.currency,
                id: -1,
                delivered: false,
                date: new Date(Date.now()),
                customerId: this.customer.id,
                addressId: -1,
                address: address,
                items: this.props.cartState.items
            }
            var i = await this.props.order(orderDTO)
            if (i == 1) {
                this.setState({
                    errorMessage: "",
                    done: true,
                })
                const emptyCart: CartState = {
                    items: []
                }
                this.props.emptyCart(emptyCart)
            } else {
                this.setState({
                    errorMessage: "failure"
                })
            }
        }
    }

    switchCurrency = () => {
        this.props.switchCurrency(this.props.localeState.currency)
    }


    handleFirstName = (firstName: ChangeEvent<HTMLInputElement>) => {
        this.setState({firstName: firstName.target.value});
    }

    handleLastName = (lastName: ChangeEvent<HTMLInputElement>) => {
        this.setState({lastName: lastName.target.value});
    }

    handleEmail = (email: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: email.target.value});
    }

    handleCountry = (country: ChangeEvent<HTMLInputElement>) => {
        this.setState({country: country.target.value});
    }

    handleState = (state: ChangeEvent<HTMLInputElement>) => {
        this.setState({state: state.target.value});
    }

    handleCity = (city: ChangeEvent<HTMLInputElement>) => {
        this.setState({city: city.target.value});
    }

    handleAddress1 = (address1: ChangeEvent<HTMLInputElement>) => {
        this.setState({address1: address1.target.value});
    }

    handleAddress2 = (address2: ChangeEvent<HTMLInputElement>) => {
        this.setState({address2: address2.target.value});
    }

    handlePhoneNumber = (phoneNumber: ChangeEvent<HTMLInputElement>) => {
        this.setState({phoneNumber: phoneNumber.target.value});
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

                <Breadcrumb title={"Checkout"}/>

                <div className="container">
                    <div className="py-5 text-center">
                            <h2>Checkout form</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            {/*<h4 className="d-flex justify-content-between align-items-center mb-3">*/}
                            {/*    <span className="text-muted">Your cart</span>*/}
                            {/*    <span className="badge badge-secondary badge-pill">3</span>*/}
                            {/*</h4>*/}
                            <ul className="list-group mb-3">

                                {
                                    this.props.cartState.items.map((item) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <div>
                                                    <h6 className="my-0">{item.menuItem.name}</h6>
                                                    <small className="text-muted float-left">Number: {item.number}</small>
                                                </div>
                                                <span className="text-muted">{Currency[this.props.localeState.currency] == Currency[Currency.DOLLOR] ? <small>$</small> : <small>€</small>} {item.number * (Currency[this.props.localeState.currency] == Currency[Currency.DOLLOR] ? item.menuItem.priceDollor : item.menuItem.priceEuro)}</span>
                                            </li>
                                        )
                                    })
                                }
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total </span>
                                    {
                                        this.props.cartState.items.length >= 1 ?
                                            <strong>{Currency[this.props.localeState.currency] == Currency[Currency.DOLLOR] ? <small>$</small> : <small>€</small>} {this.totalPrice}</strong>
                                            :
                                            <div/>
                                    }
                                </li>
                            </ul>

                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className=" float-left" htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder=""
                                               value={this.state.firstName} required={true} onChange={this.handleFirstName}/>
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className=" float-left"  htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder=""
                                               value={this.state.lastName} required={true} onChange={this.handleLastName} />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input style={{paddingLeft: 8}} type="text" className="form-control" id="email" placeholder=""
                                               required={true}  value={this.state.email} onChange={this.handleEmail}/>
                                            <div className="invalid-feedback" style={{width: "100%"}}>
                                                Your username is required.
                                            </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="phone-number">Phone Number</label>
                                    <input type="text" className="form-control" id="phone-number" placeholder=""
                                           required={true} value={this.state.phoneNumber} onChange={this.handlePhoneNumber}/>
                                    <div className="invalid-feedback">
                                        Please enter your phone number.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="country">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder=""
                                           required={true}  value={this.state.country} onChange={this.handleCountry}/>
                                    <div className="invalid-feedback">
                                        Please enter your country.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="state">State</label>
                                    <input type="text" className="form-control" id="state" placeholder=""
                                           required={true} value={this.state.state} onChange={this.handleState}/>
                                    <div className="invalid-feedback">
                                        Please enter your state.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="city">City</label>
                                    <input type="text" className="form-control" id="city" placeholder=""
                                           required={true}  value={this.state.city} onChange={this.handleCity}/>
                                    <div className="invalid-feedback">
                                        Please enter your city.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="address1">Address 1</label>
                                    <input type="text" className="form-control" id="address1" placeholder=""
                                           required={true}  value={this.state.address1} onChange={this.handleAddress1}/>
                                        <div className="invalid-feedback">
                                            Please enter your address.
                                        </div>
                                </div>

                                <div className="mb-3">
                                    <label className=" float-left" htmlFor="address2">Address 2</label>
                                    <input type="text" className="form-control" id="address2" placeholder=""
                                           required={true} value={this.state.address2} onChange={this.handleAddress2}/>
                                    <div className="invalid-feedback">
                                        Please enter your address.
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-md-3 mb-3">
                                        <label className=" float-left" htmlFor="zip">Zip</label>
                                        <input type="text" className="form-control" id="zip" placeholder="" required={true}/>
                                            <div className="invalid-feedback">
                                                Zip code required.
                                            </div>
                                    </div>
                                </div>
                                <hr className="mb-4"/>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="same-address"/>
                                            <label className="custom-control-label" htmlFor="same-address">Shipping
                                                address is the same as my billing address</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="save-info"/>
                                            <label className="custom-control-label" htmlFor="save-info">Save this
                                                information for next time</label>
                                    </div>
                                    <hr className="mb-4"/>

                                        <h4 className="mb-3">Payment</h4>

                                        <div className="d-block my-3">
                                            <div className="custom-control custom-radio">
                                                <input id="credit" name="paymentMethod" type="radio"
                                                       className="custom-control-input" checked={false} required={true}/>
                                                    <label className="custom-control-label" htmlFor="credit">Credit
                                                        card</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input id="debit" name="paymentMethod" type="radio"
                                                       className="custom-control-input" required={true}/>
                                                    <label className="custom-control-label" htmlFor="debit">Debit
                                                        card</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input id="paypal" name="paymentMethod" type="radio"
                                                       className="custom-control-input" required={true}/>
                                                    <label className="custom-control-label"
                                                           htmlFor="paypal">Paypal</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cc-name">Name on card</label>
                                                <input type="text" className="form-control" id="cc-name" placeholder=""
                                                       required={true}/>
                                                    <small className="text-muted">Full name as displayed on card</small>
                                                    <div className="invalid-feedback">
                                                        Name on card is required
                                                    </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cc-number">Credit card number</label>
                                                <input type="text" className="form-control" id="cc-number"
                                                       placeholder="" required={true}/>
                                                    <div className="invalid-feedback">
                                                        Credit card number is required
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="cc-expiration">Expiration</label>
                                                <input type="text" className="form-control" id="cc-expiration"
                                                       placeholder="" required={true}/>
                                                    <div className="invalid-feedback">
                                                        Expiration date required
                                                    </div>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="cc-expiration">CVV</label>
                                                <input type="text" className="form-control" id="cc-cvv" placeholder=""
                                                       required={true}/>
                                                    <div className="invalid-feedback">
                                                        Security code required
                                                    </div>
                                            </div>
                                        </div>

                            </form>
                            <hr className="mb-4"/>
                            <h4 style={{color: "red"}}>{this.state.errorMessage}</h4>
                            <button className="btn btn-primary btn-lg btn-block" data-toggle="modal" onClick={this.order}>Continue
                                Order
                            </button>

                            <br/><br/><br/>
                        </div>
                    </div>

                </div>

                {
                    this.state.done ?
                        <div>
                            <div style={{backgroundColor: "gray", opacity: 0.7, position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 10}}/>
                            <div className="alert alert-success" style={{position: "fixed", top: "30%", left: "25%", width: "50%", zIndex: 10}} role="alert">
                                <h4 className="alert-heading">Well done!</h4>
                                <p>Your order has been done</p>
                                <hr/>
                                <p className="mb-0"><button type="button" className="btn btn-secondary" onClick={() => this.props.history.replace("/")} >
                                    Redirect to your Home page
                                </button></p>
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
        order: (orderDTO: OrderDTO) => order(orderDTO),
        emptyCart: (cartState: CartState) => {
            dispatch({
                type: SET_CART,
                payload: cartState
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(CheckoutPage)))