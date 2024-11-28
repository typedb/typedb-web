import { SanityDocument } from "@sanity/types";
import { Link, linkProps, TextLink } from "../shared";

export const topbarQuery = `
{
  "topnav": *[(_type match 'topnav')][0]{
    primaryItems[]{
      title,
      panel->{
        _type,
        _type == 'topnav_productsPanel' => {
          productGroups[]{ title, items[]{ title, description, iconName, iconVariant, link->${linkProps}}},
          bottomLinks[]{ title, description, link->${linkProps} },
          ctas[]{ title, description, link{text, link->${linkProps}}}
        }
      },
      link->${linkProps}
    },
    secondaryItems[]{ title, link->${linkProps}},
    cta{ text, style, link->${linkProps} }
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
}

export interface NavItem {
    title: string;
    panel?: NavPanel;
    link?: Link;
}

interface ProductsNavPanel {
    _type: "topnav_productsPanel";
    productGroups: NavProductGroup[];
    bottomLinks?: NavResource[];
    ctas?: NavPanelCta[];
}

export interface NavProductGroup {
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

export type NavPanel = ProductsNavPanel;

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
