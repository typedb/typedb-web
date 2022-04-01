import React from "react";
import CommunityResourcesIcon from "../../assets/icons/community-resources.svg";
import EnterpriseSupportIcon from "../../assets/icons/enterprise-support.svg";
import LifebuoyIcon from "../../assets/icons/lifebuoy.svg";
import { ClassProps } from "../../common/class-props";
import { KeyPointPanel, KeyPointPanels, KeyPointPanelsProps } from "../../common/keypoint/key-point-panels";
import { VaticleLink } from "../../common/link/link";
import { urls } from "../../common/urls";
import { routes } from "../router";

const panelHeight: KeyPointPanelsProps["panelHeight"] = {desktop: 288, mobile: 256};

export const KeyPointsSection: React.FC<ClassProps> = ({className}) => {
    const mobileHeight = panelHeight.mobile;

    return (
        <section className={className}>
            <KeyPointPanels panelHeight={panelHeight}>
                <KeyPointPanel data={{name: "TypeDB Support", icon: LifebuoyIcon}} mobileHeight={mobileHeight}>
                    We are committed to making sure your business succeeds. Whether you are an emerging startup or a
                    Fortune 500 company, we've got your back.
                </KeyPointPanel>
                <KeyPointPanel data={{name: "Resources", icon: CommunityResourcesIcon}} mobileHeight={mobileHeight}>
                    Engage with the TypeDB community on <VaticleLink href={urls.social.discord} target="_blank">Discord</VaticleLink> and <VaticleLink href={urls.github.vaticle} target="_blank">GitHub</VaticleLink>,
                    and be sure to make the best of
                    our <VaticleLink href={urls.docs.home}>documentation portal</VaticleLink>, <VaticleLink href={urls.forum}>discussion forum</VaticleLink> and <VaticleLink href={urls.stackOverflow}>Stack Overflow</VaticleLink>.
                </KeyPointPanel>
                <KeyPointPanel data={{name: "Services", icon: EnterpriseSupportIcon, comingSoon: true}} mobileHeight={mobileHeight}>
                    Extend your team by collaborating with our experienced engineers at Vaticle. We're ready to help
                    you in every way we can. {/*<VaticleLink href={routes.services}>Learn more</VaticleLink>.*/}
                </KeyPointPanel>
            </KeyPointPanels>
        </section>
    )
}
