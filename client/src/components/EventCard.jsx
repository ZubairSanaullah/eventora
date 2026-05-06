import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const categoryColors = {
    Technology: 'badge',
    Music: 'badge badge-purple',
    Business: 'badge badge-amber',
    Art: 'badge badge-pink',
    Sports: 'badge badge-green',
};

const EventCard = ({ event }) => {
    const dateStr = new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Link to={`/events/${event._id}`} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{
                overflow: 'hidden',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                        src={event.imageUrl || event.image}
                        alt={event.title}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform var(--transition-slow)'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Price tag */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(8px)',
                        color: event.ticketPrice === 0 ? 'var(--accent-green)' : 'var(--accent-cyan)',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: '700'
                    }}>
                        {event.ticketPrice === 0 ? 'FREE' : `$${event.ticketPrice}`}
                    </div>
                    {/* Category badge */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px'
                    }}>
                        <span className={categoryColors[event.category] || 'badge'}>
                            {event.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    flex: 1
                }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {event.title}
                    </h3>

                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1
                    }}>
                        {event.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-subtle)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <FaCalendarAlt style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                            <span>{dateStr}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <FaMapMarkerAlt style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
                            <span style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
