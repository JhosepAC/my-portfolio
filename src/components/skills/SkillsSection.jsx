import { useState, useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import SkillCard from './SkillCard';
import FilterButton from './FilterButton';
import './SkillsSection.css';

const SkillsSection = () => {
    const {t} = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const INITIAL_VISIBLE = 20;

    useEffect(() => {
        setShowAll(false);
    }, [activeFilter]);

    const skills = {
        languages: [
            { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
            { name: 'Python', icon: 'python', color: '#3776ab' },
            { name: 'Flutter', icon: 'flutter', color: '#02569b' },
            { name: 'C#', icon: 'csharp', color: '#239120' },
            { name: 'C++', icon: 'cpp', color: '#00599c' },
            { name: 'HTML5', icon: 'html', color: '#e34f26' },
            { name: 'CSS3', icon: 'css', color: '#2965f1' },
        ],
        databases: [
            { name: 'MySQL', icon: 'mysql', color: '#4479a1' },
            { name: 'MariaDB', icon: 'mariadb', color: '#00526a' },
            { name: 'SQL Server', icon: 'sqlserver', color: '#cc2927' },
            { name: 'MongoDB', icon: 'mongodb', color: '#47a248' },
        ],
        frameworks: [
            { name: 'Vue', icon: 'vue', color: '#42b883' },
            { name: 'React', icon: 'react', color: '#61dafb' },
            { name: 'Tailwind', icon: 'headlessui', color: '#66e3ff' }
        ],
        tools: [
            { name: 'GitHub', icon: 'github', color: '#ffffff' },
            { name: 'Git', icon: 'git', color: '#f05032' },
            { name: 'Linux', icon: 'linux', color: '#fcc624' },
            { name: 'Azure', icon: 'azure', color: '#0078d4' },
            { name: 'Android Studio', icon: 'androidstudio', color: '#3ddc84' },
            { name: 'Figma', icon: 'figma', color: '#a259ff' },
            { name: 'WebStorm', icon: 'webstorm', color: '#00cdd7' },
            { name: 'VS Code', icon: 'vscode', color: '#007acc' },
            { name: 'Visual Studio', icon: 'visualstudio', color: '#5c2d91' },
            { name: 'Rider', icon: 'rider', color: '#781919' },
        ],
        others: [
            {
                name: 'Scrum',
                icon: 'simple-icons:scrumalliance',
                iconType: 'iconify',
                color: '#f15a24'
            },
            {
                name: 'User Stories',
                icon: 'mdi:clipboard-text-outline',
                iconType: 'iconify',
                color: '#4caf50'
            },
            {
                name: 'Agile',
                icon: 'mdi:sync',
                iconType: 'iconify',
                color: '#2196f3'
            }
        ],
        softskills: [
            {
                name: t('skills.softskillsList.communication'),
                icon: 'mdi:chat-outline',
                iconType: 'iconify',
                color: '#ff9800'
            },
            {
                name: t('skills.softskillsList.teamwork'),
                icon: 'mdi:account-group-outline',
                iconType: 'iconify',
                color: '#9c27b0'
            },
            {
                name: t('skills.softskillsList.adaptability'),
                icon: 'mdi:brain',
                iconType: 'iconify',
                color: '#03a9f4'
            },
            {
                name: t('skills.softskillsList.problemSolving'),
                icon: 'mdi:puzzle-outline',
                iconType: 'iconify',
                color: '#4caf50'
            },
            {
                name: t('skills.softskillsList.timeManagement'),
                icon: 'mdi:clock-outline',
                iconType: 'iconify',
                color: '#0f858f'
            },
            {
                name: t('skills.softskillsList.creativity'),
                icon: 'mdi:lightbulb-outline',
                iconType: 'iconify',
                color: '#e91e63'
            },
        ],
    };

    const filters = [
        {id: 'all', label: t('skills.filters.all')},
        {id: 'languages', label: t('skills.filters.languages')},
        {id: 'databases', label: t('skills.filters.databases')},
        {id: 'frameworks', label: t('skills.filters.frameworks')},
        {id: 'tools', label: t('skills.filters.tools')},
        {id: 'others', label: t('skills.filters.others')},
        {id: 'softskills', label: t('skills.filters.softskills')},
    ];

    const getFilteredSkills = () => {
        const allSkills = Object.values(skills).flat();

        if (activeFilter === 'all') {
            return showAll
                ? allSkills
                : allSkills.slice(0, INITIAL_VISIBLE);
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
                            onClick={() => {
                                setActiveFilter(filter.id);
                                setShowAll(false);
                            }}
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

                {activeFilter === 'all' && (
                    <div className="skills-show-more">
                        <button
                            className="skills-show-more-btn"
                            onClick={() => setShowAll(prev => !prev)}
                        >
                            {showAll
                                ? t('skills.showLess')
                                : t('skills.showMore')}
                        </button>
                    </div>
                )}
            </div>

            {/* Background decorative elements */}
            <div className="skills-bg-orb skills-bg-orb-1"></div>
            <div className="skills-bg-orb skills-bg-orb-2"></div>
            <div className="skills-bg-orb skills-bg-orb-3"></div>
        </section>
    );
};

export default SkillsSection;