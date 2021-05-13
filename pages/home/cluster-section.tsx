import { homePageStyles } from "./home-styles";
import React from "react";
import clsx from "clsx";
import HighAvailabilityIcon from "../assets/icons/high-availability.svg";
import ElasticThroughputIcon from "../assets/icons/elastic-throughput.svg";
import FingerprintIcon from "../assets/icons/fingerprint.svg";
import EnterpriseSupportIcon from "../assets/icons/enterprise-support.svg";
import ClusterManagementIcon from "../assets/icons/cluster-management.svg";
import BackupAndRecoveryIcon from "../assets/icons/backup-and-recovery.svg";
import { VaticleButton } from "../common/ui/button/button";
import { commonStyles } from "../common/ui/common-styles";
import { ClassProps } from "../common/class-props";

interface ClusterFeature {
    name: string;
    description: string;
    icon: React.FC;
    linkTo?: string;
    comingSoon?: true;
}

export const ClusterSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());

    const allFeatures: ClusterFeature[] = [{
        name: "High Availability",
        description: "Replicate your data across multiple servers while maintaining transactional behaviour and up-time.",
        icon: HighAvailabilityIcon,
    }, {
        name: "Elastic Throughput",
        description: "Read and write throughput scales linearly as new machines are added to the TypeDB Cluster.",
        icon: ElasticThroughputIcon,
    }, {
        name: "Secure Authentication",
        description: "Ensuring only authenticated access and appropriately privileged users are allowed to access the database.",
        icon: FingerprintIcon,
    }, {
        name: "Enterprise Support",
        description: "Access to advance support SLA with faster response time and problem resolution.",
        icon: EnterpriseSupportIcon,
    }, {
        name: "Cluster Management",
        description: "Easily deploy and scale up/down your database with tools that automate the orchestration of your cluster.",
        icon: ClusterManagementIcon,
        comingSoon: true,
    }, {
        name: "Backup and Recovery",
        description: "Protect your database from data loss through automatic periodic backups and reconstruction tools.",
        icon: BackupAndRecoveryIcon,
        comingSoon: true,
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Scale your database with Vaticle TypeDB Cluster</h1>
            <p className={classes.largeText}>
                Vaticle TypeDB Cluster is the distributed database designed to scale with your enterprise. Whether
                you have a growing dataset, application workload, or user request, TypeDB Cluster will provide the
                tools you need to take you from development to production and scale.
            </p>

            <div className={clsx(classes.featurePanelList, classes.sectionMarginSmall)}>
                {allFeatures.map(({name, description, icon, comingSoon}) => (
                    <a className={classes.featurePanel}>
                        {comingSoon && <div className={classes.featurePanelBanner}>coming soon</div>}
                        {React.createElement(icon)}
                        <h4 className={clsx(classes.h4, classes.textMarginLarge)}>{name}</h4>
                        <p className={clsx(classes.mediumText, classes.textMarginSmall)}>{description}</p>
                    </a>
                ))}
            </div>

            <div className={clsx(classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="secondary" className={classes.clusterAction}>Learn More</VaticleButton>
                <VaticleButton size="small" type="primary" to="/cloud" className={classes.clusterAction}>Cloud Deployment</VaticleButton>
            </div>
        </section>
    );
}
