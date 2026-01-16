import React from 'react';
import './ProjectStatus.css'

const ProjectStatus = ({ status, text }) => {
    const getStatusColor = (statusKey) => {
        switch (statusKey) {
            case 'active': return '#10b981';
            case 'production': return '#3b82f6';
            default: return '#f59e0b';
        }
    };

    return (
        <div className="project-status">
            <span className="status-indicator" style={{ backgroundColor: getStatusColor(status) }}></span>
            <span className="status-text">{text}</span>
        </div>
    );
};

export default ProjectStatus;