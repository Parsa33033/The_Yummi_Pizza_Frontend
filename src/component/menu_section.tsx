import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import about_img from "../assets/images/about.jpg";
import {FoodType} from "../models/menu_item";
import {AppState} from "../states/app_state";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "../actions/app_action";
import {getPizzaria} from "../actions/pizzaria_actions";
import {ADD_TO_CART, getMenuItemList} from "../actions/order_action";
import {connect} from "react-redux";
import {Currency, LocaleState} from "../states/locale_state";
import {SWITCH_CURRENCY} from "../actions/locale_action";
import {OrderItem} from "../models/order_item";
import {CartState, OrderItemState} from "../states/order_state";
import {MenuItemState} from "../states/menu_item_state";

interface MenuSectionProps {
    menuSectionRef: RefObject<HTMLDivElement>
}

class MenuSection extends React.Component<WithTranslation & MenuSectionProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {

    switchCurrency = () => {
        this.props.switchCurrency(this.props.localeState.currency)
    }

    addToCart = (menuItem: MenuItemState) => {
        const item: OrderItemState = {
            menuItem: menuItem,
            number: 1,
            orderId: -1,
            menuItemId: -1,
            id: -1
        }
        const orderItemState: OrderItemState[] = this.props.cartState.items
        var found = false
        orderItemState.forEach((val) => {
            if (val.menuItem.name == menuItem.name) {
                val.number = val.number + 1
                found = true
                return
            }
        })
        if (found == false) {
            orderItemState.push(item)
        }
        this.props.addToCart(orderItemState)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div ref={this.props.menuSectionRef}>

                {/*<section className="ftco-section">*/}

                {/*    /!*<div className="container">*!/*/}
                {/*    /!*    <div className="row justify-content-center mb-5 pb-3">*!/*/}
                {/*    /!*        <div className="col-md-7 heading-section ftco-animate text-center">*!/*/}
                {/*    /!*            <h2 className="mb-4">Hot Pizza Meals</h2>*!/*/}
                {/*    /!*            /!*<p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*!/*/}
                {/*    /!*            /!*    Consonantia, there live the blind texts.</p>*!/*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className="container-wrap">*!/*/}
                {/*    /!*    <div className="row no-gutters d-flex">*!/*/}
                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img" style={{backgroundImage: `url(${pizza1_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>Italian Pizza</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia </p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img" style={{backgroundImage: `url(${pizza2_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>Greek Pizza</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia</p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img" style={{backgroundImage: `url(${pizza3_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>Caucasian Pizza</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia</p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}

                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img order-lg-last"*!/*/}
                {/*    /!*                   style={{backgroundImage: `url(${pizza4_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>American Pizza</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia </p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img order-lg-last"*!/*/}
                {/*    /!*                   style={{backgroundImage: `url(${pizza5_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>Tomatoe Pie</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia</p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="col-lg-4 d-flex ftco-animate">*!/*/}
                {/*    /!*            <div className="services-wrap d-flex">*!/*/}
                {/*    /!*                <a href="#" className="img order-lg-last"*!/*/}
                {/*    /!*                   style={{backgroundImage: `url(${pizza6_img})`}}></a>*!/*/}
                {/*    /!*                <div className="text p-4">*!/*/}
                {/*    /!*                    <h3>Margherita</h3>*!/*/}
                {/*    /!*                    <p>Far far away, behind the word mountains, far from the countries Vokalia and*!/*/}
                {/*    /!*                        Consonantia</p>*!/*/}
                {/*    /!*                    <p className="price"><span>$2.90</span> <a href="#"*!/*/}
                {/*    /!*                                                               className="ml-2 btn btn-white btn-outline-white">Order</a>*!/*/}
                {/*    /!*                    </p>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </div>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*    <div className="container">*/}
                {/*        <div className="row justify-content-center mb-5 pb-3 mt-5 pt-5">*/}
                {/*            <div className="col-md-7 heading-section text-center ftco-animate">*/}
                {/*                <h2 className="mb-4">Our Menu Pricing</h2>*/}
                {/*                <p className="flip"><span className="deg1"></span><span className="deg2"></span><span*/}
                {/*                    className="deg3"></span></p>*/}
                {/*                <p className="mt-5">Far far away, behind the word mountains, far from the countries*/}
                {/*                    Vokalia and Consonantia, there live the blind texts.</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}


                {/*        <div className="row">*/}
                {/*            <div className="col-md-12">*/}
                {/*                <div className="pricing-entry d-flex ftco-animate">*/}
                {/*                    <div>*/}

                {/*            {*/}
                {/*                this.props.menuItemListState.items.map((pizza) => {*/}
                {/*                    return (*/}


                {/*                        <div>*/}
                {/*                            <div className="img"  style={{backgroundImage: `url(data:image/jpeg;base64,${pizza.picJpg})`}}></div>*/}
                {/*                            <div className="desc pl-3">*/}
                {/*                                <div className="d-flex text align-items-center">*/}
                {/*                                    <h3><span>dsf</span></h3>*/}
                {/*                                    <span className="price">asdf</span>*/}
                {/*                                </div>*/}
                {/*                                <div className="d-block">*/}
                {/*                                    <p>asdf</p>*/}
                {/*                                </div>*/}

                {/*                            </div>*/}
                {/*                        </div>*/}

                {/*                    )*/}
                {/*                })*/}
                {/*            }*/}

                {/*                        </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}



                <div className="row justify-content-center mb-5 pb-3 mt-5 pt-5">
                    <div className="col-md-7 heading-section text-center ftco-animate">
                        <h2 className="mb-4">Our Menu Pricing</h2>
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
                                                                            <p><a onClick={() => this.addToCart(value)}
                                                                                  className="btn btn-white btn-outline-white">Add to
                                                                                cart</a></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }): <div/>
                                                    }

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
                                                                            <p><a onClick={() => this.addToCart(value)}
                                                                                  className="btn btn-white btn-outline-white">Add to
                                                                                cart</a></p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                        }): <div/>
                                                    }
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
                                                                            <p><a onClick={() => this.addToCart(value)}
                                                                                  className="btn btn-white btn-outline-white">Add to
                                                                                cart</a></p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                        }): <div/>
                                                    }
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
                                                                            <p><a onClick={() => this.addToCart(value)}
                                                                                  className="btn btn-white btn-outline-white" >Add to
                                                                                cart</a></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }): <div/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
        getPizzaria : () => getPizzaria(dispatch),
        getMenuItemList: () => getMenuItemList(dispatch),
        switchCurrency: (currency: Currency) => {
            const localState: LocaleState = {
                currency: Currency[currency].toString() == Currency[Currency.DOLLOR] ? Currency.EURO : Currency.DOLLOR
            }

            dispatch({
                type: SWITCH_CURRENCY,
                payload: localState
            })
        },
        addToCart: (items: OrderItemState[]) => {
            const cartState: CartState = {
                items: items
            }
            dispatch({
                type: ADD_TO_CART,
                payload: cartState
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MenuSection));
