import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";

interface HeaderProps {
    menuSectionRef: RefObject<HTMLDivElement>,
    aboutUsRef: RefObject<HTMLDivElement>,
    contactUsRef: RefObject<HTMLDivElement>
}

class Header extends React.Component<WithTranslation & HeaderProps> {

    slideToMenuSection = () => {
        if (this.props.menuSectionRef.current)
            this.props.menuSectionRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToContactUs = () => {
        if (this.props.contactUsRef.current)
            this.props.contactUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToAboutUs = () => {
        if (this.props.aboutUsRef.current)
            this.props.aboutUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                     id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html"><span className="flaticon-pizza-1 mr-1"></span>Pizza<br/>
                            <small>Delicous</small></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><a style={{cursor: "pointer"}} href="/" className="nav-link">Home</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToMenuSection}>Menu</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToAboutUs}>About</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToContactUs}>Contact</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToContactUs}><i
                                    className="fas fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withTranslation()(Header)