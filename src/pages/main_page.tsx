import * as React from "react";
import {WithTranslation, withTranslation} from "react-i18next";
import bg1 from "../assets/images/bg_1.jpg"
import bg1png from "../assets/images/bg_1.png"
import bg2 from "../assets/images/bg_2.jpg"
import bg2png from "../assets/images/bg_2.png"
import bg3 from "../assets/images/bg_3.jpg"
import bg3png from "../assets/images/bg_3.png"
import about_img from "../assets/images/about.jpg"
import pizza1_img from "../assets/images/pizza-1.jpg";
import pizza2_img from "../assets/images/pizza-2.jpg";
import pizza3_img from "../assets/images/pizza-3.jpg";
import pizza4_img from "../assets/images/pizza-4.jpg";
import pizza5_img from "../assets/images/pizza-5.jpg";
import pizza6_img from "../assets/images/pizza-6.jpg";
import pizza7_img from "../assets/images/pizza-7.jpg";
import pizza8_img from "../assets/images/pizza-8.jpg";
import gallery1_img from "../assets/images/gallery-1.jpg";
import gallery2_img from "../assets/images/gallery-2.jpg";
import gallery3_img from "../assets/images/gallery-3.jpg";
import gallery4_img from "../assets/images/gallery-4.jpg";
import drink1_img from "../assets/images/drink-1.jpg";
import drink2_img from "../assets/images/drink-2.jpg";
import drink3_img from "../assets/images/drink-3.jpg";
import burger1_img from "../assets/images/burger-1.jpg";
import burger2_img from "../assets/images/burger-2.jpg";
import burger3_img from "../assets/images/burger-3.jpg";
import pasta1_img from "../assets/images/pasta-1.jpg"
import pasta2_img from "../assets/images/pasta-2.jpg"
import pasta3_img from "../assets/images/pasta-3.jpg"
import img1 from "../assets/images/image_1.jpg"
import img2 from "../assets/images/image_2.jpg"
import img3 from "../assets/images/image_3.jpg"
import Header from "../component/header";
import Footer from "../component/footer";
import Loader from "../component/loader";
import HomeSlider from "../component/home_slider";
import MenuSection from "../component/menu_section";
import {createRef, RefObject} from "react";
import ContactUs from "../component/contact_us";
import Signin from "../component/signin";
import Signup from "../component/signup";

export const menuSectionRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
export const aboutUsRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
export const contactUsRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
export const signinRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
export const signupRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()

class MainPage extends React.Component<WithTranslation> {



    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <Header aboutUsRef={aboutUsRef}
                        contactUsRef={contactUsRef}
                        menuSectionRef={menuSectionRef}
                        signinRef={signinRef}
                        signupRef={signupRef}/>
                {/** END nav  **/}

                <HomeSlider/>

                <section className="ftco-intro">
                    <div className="container-wrap">
                        <div className="wrap d-md-flex">
                            <div className="info">
                                <div className="row no-gutters">
                                    <div className="col-md-4 d-flex ftco-animate">
                                        <div className="icon"><span className="icon-phone"></span></div>
                                        <div className="text">
                                            <h3>000 (123) 456 7890</h3>
                                            <p>A small river named Duden flows</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex ftco-animate">
                                        <div className="icon"><span className="icon-my_location"></span></div>
                                        <div className="text">
                                            <h3>198 West 21th Street</h3>
                                            <p>Suite 721 New York NY 10016</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex ftco-animate">
                                        <div className="icon"><span className="icon-clock-o"></span></div>
                                        <div className="text">
                                            <h3>Open Monday-Friday</h3>
                                            <p>8:00am - 9:00pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="social d-md-flex pl-md-5 p-4 align-items-center">
                                <ul className="social-icon">
                                    <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a>
                                    </li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a>
                                    </li>
                                    <li className="ftco-animate"><a href="#"><span
                                        className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ftco-about d-md-flex">
                    <div className="one-half img" style={{backgroundImage: `url(${about_img})`}}></div>
                    <div className="one-half ftco-animate">
                        <div className="heading-section ftco-animate ">
                            <h2 className="mb-4">Welcome to <span className="flaticon-pizza">Pizza</span> A Restaurant
                            </h2>
                        </div>
                        <div>
                            <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from
                                it would have been rewritten a thousand times and everything that was left from its
                                origin would be the word "and" and the Little Blind Text should turn around and return
                                to its own, safe country. But nothing the copy said could convince her and so it didn’t
                                take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and
                                Parole and dragged her into their agency, where they abused her for their.</p>
                        </div>
                    </div>
                </section>

