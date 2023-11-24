const link = `{
  type,
  opensNewTab,
  destination{current},
}`;

export const topbarQuery = `
{
  "topbar": *[(_type match 'topbar')][0]{
    mainArea[]{
      _type,
      _type == 'topbarMenuPanel' => {
        title,
        columns[]{
          _type,
          title,
          _type == 'topbarListColumn' => {
            items[]{
              link->${link},
              description,
              title,
              comingSoon
            }
          },
          _type == 'topbarSpotlightColumn' => {
            "iconURL": icon->assetRef.asset->url,
            link->${link}
          }
        }
      },
      _type == 'textLink' => {
        link->${link},
        text,
        comingSoon
      }
    },
    secondaryArea{
      button{
        style,
        text,
        link->${link}
      },
      links[]{
        _type,
        link->${link},
        text,
        comingSoon
      }
    }
  },
  "siteBanner": *[(_type match 'siteBanner')][0]{
    isEnabled,
    isEnabled == true => {
      link->${link},
      "spans": text[0].children[_type=='span']{
        text,
        marks
      }
    }
  },
  "githubURL": *[(_type match 'communityResources')][0].githubURL
}
`;

export interface Link {
    destination: { current: string };
    opensNewTab: boolean;
    type: "autoDetect" | "route" | "external";
}

export interface TextLink {
    _type: "textLink";
    link: Link | null;
    text: string;
    comingSoon: boolean;
}

export interface TopbarListColumn {
    _type: "topbarListColumn";
    title: string;
    items: {
        link: Link | null;
        description: string;
        title: string;
        comingSoon: boolean;
    }[];
}

export interface TopbarVideoColumn {
    _type: "topbarVideoColumn";
    title: string;
}

export interface TopbarSpotlightColumn {
    _type: "topbarSpotlightColumn";
    title: string;
    iconURL: string;
    link: Link;
}

export type TopbarColumn = TopbarListColumn | TopbarVideoColumn | TopbarSpotlightColumn;

export interface TopbarMenuPanel {
    _type: "topbarMenuPanel";
    title: string;
    columns: TopbarColumn[];
}

export type SiteBanner =
    | { isEnabled: false }
    | {
          isEnabled: true;
          link: Link;
          spans: { text: string; marks: string[] }[];
      };

export interface TopbarData {
    topbar: {
        mainArea: (TextLink | TopbarMenuPanel)[];
        secondaryArea: {
            links: TextLink[];
            button: {
                link: Link | null;
                style: "primary" | "secondary";
                text: string;
            };
        };
    };
    siteBanner: SiteBanner;
    githubURL: string;
}
