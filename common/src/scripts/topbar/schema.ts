import { SanityDocument } from "@sanity/types";
import { Link, linkProps, TextLink } from "../shared";

export const topbarQuery = `
{
  "topnav": *[(_type match 'topnav')][0]{
    primaryItems[]{
      title,
      panel{
        columns[]{ itemGroups[]{ title, items[]{ title, description, iconName, iconVariant, link->${linkProps}}}},
        bottomLinks[]{ title, description, link->${linkProps} },
        ctas[]{ title, description, link{text, link->${linkProps}}}
      },
      link->${linkProps}
    },
    secondaryItems[]{ title, link->${linkProps}},
    cta{ text, style, link->${linkProps} },
    githubStarsCounter
  },
  "siteBanner": *[(_type match 'siteBanner')][0]{
    isEnabled,
    isEnabled == true => {
      link->${linkProps},
      "spans": text[0].children[_type=='span']{ text, marks }
    }
  }
}
`;

interface Topnav extends SanityDocument {
    primaryItems: NavItem[];
    secondaryItems: NavItem[];
    cta: Button;
    githubStarsCounter: string;
}

export interface NavItem {
    title: string;
    panel?: NavPanel;
    link?: Link;
}

export interface NavPanel {
    columns: NavPanelColumn[];
    bottomLinks?: NavResource[];
    ctas?: NavPanelCta[];
}

export interface NavPanelColumn {
    itemGroups: NavItemGroup[];
}

export interface NavItemGroup {
    title: string;
    items: NavProduct[];
}

export interface NavResource {
    title: string;
    description?: string;
    link: Link;
}

interface NavProduct {
    title: string;
    description?: string;
    link: Link;
    iconName?: string;
    iconVariant?: string;
}

export interface NavPanelCta {
    title: string;
    description?: string;
    link: TextLink;
}

interface Button {
    link: Link | null;
    style: "primary" | "secondary";
    text: string;
}

export type SiteBanner =
    | { isEnabled: false }
    | {
          isEnabled: true;
          link: Link;
          spans: { text: string; marks: string[] }[];
      };

export interface TopnavData {
    topnav: Topnav;
    siteBanner: SiteBanner;
}
