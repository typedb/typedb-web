export const linkProps = `{ type, opensNewTab, destination{current} }`;

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
