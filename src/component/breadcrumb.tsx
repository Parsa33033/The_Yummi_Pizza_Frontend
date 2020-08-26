import * as React from "react";
import bg1 from "../assets/images/bg_1.jpg";
import bg3 from "../assets/images/bg_3.jpg";
import {WithTranslation, withTranslation} from "react-i18next";

interface BreadcrumbProps {
    title: string
}

class Breadcrumb extends React.Component<WithTranslation &  BreadcrumbProps> {
    t = this.props.t
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <section className="home-slider owl-carousel img" style={{backgroundImage: `url(${bg1})`}}>

                    <div className="slider-item" style={{backgroundImage: `url(${bg3})`}}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center">

                                <div className="col-md-7 col-sm-12 text-center ftco-animate">
                                    <h1 className="mb-3 mt-5 bread">{this.props.title}</h1>
                                    <p className="breadcrumbs"><span className="mr-2"><a
                                        href="/">Home</a></span> <span>{this.props.title}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withTranslation()(Breadcrumb);