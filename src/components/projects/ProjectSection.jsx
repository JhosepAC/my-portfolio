export default function ProjectSection({ id, title, children, className = '' }) {
    return <section id={id} className={`case-section ${className}`} aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
    </section>;
}
