import { BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { CloudPage } from "../../cloud/cloud-page";
import { HomePage } from '../../home/home-page';

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

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <VaticleRoute path="/cloud" title="Cloud" component={CloudPage}/>
                <VaticleRoute path="/" title="Home" component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
