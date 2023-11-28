import { Link, linkProps, TextLink } from "../shared";

export const footerQuery = `
{
  "footer": *[(_type match 'footer')][0] {
    button{
      style,
      text,
      link->${linkProps}
    },
    columns[]{
      title,
      items[]{
        link->${linkProps},
        text,
        comingSoon
      }
    },
    contactMediaLinks[],
    contactSectionTitle,
    socialMediaLinks[]
  },
  "communityResources":*[(_type match 'communityResources')][0]
}
`;

export interface FooterColumn {
    title: string;
    items: TextLink[];
}

export interface FooterData {
    footer: {
        button: {
            link: Link | null;
            style: "primary" | "secondary";
            text: string;
        };
        columns: FooterColumn[];
        contactMediaLinks: string[];
        contactSectionTitle: string;
        socialMediaLinks: string[];
    };
    communityResources: Record<string, string>;
}
