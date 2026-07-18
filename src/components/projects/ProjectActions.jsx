import React from 'react';
import {useTranslation} from 'react-i18next';
import {Icon} from '@iconify/react';
import './ProjectActions.css'

const ProjectActions = ({github, live, projectTitle, className = ''}) => {
    const {t} = useTranslation();

    return (<div className={`project-actions ${className}`}>
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-secondary"
                aria-label={`${t('projects.seeCode')}: ${projectTitle}`}
            >
                <Icon icon="simple-icons:github"/>
                <span>{t('projects.seeCode')}</span>
            </a>
            <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-primary"
                aria-label={t('projects.seeLive')}
            >
                <Icon icon="mdi:open-in-new"/>
                <span>{t('projects.seeLive')}</span>
            </a>
        </div>);
};

export default ProjectActions;