import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SkillCard from './SkillCard';
import FilterButton from './FilterButton';
import './SkillsSection.css';

const SkillsSection = () => {
    const {t} = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');

    const skills = {
        languages: [
            { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
            { name: 'Python', icon: 'python', color: '#3776ab' },
            { name: 'C', icon: 'c', color: '#a8b9cc' },
            { name: 'C++', icon: 'cpp', color: '#00599c' },
            { name: 'HTML5', icon: 'html', color: '#e34f26' },
            { name: 'CSS3', icon: 'css', color: '#2965f1' },
        ],
        databases: [
            { name: 'MySQL', icon: 'mysql', color: '#4479a1' },
            { name: 'MongoDB', icon: 'mongodb', color: '#47a248' }
        ],
        frameworks: [
            { name: 'Vue', icon: 'vue', color: '#42b883' },
            { name: 'Figma', icon: 'figma', color: '#a259ff' },
            { name: 'Tailwind', icon: 'headlessui', color: '#66e3ff' }
        ],
        tools: [
            { name: 'GitHub', icon: 'github', color: '#ffffff' },
            { name: 'Git', icon: 'git', color: '#f05032' },
            { name: 'Linux', icon: 'linux', color: '#fcc624' },
            { name: 'Azure', icon: 'azure', color: '#0078d4' },
            { name: 'WebStorm', icon: 'webstorm', color: '#00cdd7' },
            { name: 'VS Code', icon: 'vscode', color: '#007acc' },
            { name: 'Visual Studio', icon: 'visualstudio', color: '#5c2d91' },
        ]
    };

    const filters = [
        {id: 'all', label: t('skills.filters.all')},
        {id: 'languages', label: t('skills.filters.languages')},
        {id: 'databases', label: t('skills.filters.databases')},
        {id: 'frameworks', label: t('skills.filters.frameworks')},
        {id: 'tools', label: t('skills.filters.tools')}
    ];

    const getFilteredSkills = () => {
        if (activeFilter === 'all') {
            return Object.values(skills).flat();
        }

        return skills[activeFilter] || [];
    };

    const filteredSkills = getFilteredSkills();

    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="title-accent">{t('skills.title')}</span>
                    </h2>
                </div>

                <div className="filters-container">
                    {filters.map((filter) => (
                        <FilterButton
                            key={filter.id}
                            label={filter.label}
                            isActive={activeFilter === filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                        />
                    ))}
                </div>

                <div className="skills-grid">
                    {filteredSkills.map((skill, index) => (
                        <SkillCard
                            key={`${skill.name}-${index}`}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="skills-bg-orb skills-bg-orb-1"></div>
            <div className="skills-bg-orb skills-bg-orb-2"></div>
            <div className="skills-bg-orb skills-bg-orb-3"></div>
        </section>
    );
};

export default SkillsSection;