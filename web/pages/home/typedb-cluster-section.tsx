import React from "react";
import clsx from "clsx";
import HighAvailabilityIcon from "../../assets/icons/high-availability.svg";
import ElasticThroughputIcon from "../../assets/icons/elastic-throughput.svg";
import AuthenticationIcon from "../../assets/icons/authentication.svg";
import EncryptionIcon from "../../assets/icons/encryption.svg";
import ClusterManagementIcon from "../../assets/icons/cluster-management.svg";
import DatabaseServerIcon from "../../assets/icons/database-server.svg";
import { KeyPointPanel, KeyPointPanelData, KeyPointPanels } from "../../common/keypoint/key-point-panels";
import { hashRoutes, routes } from "../router";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {homePageClusterStyles} from "./home-styles";
import {ClassProps} from "../../common/class-props";
import {VaticleButton} from "../../common/button/button";

interface ClusterFeaturePanelData extends KeyPointPanelData {
    description: string;
}

export const TypeDBClusterSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageClusterStyles());

    const features: ClusterFeaturePanelData[] = [{
        name: "High Availability",
        description: "Replicate your data across multiple servers while maintaining transactional behaviour and up-time.",
        icon: HighAvailabilityIcon,
        linkTo: hashRoutes.typeDBCluster.availability
    }, {
        name: "Horizontal Scalability",
        description: "Scale application read throughput linearly as new machines are added to the database cluster.",
        icon: ElasticThroughputIcon,
        linkTo: hashRoutes.typeDBCluster.scalability
    }, {
        name: "User Authentication",
        description: "Ensuring only authenticated access and appropriately privileged users are allowed to access the database.",
        icon: AuthenticationIcon,
        linkTo: hashRoutes.typeDBCluster.authentication
    }, {
        name: "In-Flight Encryption",
        description: "All client-to-server and server-to-server communications are fully encrypted throughout transmission.",
        icon: EncryptionIcon,
        linkTo: hashRoutes.typeDBCluster.encryption
    }, {
        name: "Cluster Management",
        description: "Easily deploy and scale up/down your database with tools that automate the orchestration of your cluster.",
        icon: ClusterManagementIcon,
        comingSoon: true,
        linkTo: hashRoutes.typeDBCluster.management
    }, {
        name: "Live Backup",
        description: "Recover from any system disaster to the most up-to-date version of your database with live backup.",
        icon: DatabaseServerIcon,
        comingSoon: true,
        linkTo: hashRoutes.typeDBCluster.backup
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Scale with TypeDB Cluster</h1>
            <p className={classes.sectionIntro}>
                TypeDB Cluster is the distributed database designed to scale with your organisation. Whether
                you have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                functionalities needed to take you from development to production and scale.
            </p>

            <KeyPointPanels className={classes.subsectionMargin}>
                {features.map(feature => <KeyPointPanel data={{...feature}}>{feature.description}</KeyPointPanel>)}
            </KeyPointPanels>

            <div className={clsx(classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="secondary" to={routes.typeDBCluster} className={classes.clusterAction}>
                    Learn More
                </VaticleButton>
                <VaticleButton size="small" type="primary" disabled comingSoon className={classes.clusterAction}>
                    Cloud Deployment
                </VaticleButton>
            </div>
        </section>
    );
}
