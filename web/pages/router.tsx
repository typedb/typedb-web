import {BrowserRouter, Route, RouteProps, Switch, useLocation, Redirect} from "react-router-dom";
import React, {useEffect, useLayoutEffect} from "react";
import {DownloadPage} from "./download/download-page";
import {HomePage} from "./home/home-page";
import {useTypeDBVersion} from "../state/typedb-version";
import {getTypeDBVersion} from "../api/typedb-service";
import {PrivacyPolicyPage} from "./privacy/privacy-policy-page";
import {headerHeight} from "../common/layout/layout-styles";
import {TypeDBPage} from "./typedb/typedb-page";
import { Vaticle404Page } from "./error/404-page";
import { TypeDBClusterPage } from "./typedbcluster/typedb-cluster-page";

export const routes = {
    download: "/download",
    home: "/",
    privacyPolicy: "/privacy-policy",
    typeDBCluster: "/typedb-cluster",
    typeDB : {
        page: "/typedb",
        expressivity: "/typedb#expressivity",
        safety: "/typedb#safety",
        inference: "typedb#inference",
        api: "/typedb#api",
        scale: "typedb#scale"
    }
};

export const legacyRoutes = {
    graknCore: "/grakn-core",
    graknKGMS: "/grakn-kgms",
    deployment: "/deployment", // TODO: When the Cloud page is created, add this legacy route (for redirection)
};

export const VaticleRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <VaticleRoute exact path={routes.download} title="Download" component={DownloadPage}/>
                <VaticleRoute exact path={routes.privacyPolicy} title="Privacy Policy" component={PrivacyPolicyPage}/>
                <VaticleRoute exact path={routes.typeDB.page} title="TypeDB" component={TypeDBPage}/>
                <VaticleRoute exact path={routes.typeDBCluster} title="TypeDB Cluster" component={TypeDBClusterPage}/>
                <VaticleRoute exact path={routes.home} title="Home" component={HomePage}/>

                <Redirect exact path={legacyRoutes.graknCore} to={routes.typeDB.page}/>
                <Redirect exact path={legacyRoutes.graknKGMS} to={routes.typeDBCluster}/>

                <VaticleRoute title="404" component={Vaticle404Page}/>
            </Switch>
        </BrowserRouter>
    );
};

interface VaticleRouteProps extends RouteProps {
    title: string;
}

const VaticleRoute: React.FC<VaticleRouteProps> = props => {
    const routerLocation = useLocation<{ samePageNavigation?: boolean, scroll?: boolean }>();

    // All effects placed here will be executed on every route change

    useEffect(() => {
        document.title = `Vaticle | ${props.title}`;
    });

    useLayoutEffect(() => {
        if (routerLocation.state?.scroll === false) return;

        if (routerLocation.hash) {
            const target = document.querySelector(routerLocation.hash) as HTMLElement;
            if (!target) {
                console.warn(`Attempted navigation to ${routerLocation.hash}, but no element could be found matching this ID!`);
                return;
            }
            const scrollPaddingTopRaw = target.getAttribute("scroll-padding-top");
            const scrollPaddingTop = scrollPaddingTopRaw ? parseFloat(scrollPaddingTopRaw) : 0;
            const y = target.offsetTop - headerHeight - scrollPaddingTop;
            // TODO: This isn't quite right - samePageNavigation may have the wrong value if navigating using the Back button
            setTimeout(() => {
                if (routerLocation.state?.samePageNavigation)
                    window.scrollTo({left: 0, top: y, behavior: "smooth"});
                else window.scrollTo(0, y);
            }, 1); // setTimeout used to make scroll resolve after browser's default hash link handler (Safari)
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

    const {title, ...rest} = props;
    return <Route {...rest} />;
};
