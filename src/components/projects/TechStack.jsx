import './TechStack.css';
import {useTranslation} from 'react-i18next';

const TechStack = ({technologies}) => {
    const {t} = useTranslation();

    return (<div className="project-tech">
            <span className="tech-label">
                {t('projects.technologiesLabel')}
            </span>

        <div className="tech-list">
            {technologies.map((tech, i) => (<div
                key={i}
                className="tech-item"
                style={{'--tech-color': tech.color}}
            >
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
            </div>))}
        </div>
    </div>);
};

export default TechStack;