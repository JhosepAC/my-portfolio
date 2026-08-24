import React from 'react';
import { motion } from 'motion/react';
import SkillIcon from './SkillIcon';
import './SkillCard.css';

const SkillCard = ({skill}) => (
    <motion.div
        className="skill-card"
        data-icon={skill.icon}
        layout
        whileHover={{y: -2, scale: 1.015}}
        whileTap={{scale: 0.992}}
        transition={{
            type: 'spring',
            stiffness: 220,
            damping: 30,
            mass: 0.8
        }}
    >
        <div className="skill-icon-wrapper">
            <SkillIcon
                name={skill.icon}
                iconType={skill.iconType}
            />
        </div>
        <span className="skill-name">{skill.name}</span>
    </motion.div>
);

export default SkillCard;