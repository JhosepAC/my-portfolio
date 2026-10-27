import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import useListEntrance from '../../hooks/useListEntrance';
import { EASE_SPRING } from '../../utils/motionVariants';
import SkillIcon from './SkillIcon';
import './SkillCard.css';

const SkillCard = forwardRef(function SkillCard({ skill, index = 0 }, ref) {
    const reduced = useReducedMotion();
    const entrance = useListEntrance(ref, index, 12);
    return <motion.div className="skill-card" data-icon={skill.icon}
        layout={reduced ? false : 'position'} {...entrance}
        exit={{ opacity: 0, scale: reduced ? 1 : 0.98, transition: { duration: reduced ? 0 : 0.12 } }}
        whileHover={reduced ? undefined : { y: -3, transition: { ...EASE_SPRING, delay: 0 } }} whileTap={reduced ? undefined : { scale: 0.985, transition: { duration: 0.1, delay: 0 } }}
        transition={{ ...entrance.transition, layout: EASE_SPRING }}>
        <div className="skill-icon-wrapper"><SkillIcon name={skill.icon} iconType={skill.iconType} /></div>
        <span className="skill-name">{skill.name}</span>
    </motion.div>;
});
export default SkillCard;
