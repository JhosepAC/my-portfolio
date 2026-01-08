import { useState } from 'react';
import SkillIcon from './SkillIcon';
import './SkillCard.css';

const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const colorWithAlpha = (color, alpha) => {
        // Convert hex to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div
            className="skill-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                '--skill-color': skill.color,
                '--skill-color-shadow': colorWithAlpha(skill.color, 0.4),
                animationDelay: `${index * 0.05}s`
            }}
        >
            <div className="skill-icon-wrapper">
                <SkillIcon name={skill.icon} color={skill.color} />
            </div>
            <span className="skill-name">{skill.name}</span>
        </div>
    );
};

export default SkillCard;