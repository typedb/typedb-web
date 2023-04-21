import { Link, SanityCommunityResources, SanityDataset, SocialMediaID, socialMedias } from "typedb-web-schema";

export class SocialMediaLink {
    readonly id: SocialMediaID;
    readonly text: string;
    readonly iconURL: string;
    readonly link: Link;

    constructor(id: SocialMediaID, db: SanityDataset) {
        this.id = id;
        this.text = socialMedias[id];
        this.iconURL = `/assets/icon/social/${id}-rectangle.svg`;
        const communityResources = db.byId["communityResources"] as SanityCommunityResources;
        this.link = new Link({ destination: communityResources[`${id}URL`] || "", type: "external", opensNewTab: true });
    }
}
