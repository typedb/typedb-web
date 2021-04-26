import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { githubButtonStyles } from './button-styles';
import { githubUrl } from "../../urls";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const GithubButton: React.FC = () => {
    const classes = githubButtonStyles();

    return (
        <a href={githubUrl} className={classes.root} target="_blank">
            <FontAwesomeIcon icon={faGithub} />
        </a>
    );
};
