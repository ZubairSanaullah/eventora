import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaRedo, FaHome } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'var(--gradient-hero)' }}>
            <div className="glass-card-static fade-in-up" style={{ maxWidth: '480px', width: '100%', padding: '48px 40px', textAlign: 'center' }}>
                {/* Animated X mark */}
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'scale-in 0.5s ease-out forwards' }}>
                    <FaTimesCircle style={{ fontSize: '2.5rem', color: 'var(--accent-red)' }} />
                </div>

                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px', color: 'var(--accent-red)' }}>
                    Something Went Wrong
                </h1>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '36px' }}>
                    We couldn't process your booking. This might be a temporary issue. Please try again or contact support if the problem persists.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link to="/" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        <FaRedo /> Try Again
                    </Link>
                    <Link to="/" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        <FaHome /> Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
