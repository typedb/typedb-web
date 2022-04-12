import React, { ReactNode } from "react";
import { ClassProps } from "../../common/class-props";
import { VaticleLink } from "../../common/link/link";

interface ParagraphWithLinksProps extends ClassProps {
    text: string;
}

export const ParagraphWithLinks: React.FC<ParagraphWithLinksProps> = ({text, className}) => {
    const linkRegex = /\[([^\]]*)]\(([^)]*)\)/g;
    const reactNodes: ReactNode[] = [];
    let startIndex = 0;
    let match: RegExpExecArray | null = linkRegex.exec(text);
    while (match) {
        const [matchedText, parsedLinkText, parsedLinkURL] = match;
        reactNodes.push(<span>{text.substring(startIndex, match.index)}</span>)
        reactNodes.push(<VaticleLink href={parsedLinkURL} target="_blank">{parsedLinkText}</VaticleLink>)
        startIndex = match.index + matchedText.length;
        match = linkRegex.exec(text);
    }
    reactNodes.push(<span>{text.substring(startIndex)}</span>)
    return <p className={className}>{reactNodes}</p>
}
