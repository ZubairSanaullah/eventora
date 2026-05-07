import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaGithub, FaTwitter, FaLinkedin, FaHeart, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            position: 'relative',
            paddingTop: '80px',
            paddingBottom: '40px',
            marginTop: 'auto'
        }}>
            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--gradient-primary)'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '48px',
                    marginBottom: '64px'
                }}>
                    {/* Brand Section */}
                    <div style={{ maxWidth: '320px' }}>
                        <Link to="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            textDecoration: 'none',
                            marginBottom: '24px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.2rem'
                            }}>
                                <FaTicketAlt />
                            </div>
                            <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
                                Eventora
                            </span>
                        </Link>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.8',
                            marginBottom: '28px'
                        }}>
                            The world's leading platform for discovering and booking extraordinary experiences. Join our community and never miss out.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { icon: <FaGithub />, href: '#' },
                                { icon: <FaTwitter />, href: '#' },
                                { icon: <FaLinkedin />, href: '#' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="social-link" style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none'
                                }}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '24px',
                            position: 'relative',
                            paddingLeft: '14px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '4px',
                                height: '14px',
                                background: 'var(--accent-cyan)',
                                borderRadius: '2px'
                            }} />
                            Quick Links
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { to: '/', label: 'Explore Events' },
                                { to: '/dashboard', label: 'My Bookings' },
                                { to: '/login', label: 'Sign In' },
                                { to: '/register', label: 'Join Eventora' }
                            ].map(link => (
                                <Link key={link.to} to={link.to} style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    display: 'inline-block',
                                    width: 'fit-content'
                                }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.color = 'var(--accent-cyan)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 style={{
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '24px',
                            position: 'relative',
                            paddingLeft: '14px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '4px',
                                height: '14px',
                                background: 'var(--accent-purple)',
                                borderRadius: '2px'
                            }} />
                            Categories
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {['Technology', 'Music', 'Business', 'Art', 'Sports'].map(cat => (
                                <Link key={cat} to={`/?category=${cat}`} style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    display: 'inline-block',
                                    width: 'fit-content'
                                }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.color = 'var(--accent-purple)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '24px',
                            position: 'relative',
                            paddingLeft: '14px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '4px',
                                height: '14px',
                                background: 'var(--accent-pink)',
                                borderRadius: '2px'
                            }} />
                            Get in Touch
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <FaEnvelope style={{ color: 'var(--accent-cyan)' }} />
                                hello@eventora.com
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <FaPhone style={{ color: 'var(--accent-purple)' }} />
                                +1 (555) 000-1234
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                <FaMapMarkerAlt style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />
                                123 Innovation Drive, Silicon Valley, CA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © {currentYear} Eventora Platform. All rights reserved. Built for creators.
                    </p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem'
                    }}>
                        Made with <FaHeart style={{ color: 'var(--accent-red)', fontSize: '0.75rem' }} /> by
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}> Eventora Team</span>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .social-link:hover {
                    border-color: var(--accent-cyan) !important;
                    color: var(--accent-cyan) !important;
                    background: rgba(0, 212, 255, 0.08) !important;
                    transform: translateY(-3px);
                    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.15);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
