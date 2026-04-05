const GlobalOrbs = () => {
    return (
        <div aria-hidden="true" style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(88, 166, 255, 0.15), transparent)',
                filter: 'blur(80px)',
                top: '10%',
                right: '-5%',
                animation: 'float-orb-1 15s ease-in-out infinite'
            }} />
            
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(125, 140, 255, 0.12), transparent)',
                filter: 'blur(100px)',
                top: '30%',
                left: '-8%',
                animation: 'float-orb-2 18s ease-in-out infinite'
            }} />
            
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)',
                filter: 'blur(120px)',
                top: '45%',
                right: '-10%',
                animation: 'float-orb-3 20s ease-in-out infinite'
            }} />
            
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)',
                filter: 'blur(100px)',
                top: '70%',
                left: '5%',
                animation: 'float-orb-4 16s ease-in-out infinite'
            }} />
        </div>
    );
};

export default GlobalOrbs;
