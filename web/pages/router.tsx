import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import { DownloadPage } from "./download/download-page";
import { HomePage } from "./home/home-page";
import { useTypeDBVersion } from "./state/typedb-version";
import { getTypeDBVersion } from "./api/typedb-service";
import { PrivacyPolicyPage } from "./legal/privacy-policy-page";
import { headerHeight } from "../common/layout/layout-styles";

interface VaticleRouteProps extends RouteProps {
    title: string;
}

const VaticleRoute: React.FC<VaticleRouteProps> = props => {

    // All effects placed here will be executed on every route change

    useEffect(() => {
        document.title = `Vaticle | ${props.title}`;
    });

    useLayoutEffect(() => {
        if (window.location.hash) {
            const y = (document.querySelector(window.location.hash) as HTMLElement)?.offsetTop - headerHeight;
            window.scrollTo(0, y);
        } else {
            window.scrollTo(0, 0);
        }
    });

    // TODO: While this is technically the optimal way to use a `useState`-like object, it is hardly intuitive
    const setTypeDBVersion = useTypeDBVersion()[1];
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });
    });

    const { title, ...rest } = props;
    return <Route exact {...rest} />;
};

export const routes = {
    download: "/download",
    home: "/",
    privacyPolicy: "/privacy-policy",
};

export const VaticleRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <VaticleRoute path={routes.download} title="Download" component={DownloadPage}/>
                <VaticleRoute path={routes.privacyPolicy} title="Privacy Policy" component={PrivacyPolicyPage}/>
                <VaticleRoute path={routes.home} title="Home" component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
};
