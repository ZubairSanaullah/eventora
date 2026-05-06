import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
            paddingTop: '60px',
            paddingBottom: '30px'
        }}>
            {/* Gradient accent line */}
            <div style={{
                height: '2px',
                background: 'var(--gradient-primary)',
                position: 'relative',
                top: '-60px',
                marginBottom: '-60px'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '40px',
                    marginBottom: '48px'
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '16px'
                        }}>
                            <FaTicketAlt style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)' }} />
                            <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                                Eventora
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            lineHeight: '1.7'
                        }}>
                            Discover, book, and manage world-class events. Your premium event management platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--text-primary)',
                            marginBottom: '20px'
                        }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { to: '/', label: 'Browse Events' },
                                { to: '/login', label: 'Sign In' },
                                { to: '/register', label: 'Create Account' },
                                { to: '/dashboard', label: 'My Bookings' }
                            ].map(link => (
                                <Link key={link.to} to={link.to} style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color var(--transition-fast)'
                                }}
                                    onMouseOver={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--text-primary)',
                            marginBottom: '20px'
                        }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['Technology', 'Music', 'Business', 'Art', 'Sports'].map(cat => (
                                <span key={cat} style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.875rem'
                                }}>
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--text-primary)',
                            marginBottom: '20px'
                        }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '14px' }}>
                            {[
                                { icon: <FaGithub />, href: '#' },
                                { icon: <FaTwitter />, href: '#' },
                                { icon: <FaLinkedin />, href: '#' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    transition: 'all var(--transition-fast)'
                                }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                                        e.currentTarget.style.color = 'var(--accent-cyan)';
                                        e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem',
                            marginTop: '20px',
                            lineHeight: '1.6'
                        }}>
                            hello@eventora.com
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem'
                    }}>
                        © {new Date().getFullYear()} Eventora. All rights reserved.
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        Made with <FaHeart style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }} /> by Eventora Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
