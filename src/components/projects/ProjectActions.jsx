import React from 'react';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import './ProjectActions.css'

const ProjectActions = ({github, live}) => {
    return (<div className="project-actions">
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-secondary"
                aria-label="Ver código en GitHub"
            >
                <FaGithub/>
                <span>Código</span>
            </a>
            <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-primary"
                aria-label="Ver demo en vivo"
            >
                <FaExternalLinkAlt/>
                <span>Ver Demo</span>
            </a>
        </div>);
};

export default ProjectActions;