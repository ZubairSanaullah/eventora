import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaRocket, FaUsers, FaCalendarCheck, FaShieldAlt, FaArrowRight, FaStar } from 'react-icons/fa';

const categories = ['All', 'Technology', 'Music', 'Business', 'Art', 'Sports'];

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
        } else {
            setActiveCategory('All');
        }
        fetchEvents();
    }, [location.search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get('/events');
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = activeCategory === 'All'
        ? events
        : events.filter(e => e.category === activeCategory);

    return (
        <div>
            {/* ============ HERO SECTION ============ */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--gradient-hero)'
            }}>
                {/* Decorative orbs */}
                <div style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                    top: '-100px',
                    right: '-100px',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
                    bottom: '-50px',
                    left: '-50px',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{
                    textAlign: 'center',
                    paddingTop: '80px',
                    paddingBottom: '80px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Pre-title badge */}
                    <div className="fade-in-up" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 212, 255, 0.08)',
                        border: '1px solid rgba(0, 212, 255, 0.15)',
                        marginBottom: '28px',
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan)',
                        fontWeight: '500'
                    }}>
                        <FaStar style={{ fontSize: '0.7rem' }} />
                        Premium Event Platform
                    </div>

                    <h1 className="fade-in-up delay-1" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        letterSpacing: '-1px'
                    }}>
                        Discover & Book
                        <br />
                        <span className="gradient-text">Extraordinary Events</span>
                    </h1>

                    <p className="fade-in-up delay-2" style={{
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: '1.7'
                    }}>
                        From tech conferences to music festivals — find, book, and manage
                        world-class events all in one place.
                    </p>

                    <div className="fade-in-up delay-3" style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <a href="#events" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                            Explore Events <FaArrowRight />
                        </a>
                        <Link to="/register" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                            Get Started
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="fade-in-up delay-4" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '48px',
                        marginTop: '72px',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { value: '500+', label: 'Events Hosted' },
                            { value: '10K+', label: 'Happy Attendees' },
                            { value: '50+', label: 'Cities Worldwide' }
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    letterSpacing: '-0.5px'
                                }} className="gradient-text">
                                    {stat.value}
                                </div>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--text-muted)',
                                    marginTop: '4px',
                                    fontWeight: '500'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ EVENTS SECTION ============ */}
            <section id="events" className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container">
                    {/* Section header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 className="section-title">
                            Upcoming <span className="gradient-text">Events</span>
                        </h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Browse through our curated collection of exceptional events
                        </p>
                    </div>

                    {/* Category filter */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '40px',
                        flexWrap: 'wrap'
                    }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '10px 22px',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid',
                                    borderColor: activeCategory === cat ? 'transparent' : 'var(--border-subtle)',
                                    background: activeCategory === cat ? 'var(--gradient-primary)' : 'transparent',
                                    color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Events grid */}
                    {loading ? (
                        <LoadingSpinner size={48} text="Loading events..." />
                    ) : filteredEvents.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: 'var(--text-secondary)'
                        }}>
                            <p style={{ fontSize: '1.1rem' }}>No events found in this category.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '24px'
                        }}>
                            {filteredEvents.map((event, i) => (
                                <div key={event._id} className="fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ============ FEATURES SECTION ============ */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h2 className="section-title">
                            Why Choose <span className="gradient-text">Eventora?</span>
                        </h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Everything you need for a seamless event experience
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            {
                                icon: <FaRocket />,
                                title: 'Instant Booking',
                                desc: 'Book your tickets in seconds with our streamlined OTP verification process.',
                                color: 'var(--accent-cyan)'
                            },
                            {
                                icon: <FaShieldAlt />,
                                title: 'Secure & Verified',
                                desc: 'Every booking is OTP-verified ensuring maximum security for your transactions.',
                                color: 'var(--accent-purple)'
                            },
                            {
                                icon: <FaCalendarCheck />,
                                title: 'Event Management',
                                desc: 'Create, manage, and track events effortlessly with our admin dashboard.',
                                color: 'var(--accent-green)'
                            },
                            {
                                icon: <FaUsers />,
                                title: 'Community Driven',
                                desc: 'Join thousands of event enthusiasts discovering extraordinary experiences.',
                                color: 'var(--accent-pink)'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card" style={{
                                padding: '32px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: 'var(--radius-md)',
                                    background: `${feature.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '1.3rem',
                                    color: feature.color
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    marginBottom: '10px',
                                    color: 'var(--text-primary)'
                                }}>{feature.title}</h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.6'
                                }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            <section style={{
                padding: '100px 0',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.06) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />
                <div className="container" style={{
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: '900',
                        marginBottom: '16px',
                        lineHeight: '1.2'
                    }}>
                        Ready to Experience
                        <br />
                        <span className="gradient-text">Something Amazing?</span>
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.05rem',
                        maxWidth: '500px',
                        margin: '0 auto 36px',
                        lineHeight: '1.7'
                    }}>
                        Join Eventora today and never miss out on the events that matter to you.
                    </p>
                    <Link to="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem' }}>
                        Create Free Account <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
