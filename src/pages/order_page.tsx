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
import {CartState, OrderItemState, OrderListState, OrderState} from "../states/order_state";
import {getAllOrders, SET_CART, setOrderDelivered} from "../actions/order_action";
import {order_delivered_url} from "../config/urls";
import {Order} from "../models/order";
import {Authority} from "../models/user";
import {getCustomerOrders} from "../actions/cutomer_action";


class OrderPage extends React.Component<WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps> {
    t = this.props.t

    constructor(props: WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
        super(props);
    }


    componentWillMount = async () => {
        loadScripts()
        window.scrollTo(0, 0)
        if (this.props.userState.authorities.includes(Authority[Authority.ROLE_USER])) {
            await this.props.getCustomerOrders(this.props.authentication.id_token)

        } else {
            await this.props.getAllOrders(this.props.authentication.id_token)
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

                <Breadcrumb title={"Orders"}/>



                {
                    this.props.userState.authorities.includes(Authority[Authority.ROLE_USER]) ?

                        <div className="container" style={{marginTop: 300, marginBottom: 300}}>


                            <div className="card shopping-cart">
                                <div className="card-header bg-dark text-light">
                                    Orders List
                                    {/*<a href="" className="btn btn-outline-info btn-sm pull-right">Continiu shopping</a>*/}
                                    <div className="clearfix"></div>
                                </div>
                                <div className="card-body">


                                    {
                                        this.props.orderListState.orders.length >= 1 ? this.props.orderListState.orders.map((order, index) => {
                                                return (
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-4 col-sm-4 col-md-2 text-center">
                                                                <h6 style={{color: "black"}}>Order Id: {order.id}</h6>
                                                                {order.delivered ? "delivered" : "not delivered"}
                                                            </div>
                                                            <div className="col-8 text-sm-center col-sm-8 text-md-left col-md-10">
                                                                <h4 className="product-name"><strong>Ordered at: {order.date} </strong></h4>
                                                                {
                                                                    order.address != null ?
                                                                        <h4>
                                                                            <small>Address: {order.address.address2}, {order.address.address1}, {order.address.city}, {order.address.state}, {order.address.country}. Phone Number: {order.address.phoneNumber}</small>
                                                                        </h4>
                                                                        : <div/>
                                                                }
                                                                <ul>
                                                                    {
                                                                        order.items.map((orderItem) => {
                                                                            return(
                                                                                <li>
                                                                                    <h6>* {orderItem.menuItem.name} : {orderItem.number} item(s)</h6>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>

                                                        </div>
                                                        <hr/>
                                                    </div>
                                                )
                                            }) :
                                            <div/>
                                    }

                                </div>

                            </div>
                        </div>

                        :

                        <div className="container" style={{marginTop: 300, marginBottom: 300}}>


                            <div className="card shopping-cart">
                                <div className="card-header bg-dark text-light">
                                    Orders List
                                    {/*<a href="" className="btn btn-outline-info btn-sm pull-right">Continiu shopping</a>*/}
                                    <div className="clearfix"></div>
                                </div>
                                <div className="card-body">


                                    {
                                        this.props.orderListState.orders.length >= 1 ? this.props.orderListState.orders.map((order, index) => {
                                                return (
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-4 col-sm-4 col-md-2 text-center">
                                                                <h6 style={{color: "black"}}>Order Id: {order.id}</h6>
                                                                delivered:  <br/> <input className="form-check-input position-static"
                                                                                         type="checkbox" id="blankCheckbox" checked={order.delivered} onClick={() => {
                                                                order.delivered = !order.delivered
                                                                this.props.setOrderDelivered(this.props.authentication.id_token, order, index, this.props.orderListState)
                                                            }}
                                                                                         aria-label="..."/>
                                                            </div>
                                                            <div className="col-8 text-sm-center col-sm-8 text-md-left col-md-10">
                                                                <h4 className="product-name"><strong>Ordered at: {order.date} - by: {order.customerId != null ? "customer id: "  + order.customerId : "not a website user"}</strong></h4>
                                                                {
                                                                    order.address != null ?
                                                                        <h4>
                                                                            <small>Address: {order.address.address2}, {order.address.address1}, {order.address.city}, {order.address.state}, {order.address.country}. Phone Number: {order.address.phoneNumber}</small>
                                                                        </h4>
                                                                        : <div/>
                                                                }
                                                                <ul>
                                                                    {
                                                                        order.items.map((orderItem) => {
                                                                            return(
                                                                                <li>
                                                                                    <h6>* {orderItem.menuItem.name} : {orderItem.number} item(s)</h6>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>

                                                        </div>
                                                        <hr/>
                                                    </div>
                                                )
                                            }) :
                                            <div/>
                                    }

                                </div>

                            </div>
                        </div>
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
        getAllOrders: (jwt: string) => getAllOrders(dispatch, jwt),
        getCustomerOrders: (jwt: string) => getCustomerOrders(dispatch, jwt),
        setOrderDelivered: (jwt: string, order: Order, index: number, orderListState: OrderListState) => setOrderDelivered(dispatch, jwt, order, index, orderListState)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(OrderPage)))