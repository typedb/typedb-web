import React from "react";
import clsx from "clsx";
import HighAvailabilityIcon from "../../assets/icons/high-availability.svg";
import ElasticThroughputIcon from "../../assets/icons/elastic-throughput.svg";
import AuthenticationIcon from "../../assets/icons/authentication.svg";
import EncryptionIcon from "../../assets/icons/encryption.svg";
import ClusterManagementIcon from "../../assets/icons/cluster-management.svg";
import BackupAndRecoveryIcon from "../../assets/icons/backup-and-recovery.svg";
import {routes} from "../router";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {homePageClusterStyles} from "./home-styles";
import {ClassProps} from "../../common/class-props";
import {VaticleButton} from "../../common/button/button";
import {VaticleLink} from "../../common/link/link";


interface ClusterFeature {
    name: string;
    description: string;
    icon: React.FC;
    to: string;
    comingSoon?: true;
}

export const TypeDBClusterSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageClusterStyles());

    const allFeatures: ClusterFeature[] = [{
        name: "High Availability",
        description: "Replicate your data across multiple servers while maintaining transactional behaviour and up-time.",
        icon: HighAvailabilityIcon,
        to: routes.typeDBCluster.availability
    }, {
        name: "Elastic Throughput",
        description: "Scale application read throughput linearly as new machines are added to the database cluster.",
        icon: ElasticThroughputIcon,
        to: routes.typeDBCluster.throughput
    }, {
        name: "User Authentication",
        description: "Ensuring only authenticated access and appropriately privileged users are allowed to access the database.",
        icon: AuthenticationIcon,
        to: routes.typeDBCluster.authentication
    }, {
        name: "In-Flight Encryption",
        description: "All client-to-server and server-to-server communication are fully encrypted during transmission.",
        icon: EncryptionIcon,
        to: routes.typeDBCluster.encryption
    }, {
        name: "Cluster Management",
        description: "Easily deploy and scale up/down your database with tools that automate the orchestration of your cluster.",
        icon: ClusterManagementIcon,
        comingSoon: true,
        to: routes.typeDBCluster.management
    }, {
        name: "Live Backup",
        description: "Recover from any system disaster to the most up-to-date version of your database with live backup.",
        icon: BackupAndRecoveryIcon,
        comingSoon: true,
        to: routes.typeDBCluster.backup
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Scale with TypeDB Cluster</h1>
            <p className={classes.largeText}>
                TypeDB Cluster is the distributed database designed to scale with your organisation. Whether
                you have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                functionalities needed to take you from development to production and scale.
            </p>

            <div className={clsx(classes.featurePanelList, classes.subsectionMargin)}>
                {allFeatures.map(({name, description, icon, comingSoon, to}) => (
                    <VaticleLink className={classes.featurePanel} to={to}>
                        {comingSoon && <div className={classes.featurePanelBanner}>coming soon</div>}
                        {React.createElement(icon)}
                        <h4 className={clsx(classes.h4, classes.textMarginLarge)}>{name}</h4>
                        <p className={clsx(classes.mediumText, classes.textMarginSmall)}>{description}</p>
                    </VaticleLink>
                ))}
            </div>

            <div className={clsx(classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="secondary" to={routes.typeDBCluster.page} className={classes.clusterAction}>
                    Learn More
                </VaticleButton>
                <VaticleButton size="small" type="primary" disabled comingSoon className={classes.clusterAction}>
                    Cloud Deployment
                </VaticleButton>
            </div>
        </section>
    );
}
