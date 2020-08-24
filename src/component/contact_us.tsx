import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";

interface ContactUsProps {
    contactUsRef: RefObject<HTMLDivElement>
}

class ContactUs extends React.Component<WithTranslation & ContactUsProps> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div ref={this.props.contactUsRef}>

                <section className="ftco-section contact-section">
                    <div className="container mt-5">
                        <div className="row block-9">
                            <div className="col-md-4 contact-info ftco-animate">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <h2 className="h4">Contact Information</h2>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                                        </p>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Website:</span> <a href="#">yoursite.com</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-6 ftco-animate">
                                <form action="#" className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Your Name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Your Email"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Subject"/>
                                    </div>
                                    <div className="form-group">
                                        <textarea name="" id="" cols={30} rows={7} className="form-control"
                                                  placeholder="Message"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withTranslation()(ContactUs);