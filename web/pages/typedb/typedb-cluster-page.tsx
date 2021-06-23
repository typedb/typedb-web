import React from "react";
import {DefaultLayout} from "../../common/layout/default-layout";
import {FeatureBlock} from "../feature/feature-block";
import {VaticleButton} from "../../common/button/button";
import clsx from "clsx";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { ConsoleExample } from "../../common/code/console-example";
import {
    liveBackupExample,
    clusterManagementExample,
    elasticThroughputExample,
    highAvailabilityExample, inFlightEncryptionExample,
    secureAuthenticationExample
} from "./examples/typedb-cluster-examples";

export const TypeDBClusterPage: React.FC = () => {
    const classes = vaticleStyles();

    return (
        <DefaultLayout>
            <section className={classes.firstSection}>
                <h1 className={classes.h1}>Scale your database with TypeDB Cluster</h1>
                <p className={classes.largeText}>
                    TypeDB Cluster is the distributed database designed to scale with your organisation. Whether you
                    have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                    functionalities needed to take you from development to production and scale.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="High-Availability"
                              body="Through a primary-secondary (master-slave) architecture based on Raft, TypeDB
                              Cluster replicates data across multiple servers in real-time, to provide a highly-available
                              database service that is tolerant against non-majority server failures. When such failures
                              occur, TypeDB Clients provide automatic failover natively."
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={highAvailabilityExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Elastic Throughput"
                              body="TypeDB Cluster provides strong consistency reads through the primary replica, and
                              eventual consistency reads through the secondary replicas, allowing applications to
                              increase their read throughput from the database. TypeDB Clients provide automatic
                              load-balancing transparently for applications."
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={elasticThroughputExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Secure Authentication"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={secureAuthenticationExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="In-Flight Encryption"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={inFlightEncryptionExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Cluster Management"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Coming Soon!", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={clusterManagementExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Backup & Recovery"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Coming Soon!", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={liveBackupExample}/>
                </FeatureBlock>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>Deploy TypeDB Cluster in the Cloud or On-Premise</h1>
                <p className={classes.largeText}>
                    You can easily deploy TypeDB Cluster on Google Cloud Platform, Amazon Web Services, or Microsoft
                    Azure, through each respective marketplaces, or you can deploy TypeDB Cluster in your own
                    computing environment.
                </p>

                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" disabled comingSoon>Learn More</VaticleButton>
                </div>
            </section>
        </DefaultLayout>
    );
};
