import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA } from '../../data/projectsData.jsx';
import './ProjectsSection.css';

const ProjectsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNavigation = useCallback((direction) => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (direction === 'next') {
            setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
        } else {
            setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
        }

        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handleNavigation('prev');
            if (e.key === 'ArrowRight') handleNavigation('next');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNavigation]);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <header className="projects-header">
                    <div className="header-decorator">
                        <div className="decorator-line" />
                        <span className="decorator-dot" />
                    </div>
                    <div className="header-content">
                        <h2 className="section-title">Proyectos Destacados</h2>
                        <p className="section-subtitle">Explorando los límites del desarrollo moderno</p>
                    </div>
                </header>

                <div className="projects-showcase">
                    <div className="showcase-glow" style={{
                        background: `radial-gradient(circle at center, ${PROJECTS_DATA[activeIndex].technologies[0].color}15 0%, transparent 70%)`
                    }} />

                    <nav className="nav-controls">
                        <button className="nav-button nav-prev" onClick={() => handleNavigation('prev')} disabled={isAnimating}>
                            <FaChevronLeft />
                        </button>
                        <button className="nav-button nav-next" onClick={() => handleNavigation('next')} disabled={isAnimating}>
                            <FaChevronRight />
                        </button>
                    </nav>

                    <div className="cards-stack">
                        {PROJECTS_DATA.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                activeIndex={activeIndex}
                                isAnimating={isAnimating}
                            />
                        ))}
                    </div>

                    <div className="progress-indicators">
                        {PROJECTS_DATA.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => !isAnimating && setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;