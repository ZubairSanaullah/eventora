import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaShieldAlt } from 'react-icons/fa';

const Register = () => {
    const { register, verifyOtp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            setStep(2);
            setSuccess('Registration successful! Check your email for the OTP code.');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await verifyOtp(form.email, otp);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const spinnerEl = <span style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', paddingTop: '92px', background: 'var(--gradient-hero)' }}>
            <div className="glass-card-static fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: step === 1 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.3rem', color: step === 1 ? 'var(--accent-purple)' : 'var(--accent-green)' }}>
                        {step === 1 ? <FaUserPlus /> : <FaShieldAlt />}
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>
                        {step === 1 ? 'Create Account' : 'Verify Email'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {step === 1 ? 'Join Eventora and discover amazing events' : `Enter the 6-digit code sent to ${form.email}`}
                    </p>
                    {/* Step indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                        {[1, 2].map(s => (
                            <div key={s} style={{ width: s === step ? '32px' : '10px', height: '4px', borderRadius: '2px', background: s <= step ? 'var(--gradient-primary)' : 'var(--border-subtle)', transition: 'all var(--transition-base)' }} />
                        ))}
                    </div>
                </div>

                {error && <div className="alert alert-error" style={{ marginBottom: '20px' }}>{error}</div>}
                {success && step === 2 && <div className="alert alert-success" style={{ marginBottom: '20px' }}>{success}</div>}

                {step === 1 ? (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-name">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                                <input id="reg-name" name="name" type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} required style={{ paddingLeft: '40px' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-email">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                                <input id="reg-email" name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required style={{ paddingLeft: '40px' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                                <input id="reg-password" name="password" type="password" className="form-input" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required style={{ paddingLeft: '40px' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                                <input id="reg-confirm" name="confirmPassword" type="password" className="form-input" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} required style={{ paddingLeft: '40px' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '4px' }}>
                            {loading ? spinnerEl : <><FaUserPlus /> Create Account</>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="otp-input">Verification Code</label>
                            <input id="otp-input" type="text" className="form-input" placeholder="Enter 6-digit OTP" value={otp} onChange={e => { setOtp(e.target.value); setError(''); }} required maxLength={6} style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '8px', fontWeight: '700' }} />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px' }}>
                            {loading ? spinnerEl : <><FaShieldAlt /> Verify & Continue</>}
                        </button>
                    </form>
                )}

                <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
