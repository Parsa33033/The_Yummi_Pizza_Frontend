import {connect} from "react-redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {WithT} from "i18next";
import * as React from "react";


class ActivationPage extends React.Component<WithTranslation> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <h1>{this.props.t("activation")}</h1>
            </div>
        )
    }
}

export default withTranslation()(ActivationPage)