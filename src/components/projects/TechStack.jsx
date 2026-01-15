import './TechStack.css'

const TechStack = ({technologies}) => (<div className="project-tech">
        <span className="tech-label">STACK:</span>
        <div className="tech-list">
            {technologies.map((tech, i) => (<div key={i} className="tech-item" style={{'--tech-color': tech.color}}>
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                </div>))}
        </div>
    </div>);

export default TechStack;