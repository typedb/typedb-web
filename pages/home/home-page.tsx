import React from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from '../common/ui/images/vaticle-atom';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { discordUrl, downloadTypeDBUrl, githubUrl, twitterUrl } from "../common/urls";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../common/ui/button/button";
import LifeSciencesIcon from "../assets/icons/life-sciences-icon.svg";
import SecurityIcon from "../assets/icons/security-icon.svg";
import FinanceIcon from "../assets/icons/finance-icon.svg";
import RoboticsIcon from "../assets/icons/robotics-icon.svg";
import NLPIcon from "../assets/icons/nlp-icon.svg";
import clsx from "clsx";
import { ForceGraph } from "../common/ui/typeql/force-graph";
import { testData } from "../common/ui/typeql/test-data";

export const HomePage: React.FC = () => {
    const classes = homePageStyles();
    const typeDBVersion = "2.0.1";

    const nodeHoverTooltip = React.useCallback((node) => `<div><b>${node.name}</b></div>`, []);

    return (
        <DefaultLayout classes={{ main: classes.layoutMain }}>
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
                        <a href="https://grakn.ai/download" target="_blank">
                            <VaticleButton classes={{root: classes.downloadGraknButton}} size="small" type="primary">Download {typeDBVersion}</VaticleButton>
                        </a>
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
                <p className={classes.mediumText}>
                    Vaticle TypeDB allows you to model your domain through the well-known Entity-Relationship model,
                    but at its fullest expressivity. It's composed of entity, relationship, and attribute types,
                    and also type hierarchies, roles, and rules, allowing you to build expressive datasets
                    based-on logical and object-oriented principles.
                </p>
                <ForceGraph linksData={testData.links} nodesData={testData.nodes} nodeHoverTooltip={nodeHoverTooltip} />
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={clsx(classes.sectionMarginLarge, classes.diagramAndCaptionSection)}>
                <h2 className={classes.h2}>Safety</h2>
                <p className={classes.mediumText}>
                    Types provide a way to describe the logical structures of your data, allowing Vaticle TypeDB
                    to validate that your code is inserting data correctly. Data validation goes beyond static type
                    checking, and includes logical validations of inferrable data patterns. With strict type-checking
                    errors, you have a dataset that you can trust.
                </p>
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={clsx(classes.sectionMarginLarge, classes.diagramAndCaptionSection)}>
                <h2 className={classes.h2}>Simplicity</h2>
                <p className={classes.mediumText}>
                    Vaticle TypeDB derives all possible interpretations of a query, through type-based and
                    rule-based inference. Complex and verbose data patterns can be queried through simple and
                    intuitive TypeQL queries. TypeDB also optimises the traversal path of query execution.
                    As a result, TypeDB significantly reduces complexity of applications.
                </p>
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>
            </section>

            <section className={classes.sectionMarginSmall}>
                <div className={classes.actionList}>
                    <a href={downloadTypeDBUrl} target="_blank" className={classes.firstButtonListItem}>
                        <VaticleButton size="small" type="primary">Download {typeDBVersion}</VaticleButton>
                    </a>
                    <a href={githubUrl} target="_blank" className={classes.buttonListItem}>
                        <VaticleButton size="small" type="primary">Fork/Star on GitHub</VaticleButton>
                    </a>
                </div>
            </section>

            <section className={classes.sectionMarginLarge}>
                <h1 className={classes.h1}>Empower your organisation to solve complex problems</h1>
                <iframe width="760" height="451" src="https://www.youtube.com/embed/DbnS1feTyOs"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className={classes.sectionMarginSmall}/>
            </section>

            <section className={classes.sectionMarginLarge}>
                <h2 className={classes.h2}>Health and Life Science</h2>
                <p className={classes.largeText}>
                    From pharmaceutical R&D and biomedical research to frontline healthcare delivery, contemporary
                    health and life science industries rely on data to power insight and improve care. Using Vaticle
                    to effectively manage data can help organisations advance scientific research and deliver best
                    practice medicine.
                </p>
                <VaticleButton size="small" type="secondary" classes={{"root": classes.buttonAfterText}}>Learn More</VaticleButton>

                <div className={clsx(classes.sectionMarginSmall, classes.actionList)}>
                    <SectionToggle title="Health and Life Sciences" icon={LifeSciencesIcon}/>
                    <SectionToggle title="Defence & Security" icon={SecurityIcon}/>
                    <SectionToggle title="Financial Services" icon={FinanceIcon}/>
                    <SectionToggle title="Robotics" icon={RoboticsIcon}/>
                    <SectionToggle title="NLP" icon={NLPIcon}/>
                </div>
            </section>

        </DefaultLayout>
    );
};

interface SectionToggleProps {
    title: string;
    icon: React.FC<React.SVGAttributes<SVGElement>>;
}

const SectionToggle: React.FC<SectionToggleProps> = ({title, icon}) => {
    const classes = homePageStyles();

    return (
        <div className={classes.sectionToggle}>
            <div className={classes.sectionToggleIconContainer}>
                {React.createElement(icon, {className: classes.sectionToggleIcon})}
            </div>
            <p className={classes.sectionToggleTitle}>{title}</p>
        </div>
    );
}
