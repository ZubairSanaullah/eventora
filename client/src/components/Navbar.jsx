import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navLinkStyle = (path) => ({
        color: isActive(path) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'color var(--transition-fast)',
        padding: '8px 0'
    });

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
            transition: 'all var(--transition-base)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '72px'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    transition: 'opacity var(--transition-fast)'
                }}>
                    <FaTicketAlt style={{
                        fontSize: '1.4rem',
                        color: 'var(--accent-cyan)'
                    }} />
                    <span style={{
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        letterSpacing: '-0.5px'
                    }} className="gradient-text">
                        Eventora
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px'
                }} className="desktop-nav">
                    <Link to="/" style={navLinkStyle('/')}
                        onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseOut={e => e.currentTarget.style.color = isActive('/') ? 'var(--accent-cyan)' : 'var(--text-secondary)'}
                    >Home</Link>

                    {user && (
                        <Link to="/dashboard" style={navLinkStyle('/dashboard')}
                            onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseOut={e => e.currentTarget.style.color = isActive('/dashboard') ? 'var(--accent-cyan)' : 'var(--text-secondary)'}
                        >My Bookings</Link>
                    )}

                    {user && user.role === 'admin' && (
                        <Link to="/admin" style={navLinkStyle('/admin')}
                            onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseOut={e => e.currentTarget.style.color = isActive('/admin') ? 'var(--accent-cyan)' : 'var(--text-secondary)'}
                        >Admin</Link>
                    )}

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--border-subtle)'
                            }}>
                                <FaUser style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }} />
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                                    {user.name}
                                </span>
                            </div>
                            <button onClick={handleLogout} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 18px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: 'var(--radius-full)',
                                color: 'var(--accent-red)',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)'
                            }}
                                onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Link to="/login" className="btn-secondary btn-small">Login</Link>
                            <Link to="/register" className="btn-primary btn-small">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    padding: '8px'
                }}>
                    {mobileOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu slide-down" style={{
                    background: 'rgba(10, 10, 15, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid var(--border-subtle)',
                    padding: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <Link to="/" style={{ ...navLinkStyle('/'), padding: '12px 0' }}>Home</Link>
                        {user && <Link to="/dashboard" style={{ ...navLinkStyle('/dashboard'), padding: '12px 0' }}>My Bookings</Link>}
                        {user && user.role === 'admin' && <Link to="/admin" style={{ ...navLinkStyle('/admin'), padding: '12px 0' }}>Admin Panel</Link>}

                        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {user ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <FaUser style={{ color: 'var(--accent-cyan)' }} />
                                        {user.name}
                                    </div>
                                    <button onClick={handleLogout} className="btn-danger" style={{ width: '100%', justifyContent: 'center' }}>
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-secondary" style={{ textAlign: 'center' }}>Login</Link>
                                    <Link to="/register" className="btn-primary" style={{ textAlign: 'center' }}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Responsive styles injected via style tag */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;