import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { githubButtonStyles } from './button-styles';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { urls } from "../urls";

export const GithubButton: React.FC = () => {
    const classes = githubButtonStyles();

    return (
        <a href={urls.github.vaticle} className={classes.root} target="_blank">
            <FontAwesomeIcon icon={faGithub} />
        </a>
    );
};
