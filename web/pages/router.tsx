import { BrowserRouter, Route, RouteProps, Switch, useLocation } from "react-router-dom";
import React, { useEffect, Fragment, useLayoutEffect } from "react";
import { DownloadPage } from "./download/download-page";
import { HomePage } from "./home/home-page";

interface VaticleRouteProps extends RouteProps {
    title: string;
}

const VaticleRoute: React.FC<VaticleRouteProps> = props => {
    useEffect(() => {
        document.title = `Vaticle | ${props.title}`;
    });

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const { title, ...rest } = props;
    return <Route {...rest} />;
};

export const VaticleRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <ScrollToTop/>
                <Switch>
                    <VaticleRoute path="/download" title="Download" component={DownloadPage}/>
                    <VaticleRoute path="/" title="Home" component={HomePage} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
