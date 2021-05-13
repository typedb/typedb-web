import React, { useEffect, useState } from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from '../common/ui/images/vaticle-atom';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { discordURL, downloadTypeDBURL, githubURL, twitterURL } from "../common/urls";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../common/ui/button/button";
import clsx from "clsx";
import { studentHierarchyCode, studentHierarchyGraph } from "../common/ui/typeql/samples/student-hierarchy";
import { IndustrySection } from './industry-section';
import { ClusterSection } from "./cluster-section";
import { TestimonialsSection } from "./testimonials-section";
import { commonStyles } from "../common/ui/common-styles";
import { getTypeDBVersion } from "../api/typedb-service";
import { TypeQLExample } from "./typeql-example";
import { transitiveLocationCode, transitiveLocationGraph } from "../common/ui/typeql/samples/transitive-location";
import { locationDataCode, locationDataGraph } from "../common/ui/typeql/samples/location-data";
import AresGeneticsLogo from "../assets/logos/ares-genetics.png";
import BerkeleyLogo from "../assets/logos/berkeley.png";
import CapcoLogo from "../assets/logos/capco.png";
import CiscoLogo from "../assets/logos/cisco.png";
import DeutscheTelekomLogo from "../assets/logos/deutsche-telekom.png";
import DunnhumbyLogo from "../assets/logos/dunnhumby.png";
import GoogleLogo from "../assets/logos/google.png";
import InfosysLogo from "../assets/logos/infosys.png";
import LivingMatrixLogo from "../assets/logos/living-matrix.png";
import MaunaLogo from "../assets/logos/mauna.png";
import OpenCTILogo from "../assets/logos/opencti.png";
import RASALogo from "../assets/logos/rasa.png";
import TaxfixLogo from "../assets/logos/taxfix.png";
import TNOLogo from "../assets/logos/tno.png";
import USTGlobalLogo from "../assets/logos/ust-global.png";
import VaticleWorld from "../assets/graphics/vaticle-world.svg";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());
    const [typeDBVersion, setTypeDBVersion] = useState("");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        }, error => {
            console.error(error);
            setTypeDBVersion("TypeDB");
        });
    }, []);

    return (
        <DefaultLayout>
            <section>
                <div className={classes.vaticleAtomContainer}>
                    <VaticleAtom/>
                </div>

                <h1 className={clsx(classes.vaticleTypeDB, classes.h1, classes.sectionMarginSmall)}>Vaticle TypeDB: a strongly-typed database</h1>
                <h1 className={clsx(classes.vaticleTypeDBMobile, classes.h1)}>
                    Vaticle TypeDB: a<br/>
                    strongly-typed database
                </h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB is a database with a rich and logical type system. TypeDB empowers you to build
                    complex systems easily, using TypeQL as its query language.
                </p>

                <div className={clsx(classes.mainLinks, classes.sectionMarginSmall)}>
                    <a href={githubURL} target="_blank" className={classes.firstMainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub} />
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={discordURL} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord} />
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={twitterURL} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIconCircle} icon={faTwitter} />
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <VaticleButton className={classes.downloadGraknButton} size="small" type="primary"
                                       href={downloadTypeDBURL} target="_blank">
                            Download {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <section className={clsx(classes.corporateLogos, classes.sectionMarginLarge)}>
                <img src={BerkeleyLogo} alt="Berkeley Data Science Group" className={classes.berkeleyLogo}/>
                <img src={AresGeneticsLogo} alt="Ares Genetics" className={classes.aresGeneticsLogo}/>
                <img src={DeutscheTelekomLogo} alt="Deutsche Telekom" className={classes.deutscheTelekomLogo}/>
                <img src={CapcoLogo} alt="CAPCO" className={classes.capcoLogo}/>
                <img src={DunnhumbyLogo} alt="Dunnhumby" className={classes.dunnhumbyLogo}/>
                <img src={OpenCTILogo} alt="OpenCTI" className={classes.openCTILogo}/>
                <img src={InfosysLogo} alt="Infosys" className={classes.infosysLogo}/>
                <img src={LivingMatrixLogo} alt="LivingMatrix" className={classes.livingMatrixLogo}/>
                <img src={TaxfixLogo} alt="Taxfix" className={classes.taxfixLogo}/>
                <img src={MaunaLogo} alt="Mauna" className={classes.maunaLogo}/>
                <img src={TNOLogo} alt="TNO" className={classes.tnoLogo}/>
                <img src={USTGlobalLogo} alt="USTGlobal" className={classes.ustGlobalLogo}/>
                <img src={GoogleLogo} alt="Google" className={classes.googleLogo}/>
                <img src={RASALogo} alt="RASA" className={classes.rasaLogo}/>
                <img src={CiscoLogo} alt="Cisco" className={classes.ciscoLogo}/>
            </section>

            <section className={classes.sectionMarginLarge}>
                <h1 className={classes.h1}>Strong type systems make complex problems easier to tackle</h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB provides a strong type system for developers to break down complex problems into
                    meaningful and logical systems. Through TypeQL, TypeDB provide strong abstractions over
                    low-level and complex data patterns.
                </p>

                <TypeQLExample className={classes.sectionMarginSmall} visualiserPosition="left"
                               code={studentHierarchyCode} graphData={studentHierarchyGraph} title="Expressivity"
                               body="Vaticle TypeDB allows you to model your domain through the well-known Entity-Relationship model,
                                     but at its fullest expressivity. It's composed of entity, relationship, and attribute types,
                                     and also type hierarchies, roles, and rules, allowing you to build expressive datasets
                                     based-on logical and object-oriented principles."/>

                <TypeQLExample className={classes.sectionMarginLarge} visualiserPosition="right"
                               code={transitiveLocationCode} graphData={transitiveLocationGraph} title="Safety"
                               body="Types provide a way to describe the logical structures of your data, allowing Vaticle TypeDB
                                     to validate that your code is inserting data correctly. Data validation goes beyond static type
                                     checking, and includes logical validations of inferrable data patterns. With strict type-checking
                                     errors, you have a dataset that you can trust."/>

                <TypeQLExample className={classes.sectionMarginLarge} visualiserPosition="left"
                               code={locationDataCode} graphData={locationDataGraph} title="Simplicity"
                               body="Vaticle TypeDB derives all possible interpretations of a query, through type-based and
                                     rule-based inference. Complex and verbose data patterns can be queried through simple and
                                     intuitive TypeQL queries. TypeDB also optimises the traversal path of query execution.
                                     As a result, TypeDB significantly reduces complexity of applications."/>

                <div className={clsx(classes.mainActionList, classes.sectionMarginSmall)}>
                    <VaticleButton size="small" type="primary" href={downloadTypeDBURL} target="_blank">Download {typeDBVersion}</VaticleButton>
                    <VaticleButton size="small" type="primary" href={githubURL} target="_blank">Fork/Star on GitHub</VaticleButton>
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

            <TestimonialsSection className={classes.sectionMarginLarge}/>

            <section className={clsx(classes.communitySection, classes.sectionMarginLarge)}>
                <h1 className={classes.h1}>Join the global movement of the Vaticle Community</h1>
                <VaticleWorld className={classes.sectionMarginSmall}/>
                <VaticleButton size="small" type="primary" className={classes.sectionMarginSmall}>Join the Vaticle Community around the world</VaticleButton>
            </section>

        </DefaultLayout>
    );
};
