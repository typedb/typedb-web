import React from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from '../common/ui/images/vaticle-atom';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { discordUrl, downloadTypeDBUrl, githubUrl, twitterUrl } from "../common/urls";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../common/ui/button/button";
import clsx from "clsx";
import { TypeQLVisualiser } from "../common/ui/typeql/typeql-visualiser";
import { studentHierarchyGraph } from "../common/ui/typeql/graphs/student-hierarchy";
import { IndustrySection } from './industry-section';
import { ClusterSection } from "./cluster-section";

export const HomePage: React.FC = () => {
    const classes = homePageStyles();
    const typeDBVersion = "2.0.1";

    return (
        <DefaultLayout classes={{ main: classes.layoutMain }}>
            <section className={classes.sectionMarginSmall}>
                <p className={classes.underDevelopment}>
                    This site is currently under development - please use <a href="https://grakn.ai" className={classes.underDevelopmentLink}>https://grakn.ai</a>
                </p>
            </section>

            <section className={classes.sectionMarginLarge}>
                <VaticleAtom/>
            </section>

            <section className={classes.sectionMarginSmall}>
                <h1 className={classes.h1}>Vaticle TypeDB: a strongly-typed database</h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB is a database with a rich and logical type system. TypeDB empowers you to build
                    complex systems easily, using TypeQL as its query language.
                </p>
            </section>

            <section className={classes.sectionMarginSmall}>
                <div className={classes.mainLinks}>
                    <a href={githubUrl} target="_blank" className={classes.firstMainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub} />
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={discordUrl} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord} />
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={twitterUrl} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faTwitter} />
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <VaticleButton classes={{root: classes.downloadGraknButton}} size="small" type="primary"
                                       href={downloadTypeDBUrl} target="_blank">
                            Download {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <section className={classes.sectionMarginLarge}>
                <img src="../assets/images/corporate-logos.png" alt="" className={classes.corporateLogos}/>
            </section>

            <section className={classes.sectionMarginLarge}>
                <h1 className={classes.h1}>Strong type systems make complex problems easier to tackle</h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB provides a strong type system for developers to break down complex problems into
                    meaningful and logical systems. Through TypeQL, TypeDB provide strong abstractions over
                    low-level and complex data patterns.
                </p>
            </section>

            <section className={clsx(classes.sectionMarginSmall, classes.diagramAndCaptionSection)}>
                <h2 className={classes.h2}>Expressivity</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>
                    Vaticle TypeDB allows you to model your domain through the well-known Entity-Relationship model,
                    but at its fullest expressivity. It's composed of entity, relationship, and attribute types,
                    and also type hierarchies, roles, and rules, allowing you to build expressive datasets
                    based-on logical and object-oriented principles.
                </p>
                <TypeQLVisualiser data={studentHierarchyGraph} />
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={clsx(classes.sectionMarginLarge, classes.diagramAndCaptionSection)}>
                <h2 className={classes.h2}>Safety</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>
                    Types provide a way to describe the logical structures of your data, allowing Vaticle TypeDB
                    to validate that your code is inserting data correctly. Data validation goes beyond static type
                    checking, and includes logical validations of inferrable data patterns. With strict type-checking
                    errors, you have a dataset that you can trust.
                </p>
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={clsx(classes.sectionMarginLarge, classes.diagramAndCaptionSection)}>
                <h2 className={classes.h2}>Simplicity</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>
                    Vaticle TypeDB derives all possible interpretations of a query, through type-based and
                    rule-based inference. Complex and verbose data patterns can be queried through simple and
                    intuitive TypeQL queries. TypeDB also optimises the traversal path of query execution.
                    As a result, TypeDB significantly reduces complexity of applications.
                </p>
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={classes.sectionMarginSmall}>
                <div className={classes.mainActionList}>
                    <VaticleButton size="small" type="primary" href={downloadTypeDBUrl} target="_blank">Download {typeDBVersion}</VaticleButton>
                    <VaticleButton size="small" type="primary" href={githubUrl} target="_blank">Fork/Star on GitHub</VaticleButton>
                </div>
            </section>

            <section className={classes.sectionMarginLarge}>
                <h1 className={classes.h1}>Empower your organisation to solve complex problems</h1>
                <iframe width="760" height="451" src="https://www.youtube.com/embed/DbnS1feTyOs"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className={classes.sectionMarginSmall}/>
            </section>

            <IndustrySection className={classes.sectionMarginLarge}/>

            <ClusterSection className={classes.sectionMarginLarge}/>

        </DefaultLayout>
    );
};
