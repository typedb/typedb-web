import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { githubButtonStyles } from './button-styles';
import { githubUrl } from "../../urls";

export const GithubButton: React.FC = () => {
    const classes = githubButtonStyles();

    return (
        <a href={githubUrl} className={classes.root} target="_blank">
            <Icon icon={['fab', 'github']} />
        </a>
    );
};
