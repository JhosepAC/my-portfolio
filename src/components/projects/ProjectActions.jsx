import React from 'react';
import {useTranslation} from 'react-i18next';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import './ProjectActions.css'

const ProjectActions = ({github, live}) => {
    const {t} = useTranslation();

    return (<div className="project-actions">
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-secondary"
                aria-label="Ver código en GitHub"
            >
                <FaGithub/>
                <span>{t('projects.seeCode')}</span>
            </a>
            <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-primary"
                aria-label="{t('projects.seeLive')}"
            >
                <FaExternalLinkAlt/>
                <span>{t('projects.seeLive')}</span>
            </a>
        </div>);
};

export default ProjectActions;