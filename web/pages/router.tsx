import {BrowserRouter, Redirect, Route, RouteProps, Switch, useLocation} from "react-router-dom";
import React, {useEffect, useLayoutEffect} from "react";
import { headerAreaHeight } from "../common/layout/layout-styles";
import {DownloadPage} from "./download/download-page";
import {HomePage} from "./home/home-page";
import {useTypeDBVersion} from "../state/typedb-version";
import {getTypeDBVersion} from "../api/typedb-service";
import {PrivacyPolicyPage} from "./privacy/privacy-policy-page";
import { SupportPage } from "./support/support-page";
import {TypeDBPage} from "./typedb/typedb-page";
import {Vaticle404Page} from "./error/404-page";
import {TypeDBClusterPage} from "./typedbcluster/typedb-cluster-page";
import { LifeSciencesPage, PrecisionMedicinePage } from "./usecase/use-case-pages";

declare global {
    interface Window {
        _hsq: any[];
    }
}

export const routes = {
    download: "/download",
    home: "/",
    privacyPolicy: "/privacy-policy",
    typeDB: "/typedb",
    typeDBCluster: "/typedb-cluster",
    support: "/support",
    services: "/services",
    useCases: {
        lifeSciences: "/life-sciences",
        precisionMedicine: "/precision-medicine-temp",
    }
}

export const hashRoutes = {
    typeDB: {
        expressivity: `${routes.typeDB}#expressivity`,
        safety: `${routes.typeDB}#safety`,
        inference: `${routes.typeDB}#inference`,
        api: `${routes.typeDB}#api`,
        scale: `${routes.typeDB}#scale`
    },
    typeDBCluster: {
        availability: `${routes.typeDBCluster}#availability`,
        scalability: `${routes.typeDBCluster}#scalability`,
        authentication: `${routes.typeDBCluster}#authentication`,
        encryption: `${routes.typeDBCluster}#encryption`,
        management: `${routes.typeDBCluster}#management`,
        backup: `${routes.typeDBCluster}#backup`,
    }
}

export const legacyRoutes = {
    graknCore: "/grakn-core",
    graknKGMS: "/grakn-kgms",
    deployment: "/deployment", // TODO: When the Cloud page is created, add this legacy route (for redirection)
}

export const VaticleRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <VaticleRoute exact path={routes.download} title="Download" component={DownloadPage}/>
                <VaticleRoute exact path={routes.privacyPolicy} title="Privacy Policy" component={PrivacyPolicyPage}/>
                <VaticleRoute exact path={routes.typeDB} title="TypeDB" component={TypeDBPage}/>
                <VaticleRoute exact path={routes.typeDBCluster} title="TypeDB Cluster" component={TypeDBClusterPage}/>
                <VaticleRoute exact path={routes.support} title="Support" component={SupportPage}/>
                <VaticleRoute exact path={routes.useCases.lifeSciences} title="Life Sciences" component={LifeSciencesPage}/>
                <VaticleRoute exact path={routes.useCases.precisionMedicine} title="Precision Medicine" component={PrecisionMedicinePage}/>
                <VaticleRoute exact path={routes.home} title="Home" component={HomePage}/>

                <Redirect exact path={legacyRoutes.graknCore} to={routes.typeDB}/>
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

    // TODO: While this is technically the optimal way to use a `useState`-like object, it is hardly intuitive
    const setTypeDBVersion = useTypeDBVersion()[1];

    useEffect(() => {
        document.title = `Vaticle | ${props.title}`;

        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });

        // HubSpot tracking code
        if (!window._hsq?.length) window._hsq = [];
        window._hsq.push(["setPath", routerLocation.pathname]);
        window._hsq.push(["trackPageView"]);
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
            const y = target.offsetTop - headerAreaHeight - scrollPaddingTop;
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

    const {title, ...rest} = props;
    return <Route {...rest} />;
};
