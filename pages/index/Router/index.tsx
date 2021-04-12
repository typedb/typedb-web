import { BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { CloudPage } from "../../cloud/cloud-page";
import { HomePage } from '../../home/home-page';
import { AppProps } from "../App";

interface VaticleRouteProps extends RouteProps {
    title: string;
}

const VaticleRoute: React.FC<VaticleRouteProps> = props => {
    useEffect(() => {
        document.title = `Vaticle | ${props.title}`;
    });

    const { title, ...rest } = props;
    return <Route {...rest} />;
};

interface RouterProps extends AppProps {}

export const Router: React.FC<RouterProps> = ({graknVersion}) => {
    // TODO: It would be nice to standardise loading graknVersion into each page, say by incorporating it into VaticleRoute.
    return (
        <BrowserRouter>
            <Switch>
                <VaticleRoute path="/cloud" title="Cloud" render={() => <CloudPage graknVersion={graknVersion}/>}/>
                <VaticleRoute path="/" title="Home" render={() => <HomePage graknVersion={graknVersion}/>} />
            </Switch>
        </BrowserRouter>
    );
};
