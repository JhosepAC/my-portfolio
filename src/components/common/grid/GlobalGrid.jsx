const GlobalGrid = () => {
    return (
        <div 
            aria-hidden="true" 
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 1,
                backgroundImage: `
                    linear-gradient(rgba(88, 166, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(88, 166, 255, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
            }}
        />
    );
};

export default GlobalGrid;
