import './SectionHeader.css';

const SectionHeader = ({title, titleHighlight, subtitle, align = 'center', badge, stacked, highlightFirst}) => {
    const classes = [
        'section-header',
        `section-header--${align}`,
        stacked && 'section-header--stacked',
        highlightFirst && 'section-header--highlight-first'
    ].filter(Boolean).join(' ');

    return (
        <header className={classes}>
            {badge && (
                <div className="section-badge">
                    {badge.icon}
                    <span className="section-badge-text">{badge.text}</span>
                </div>
            )}
            <h2 className="section-title">
                {highlightFirst ? (
                    <>
                        <span className="section-title-gradient">{titleHighlight}</span>
                        <span className="section-title-main"> {title}</span>
                    </>
                ) : (
                    <>
                        <span className="section-title-main">{title} </span>
                        {titleHighlight && (
                            <span className="section-title-gradient">{titleHighlight}</span>
                        )}
                    </>
                )}
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </header>
    );
};

export default SectionHeader;
