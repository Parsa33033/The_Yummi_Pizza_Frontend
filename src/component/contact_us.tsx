import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import {sendCustomerMessage} from "../actions/cutomer_action";
import {ChangeEvent} from "react";
import validator from "validator";
import {CustomerMessageDTO} from "../dto/customer_message_dto";
import {AppState} from "../states/app_state";
import {connect} from "react-redux";

interface ContactUsProps {
    contactUsRef: RefObject<HTMLDivElement>
}

interface ContactUsState {
    name: string,
    email: string,
    subject: string,
    message: string,
    errorMessage: string,
}

class ContactUs extends React.Component<WithTranslation & ContactUsProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>, ContactUsState> {
    t = this.props.t

    constructor(props: WithTranslation & ContactUsProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
        super(props)

        this.state = {
            name: "",
            email: "",
            message: "",
            subject: "",
            errorMessage: "",
        }
    }

    sendMessage = async () => {
        if (this.state.name != "" || this.state.subject != "" || this.state.message != "") {
            if (validator.isEmail(this.state.email)) {
                const message: CustomerMessageDTO = {
                    email: this.state.email,
                    id: 0,
                    message: this.state.message,
                    name: this.state.name,
                    subject: this.state.subject
                }
                var i = await sendCustomerMessage(message)
                if (i == 1) {
                    this.setState({
                        errorMessage: this.t("message.sent"),
                        name: "",
                        subject: "",
                        message: "",
                        email: "",
                    })
                    return this.t("success")
                } else {
                    return this.t("failure")
                }
            } else {
                this.setState({
                    errorMessage: this.t("message.email-invalid")
                })
            }
        } else {
            this.setState({
                errorMessage: this.t("message.fill")
            })
        }
    }

    setNameState = (name: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: name.target.value
        })
    }

    setEmailState = (email: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: email.target.value
        })
    }

    setSubjectState = (subject: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            subject: subject.target.value
        })
    }

    setMessageState = (message: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            message: message.target.value
        })
    }

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
                                        <p><span>Address:</span> {this.props.pizzariaState.address.address2}, {this.props.pizzariaState.address.address1}, {this.props.pizzariaState.address.city}, {this.props.pizzariaState.address.state}, {this.props.pizzariaState.address.country}</p>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Phone:</span> <a href="tel://1234567920">{this.props.pizzariaState.address.phoneNumber}</a></p>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p><span>Email:</span> <a href="mailto:info@yoursite.com">{this.props.pizzariaState.email}</a>
                                        </p>
                                    </div>
                                    {/*<div className="col-md-12 mb-3">*/}
                                    {/*    <p><span>Website:</span> <a href="#">yoursite.com</a></p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-6 ftco-animate">
                                <div className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Your Name" value={this.state.name} onChange={this.setNameState}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Your Email" value={this.state.email} onChange={this.setEmailState}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Subject" value={this.state.subject} onChange={this.setSubjectState}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea name="" id="" cols={30} rows={7} className="form-control"
                                                  placeholder="Message" value={this.state.message} onChange={this.setMessageState}></textarea>
                                    </div>
                                    <h5 style={{color: "red"}}>{this.state.errorMessage}</h5>
                                    <div className="form-group">
                                        <button  className="btn btn-primary py-3 px-5"  onClick={this.sendMessage}>Send Message</button>
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

const mapDispatchToProps = () => {
    return {
        doNone: () => {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContactUs))