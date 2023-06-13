import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContactMediaID, contactMedias, Footer, footerSchemaName, Link, SanityCommunityResources, SanityDataset, SanityFooter, SocialMediaID, socialMedias } from "typedb-web-schema";
import { SocialMediaLink } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
    footer?: Footer;
    socialMediaLinks?: SocialMediaLink[];
    contactMediaLinks?: ContactMediaLink[];

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFooter = data.getDocumentByID(footerSchemaName) as SanityFooter;
            if (sanityFooter) this.footer = new Footer(sanityFooter, data);
            if (this.footer) {
                this.socialMediaLinks = this.footer.socialMediaLinks.map(x => new SocialMediaLink(x, data));
                this.contactMediaLinks = this.footer.contactMediaLinks.map(x => new ContactMediaLink(x, data));
            }
        });
    }

    get copyrightYear(): number {
        return new Date().getFullYear();
    }
}

const contactMediaIcons: { [key in ContactMediaID]: string } = {
    forum: "/assets/icon/social/discourse-rectangle.svg",
    discord: "/assets/icon/social/discord-rectangle.svg",
    contactForm: "/assets/icon/mail.svg"
}

class ContactMediaLink {
    readonly id: ContactMediaID;
    readonly text: string;
    readonly iconURL: string;
    readonly link: Link;

    constructor(id: ContactMediaID, db: SanityDataset) {
        this.id = id;
        this.text = contactMedias[id];
        this.iconURL = contactMediaIcons[id];
        const communityResources = db.getDocumentByID("communityResources") as SanityCommunityResources;
        this.link = this.getLink(id, communityResources);
    }

    private getLink(id: ContactMediaID, communityResources: SanityCommunityResources): Link {
        switch (id) {
            case "contactForm": return new Link({ destination: "?dialog=contact", type: "route", opensNewTab: false });
            case "discord": return new Link({ destination: communityResources.discordURL || "", type: "external", opensNewTab: true });
            case "forum": return new Link({ destination: communityResources.discussionForumURL || "", type: "external", opensNewTab: true });
        }
    }
}
