import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="loader-ring">
                    <span></span>
                </div>
                <p className="loader-text">INITIALIZING SYSTEM...</p>
            </div>
        </div>
    );
};

export default Loader;