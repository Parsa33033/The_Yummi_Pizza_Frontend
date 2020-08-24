import {withTranslation, WithTranslation} from "react-i18next";
import * as React from "react";
import bg1 from "../assets/images/bg_1.jpg";
import bg1png from "../assets/images/bg_1.png";
import bg2png from "../assets/images/bg_2.png";
import bg3 from "../assets/images/bg_3.jpg";


class HomeSlider extends React.Component<WithTranslation> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <section className="home-slider owl-carousel img" style={{backgroundImage: `url(${bg1})`}}>
                    <div className="slider-item">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text align-items-center" data-scrollax-parent="true">

                                <div className="col-md-6 col-sm-12 ftco-animate">
                                    <span className="subheading">Delicious</span>
                                    <h1 className="mb-4">Italian Cuizine</h1>
                                    <p className="mb-4 mb-md-5">A small river named Duden flows by their place and
                                        supplies it with the necessary regelialia.</p>
                                    <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</a> <a
                                        href="#" className="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">View
                                        Menu</a></p>
                                </div>
                                <div className="col-md-6 ftco-animate">
                                    <img src={bg1png} className="img-fluid" alt=""/>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="slider-item">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text align-items-center" data-scrollax-parent="true">

                                <div className="col-md-6 col-sm-12 order-md-last ftco-animate">
                                    <span className="subheading">Crunchy</span>
                                    <h1 className="mb-4">Italian Pizza</h1>
                                    <p className="mb-4 mb-md-5">A small river named Duden flows by their place and
                                        supplies it with the necessary regelialia.</p>
                                    <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</a> <a
                                        href="#" className="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">View
                                        Menu</a></p>
                                </div>
                                <div className="col-md-6 ftco-animate">
                                    <img src={bg2png} className="img-fluid" alt=""/>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="slider-item" style={{backgroundImage: `url(${bg3})`}}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center"
                                 data-scrollax-parent="true">

                                <div className="col-md-7 col-sm-12 text-center ftco-animate">
                                    <span className="subheading">Welcome</span>
                                    <h1 className="mb-4">We cooked your desired Pizza Recipe</h1>
                                    <p className="mb-4 mb-md-5">A small river named Duden flows by their place and
                                        supplies it with the necessary regelialia.</p>
                                    <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</a> <a
                                        href="#" className="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">View
                                        Menu</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withTranslation()(HomeSlider);