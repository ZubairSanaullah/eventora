import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaHome } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'var(--gradient-hero)' }}>
            <div className="glass-card-static fade-in-up" style={{ maxWidth: '480px', width: '100%', padding: '48px 40px', textAlign: 'center' }}>
                {/* Animated checkmark */}
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'scale-in 0.5s ease-out forwards' }}>
                    <FaCheckCircle style={{ fontSize: '2.5rem', color: 'var(--accent-green)' }} />
                </div>

                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
                    Booking <span className="gradient-text">Confirmed!</span>
                </h1>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '36px' }}>
                    Your booking has been successfully confirmed. You'll receive a confirmation email with all the details shortly.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link to="/dashboard" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        <FaCalendarAlt /> View My Bookings
                    </Link>
                    <Link to="/" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        <FaHome /> Browse More Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
