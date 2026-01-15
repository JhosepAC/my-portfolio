import React from 'react';
import './ProjectStatus.css'

const ProjectStatus = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
                return { color: '#10b981', text: 'ACTIVE' };
            case 'production':
                return { color: '#3b82f6', text: 'PRODUCTION' };
            case 'development':
                return { color: '#f59e0b', text: 'IN DEV' };
            default:
                return { color: '#6b7280', text: 'IDLE' };
        }
    };

    const config = getStatusConfig(status);

    return (
        <div className="project-status">
            <span
                className="status-indicator"
                style={{ backgroundColor: config.color }}
            ></span>
            <span className="status-text">{config.text}</span>
        </div>
    );
};

export default ProjectStatus;