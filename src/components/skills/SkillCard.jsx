import React from 'react';
import SkillIcon from './SkillIcon';
import {hexToRgba} from '../../utils/helpers';
import './SkillCard.css';

const SkillCard = ({skill, index}) => {
    const cardStyles = {
        '--skill-color': skill.color,
        '--skill-color-shadow': hexToRgba(skill.color, 0.4),
        animationDelay: `${index * 0.05}s`
    };

    return (
        <div className="skill-card" style={cardStyles}>
            <div className="skill-icon-wrapper">
                <SkillIcon
                    name={skill.icon}
                    color={skill.color}
                    iconType={skill.iconType}
                />
            </div>
            <span className="skill-name">{skill.name}</span>
        </div>
    );
};

export default SkillCard;