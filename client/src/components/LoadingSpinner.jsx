import React from 'react';

const LoadingSpinner = ({ size = 40, text = '' }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '40px'
        }}>
            <div style={{
                width: size,
                height: size,
                border: '3px solid rgba(255,255,255,0.06)',
                borderTopColor: 'var(--accent-cyan)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />
            {text && (
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
