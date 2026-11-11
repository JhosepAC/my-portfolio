import { m, useReducedMotion } from 'motion/react';
import { EASE_SPRING } from '../../utils/motionVariants';
import SkillIcon from './SkillIcon';
import './SkillCard.css';

function SkillCard({ skill }) {
    const reduced = useReducedMotion();
    return <m.div className="skill-card" data-icon={skill.icon}
        whileHover={reduced ? undefined : { y: -3, transition: EASE_SPRING }}
        whileTap={reduced ? undefined : { scale: 0.985, transition: { duration: 0.1 } }}>
        <div className="skill-icon-wrapper"><SkillIcon name={skill.icon} iconType={skill.iconType} /></div>
        <span className="skill-name">{skill.name}</span>
    </m.div>;
}
export default SkillCard;
