import React from 'react';
import { motion } from 'motion/react';
import SkillIcon from './SkillIcon';
import { EASE } from '../../utils/motionVariants';
import './SkillCard.css';

const SkillCard = ({skill, index}) => (
    <motion.div
        className="skill-card"
        data-icon={skill.icon}
        layout
        initial={{opacity: 0, scale: 0.8}}
        whileInView={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.8}}
        whileHover={{x: -4, y: -4}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.35, ease: EASE, delay: index * 0.04}}
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