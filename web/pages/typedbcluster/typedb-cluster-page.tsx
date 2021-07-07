import React from "react";
import clsx from "clsx";
import {urls} from "../../common/urls";
import {typeDBClusterStyles} from "./typedb-cluster-styles";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {
    clusterManagementExample,
    elasticThroughputExample,
    highAvailabilityExample,
    inFlightEncryptionExample,
    liveBackupExample,
    secureAuthenticationExample
} from "./typedb-cluster-examples";
import {VaticleLayout} from "../../common/layout/layout";
import {VaticleButton} from "../../common/button/button";
import {FeatureBlock} from "../feature/feature-block";
import {ConsoleExample} from "../../common/code/console-example";

export const TypeDBClusterPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), typeDBClusterStyles());

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
                <h1 className={clsx(classes.intro, classes.h1)}>Scale your database with TypeDB Cluster</h1>
                <h1 className={clsx(classes.introMobile, classes.h1)}>Scale your database with<br/>TypeDB Cluster</h1>
                <p className={classes.sectionIntro}>
                    TypeDB Cluster is the distributed database designed to scale with your organisation. Whether you
                    have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                    functionalities needed to take you from development to production and scale.
                </p>
                <FeatureBlock id="availability" className={classes.subsectionMargin} examplePosition="left"
                              title="High-Availability"
                              body="Through a primary-secondary (master-slave) architecture based on Raft, TypeDB
                              Cluster replicates data across multiple servers in real-time, to provide a highly-available
                              database service that is tolerant against non-majority server failures. When such failures
                              occur, TypeDB Clients provide automatic failover natively."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <ConsoleExample code={highAvailabilityExample}/>
                </FeatureBlock>
                <FeatureBlock id="throughput" className={classes.subsectionMargin} examplePosition="right"
                              title="Elastic Throughput"
                              body="TypeDB Cluster provides strongly-consistent reads through the primary replica, and
                              eventually-consistent reads through the secondary replicas, allowing applications to
                              increase their read throughput from the database. TypeDB Clients provide automatic
                              load-balancing transparently for applications."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <ConsoleExample code={elasticThroughputExample}/>
                </FeatureBlock>
                <FeatureBlock id="authentication" className={classes.subsectionMargin} examplePosition="left"
                              title="User Authentication"
                              body="TypeDB Cluster ensures users are authenticated, and that only those with the right
                              authorisation can perform user/database management operations or access specific databases.
                              TypeDB Cluster allows you to define specific privileges for user roles, to allow read or
                              write access on a given database schema or data."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <ConsoleExample code={secureAuthenticationExample}/>
                </FeatureBlock>
                <FeatureBlock id="encryption" className={classes.subsectionMargin} examplePosition="right"
                              title="In-Flight Encryption"
                              body="Server-to-server communication is encrypted using the ZMQCurve protocol, ensuring the
                              safety of data replication across the cluster. Client-to-server communication is encrypted
                              using the TLS protocol, ensuring the privacy, authenticity, and integrity of data
                              transmitted to and from the the database server."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <ConsoleExample code={inFlightEncryptionExample}/>
                </FeatureBlock>
                <FeatureBlock id="management" className={classes.subsectionMargin} examplePosition="left"
                              title="Cluster Management"
                              body="TypeDB Cluster allows you to easily scale up or down the cluster to meet application
                              demands. Data replication and consistency are transparently managed throughout cluster
                              transformation, including in the event of cluster resizing failure. TypeDB Clients
                              also allow applications to discover new cluster servers automatically."
                              button={{text: "Coming Soon!", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={clusterManagementExample}/>
                </FeatureBlock>
                <FeatureBlock id="backup" className={classes.subsectionMargin} examplePosition="right"
                              title="Live Backup"
                              body="TypeDB Cluster provides a granular live backup mechanism, that allows applications
                              to recover from any disaster, to the latest database version of a successfully committed
                              transaction. This minimises the possibly of data loss significantly. Backup operations
                              perform incrementally, minimising CPU usage, storage usage, and network overhead. Backup
                              and restore operations can be performed via simple commands in the CLI."
                              button={{text: "Coming Soon!", disabled: true, comingSoon: true}}>
                    <ConsoleExample code={liveBackupExample}/>
                </FeatureBlock>
            </section>
            <section id="deploy" className={classes.sectionMargin}>
                <h1 className={classes.h1}>Deploy TypeDB Cluster in the Cloud or On-Premise</h1>
                <p className={classes.sectionIntro}>
                    You can easily deploy TypeDB Cluster on Google Cloud Platform, Amazon Web Services, or Microsoft
                    Azure, through each respective marketplaces, or you can deploy TypeDB Cluster in your own
                    computing environment.
                </p>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="?dialog=contact">
                        Get in touch
                    </VaticleButton>
                </div>
            </section>
        </VaticleLayout>
    );
};