                <section className="ftco-section ftco-services">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row justify-content-center mb-5 pb-3">
                            <div className="col-md-7 heading-section ftco-animate text-center">
                                <h2 className="mb-4">Our Services</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                    Consonantia, there live the blind texts.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 ftco-animate">
                                <div className="media d-block text-center block-6 services">
                                    <div className="icon d-flex justify-content-center align-items-center mb-5">
                                        <span className="flaticon-diet"></span>
                                    </div>
                                    <div className="media-body">
                                        <h3 className="heading">Healthy Foods</h3>
                                        <p>Even the all-powerful Pointing has no control about the blind texts it is an
                                            almost unorthographic.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 ftco-animate">
                                <div className="media d-block text-center block-6 services">
                                    <div className="icon d-flex justify-content-center align-items-center mb-5">
                                        <span className="flaticon-bicycle"></span>
                                    </div>
                                    <div className="media-body">
                                        <h3 className="heading">Fastest Delivery</h3>
                                        <p>Even the all-powerful Pointing has no control about the blind texts it is an
                                            almost unorthographic.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 ftco-animate">
                                <div className="media d-block text-center block-6 services">
                                    <div className="icon d-flex justify-content-center align-items-center mb-5"><span
                                        className="flaticon-pizza-1"></span></div>
                                    <div className="media-body">
                                        <h3 className="heading">Original Recipes</h3>
                                        <p>Even the all-powerful Pointing has no control about the blind texts it is an
                                            almost unorthographic.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <MenuSection menuSectionRef={menuSectionRef}/>

                <section className="ftco-gallery">
                    <div className="container-wrap">
                        <div className="row no-gutters">
                            <div className="col-md-3 ftco-animate">
                                <a href="gallery.html" className="gallery img d-flex align-items-center"
                                   style={{backgroundImage: `url(${gallery1_img})`}}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-search"></span>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 ftco-animate">
                                <a href="gallery.html" className="gallery img d-flex align-items-center"
                                   style={{backgroundImage: `url(${gallery2_img})`}}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-search"></span>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 ftco-animate">
                                <a href="gallery.html" className="gallery img d-flex align-items-center"
                                   style={{backgroundImage: `url(${gallery3_img})`}}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-search"></span>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3 ftco-animate">
                                <a href="gallery.html" className="gallery img d-flex align-items-center"
                                   style={{backgroundImage: `url(${gallery4_img})`}}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-search"></span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="ftco-counter ftco-bg-dark img" id="section-counter"
                         style={{backgroundImage: `url(${bg2})`}} data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="row">
                                    <div
                                        className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                                        <div className="block-18 text-center">
                                            <div className="text">
                                                <div className="icon"><span className="flaticon-pizza-1"></span></div>
                                                <strong className="number" data-number="100">0</strong>
                                                <span>Pizza Branches</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                                        <div className="block-18 text-center">
                                            <div className="text">
                                                <div className="icon"><span className="flaticon-medal"></span></div>
                                                <strong className="number" data-number="85">0</strong>
                                                <span>Number of Awards</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                                        <div className="block-18 text-center">
                                            <div className="text">
                                                <div className="icon"><span className="flaticon-laugh"></span></div>
                                                <strong className="number" data-number="10567">0</strong>
                                                <span>Happy Customer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                                        <div className="block-18 text-center">
                                            <div className="text">
                                                <div className="icon"><span className="flaticon-chef"></span></div>
                                                <strong className="number" data-number="900">0</strong>
                                                <span>Staff</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>






                <ContactUs contactUsRef={contactUsRef}/>

                {/** footer **/}
                <Footer aboutUsRef={aboutUsRef}/>


                {/** loader **/}
                <Loader/>

                <Signin signinRef={signinRef}/>
                <Signup signupRef={signupRef}/>

            </div>
        );
    }
}

export default withTranslation()(MainPage);