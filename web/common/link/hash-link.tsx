import React from "react";

interface HashLinkProps extends JSX.IntrinsicAttributes {
    to: string;
}

export const HashLink: React.FC<HashLinkProps> = (props) => {
    return <a {...props}/>;
}
