import React from 'react';
import './ProjectStatus.css'

const ProjectStatus = ({ status, text }) => {
    const getStatusColor = () => '#141414';

    return (
        <div className="project-status">
            <span className="status-indicator" style={{ backgroundColor: getStatusColor(status) }}></span>
            <span className="status-text">{text}</span>
        </div>
    );
};

export default ProjectStatus;