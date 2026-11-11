import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '../common/Icon';
import './ProjectActions.css'
import { isExternalProjectUrl } from '../../utils/projectUrls';

const ProjectActions = ({github, live, release, projectTitle, className = ''}) => {
    const {t} = useTranslation();

    const hasGithub = isExternalProjectUrl(github);
    const hasLive = isExternalProjectUrl(live);
    const hasRelease = isExternalProjectUrl(release);
    if (!hasGithub && !hasLive && !hasRelease) return <p className="case-resource-note">{t('caseStudy.noLinks')}</p>;

    return (<div className={`project-actions ${className}`}>
            {hasGithub && <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button button-secondary"
                aria-label={`${t('projects.seeCode')}: ${projectTitle}`}
            >
                <Icon icon="simple-icons:github"/>
                <span>{t('projects.seeCode')}</span>
            </a>}
            {hasRelease && (
                <a href={release} target="_blank" rel="noopener noreferrer" className="action-button button-primary"
                    aria-label={`${t('projects.downloadRelease')}: ${projectTitle}`}>
                    <Icon icon="mdi:download"/>
                    <span>{t('projects.downloadRelease')}</span>
                </a>
            )}
            {hasLive && (
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button button-primary"
                    aria-label={`${t('projects.seeLive')}: ${projectTitle}`}
                >
                    <Icon icon="mdi:open-in-new"/>
                    <span>{t('projects.seeLive')}</span>
                </a>
            )}
        </div>);
};

export default ProjectActions;
