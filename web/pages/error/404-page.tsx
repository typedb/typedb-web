import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { errorStyles } from "./error-styles";
import { FeatureWithSnippet } from "../feature/feature-with-snippet";
import { routes } from "../router";
import { VaticleLayout } from "../../common/layout/layout";
import { CodeSnippetWindow, CodeSnippetWindowHeader } from "../../common/code/snippet-window";

export const Vaticle404Page: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), errorStyles());

    return (
        <VaticleLayout>
            <section className={classes.main}>
                <FeatureWithSnippet examplePosition="right" title="OOOPS....."
                                    body={`The requested URL ${window.location.href} was not found on this server. You may have
                          entered a broken URL.`} button={{text: "Back Home", type: "primary", to: routes.home}}>
                    <CodeSnippetWindow>
                        <CodeSnippetWindowHeader/>
                        <div className={classes.errorWindow}>
                            <div className={classes.statusCode}>404</div>
                            <div className={classes.statusText}>Page not found</div>
                        </div>
                    </CodeSnippetWindow>
                </FeatureWithSnippet>
            </section>
        </VaticleLayout>
    );
}
