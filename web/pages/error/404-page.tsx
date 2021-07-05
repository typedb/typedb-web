import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { errorStyles } from "./error-styles";
import { FeatureBlock } from "../feature/feature-block";
import { routes } from "../router";
import { VaticleLayout } from "../../common/layout/layout";
import { ExampleWindow, ExampleWindowHeader } from "../../common/code/example-window";

export const Vaticle404Page: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), errorStyles());

    return (
        <VaticleLayout>
            <section className={classes.main}>
                <FeatureBlock examplePosition="right" title="OOOPS....."
                              body={`The requested URL ${window.location.href} was not found on this server. You may have
                          entered a broken URL.`} button={{text: "Back Home", type: "primary", to: routes.home}}>
                    <ExampleWindow>
                        <ExampleWindowHeader/>
                        <div className={classes.errorWindow}>
                            <div className={classes.statusCode}>404</div>
                            <div className={classes.statusText}>Page not found</div>
                        </div>
                    </ExampleWindow>
                </FeatureBlock>
            </section>
        </VaticleLayout>
    );
}
