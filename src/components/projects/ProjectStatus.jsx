import React from 'react';
import './ProjectStatus.css'

const ProjectStatus = ({ status, text }) => {
    const getStatusColor = (s) => {
        if (s === 'in_development') return '#f59e0b'; // amber - En desarrollo
        if (s === 'production') return '#22c55e'; // green - En Producción
        return '#141414';
    };

    return (
        <div className="project-status">
            <span className="status-indicator" style={{ backgroundColor: getStatusColor(status) }}></span>
            <span className="status-text">{text}</span>
        </div>
    );
};

export default ProjectStatus;