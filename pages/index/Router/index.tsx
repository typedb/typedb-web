import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import PageUserSettings from '../../User/settings';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={PageUserSettings} />
                <Route exact path="/settings" constructTitle={() => `Vaticle | Settings`} component={PageUserSettings}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
