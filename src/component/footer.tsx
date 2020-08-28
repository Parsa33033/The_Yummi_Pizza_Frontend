import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import img1 from "../assets/images/image_1.jpg";
import img2 from "../assets/images/image_2.jpg";
import {RefObject} from "react";
import {connect} from "react-redux";
import {AppState} from "../states/app_state";

interface FooterProps {
    aboutUsRef: RefObject<HTMLDivElement>
}

class Footer extends React.Component<WithTranslation & FooterProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div ref={this.props.aboutUsRef}>
                <footer className="ftco-footer ftco-section img">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-lg-4 col-md-6 mb-5 mb-md-5">
                                <a className="navbar-brand" href="index.html"><span className="flaticon-pizza-1 mr-1"></span>The Yummi<br/>
                                    <small>Pizza</small></a>
                                <div>
                                    <ul className="ftco-footer-social list-unstyled  mt-5 ">
                                        <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a>
                                        </li>
                                        <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a>
                                        </li>
                                        <li className="ftco-animate"><a href="#"><span
                                            className="icon-instagram"></span></a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-5 mb-md-5">
                                <div className="ftco-footer-widget mb-4">
                                    <h2 className="ftco-heading-2">About Us</h2>
                                    <p>{this.props.pizzariaState.aboutus}</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-5 mb-md-5">
                                <div className="ftco-footer-widget mb-4">
                                    <h2 className="ftco-heading-2">Have Questions?</h2>
                                    <div className="block-23 mb-3">
                                        <ul>
                                            <li><span className="icon icon-map-marker"></span><span className="text">
                                                 {this.props.pizzariaState.address.address2}, {this.props.pizzariaState.address.address1}, {this.props.pizzariaState.address.city}, {this.props.pizzariaState.address.state}, {this.props.pizzariaState.address.country}</span>
                                            </li>
                                            <li><a href="#"><span className="icon icon-phone"></span><span
                                                className="text">{this.props.pizzariaState.address.phoneNumber}</span></a></li>
                                            <li><a href="#"><span className="icon icon-envelope"></span><span
                                                className="text">{this.props.pizzariaState.email}</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">

                                <p>{/** Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. **/}
                                    Copyright &copy;
                                    All rights reserved | Developed by parsa heidary moghadam
                                    {/** Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. **/}
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
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

const mapDispatchToProps = () => {
    return {
        doNone: () => {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Footer))