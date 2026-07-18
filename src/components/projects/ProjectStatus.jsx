import React from 'react';
import './ProjectStatus.css'

const ProjectStatus = ({ status, text }) => {
    const getStatusColor = (statusKey) => {
        switch (statusKey) {
            case 'completed': return '#10b981';
            case 'in_development': return '#f59e0b';
            case 'maintenance': return '#5a9fc0';
            case 'private': return '#6b7280';
            default: return '#6b7280';
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