import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCalendarAlt, FaTicketAlt, FaTimes, FaSearch } from 'react-icons/fa';

const statusBadge = (status) => {
    const map = { pending: 'badge badge-amber', confirmed: 'badge badge-green', approved: 'badge badge-green', cancelled: 'badge badge-red' };
    return map[status] || 'badge';
};

const paymentBadge = (status) => {
    return status === 'paid' ? 'badge badge-green' : 'badge badge-red';
};

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        setCancellingId(id);
        try {
            await api.put(`/bookings/${id}`);
            setBookings(prev => prev.filter(b => b._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel.');
        } finally {
            setCancellingId(null);
        }
    };

    const filtered = bookings.filter(b => {
        const eventTitle = b.eventId?.title || '';
        return eventTitle.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
                        My <span className="gradient-text">Bookings</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Welcome back, {user?.name}! Here are your event bookings.
                    </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    {[
                        { label: 'Total Bookings', value: bookings.length, color: 'var(--accent-cyan)' },
                        { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed' || b.status === 'approved').length, color: 'var(--accent-green)' },
                        { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'var(--accent-amber)' },
                    ].map((s, i) => (
                        <div key={i} className="glass-card-static" style={{ padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
                    <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                    <input type="text" className="form-input" placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '40px' }} />
                </div>

                {/* Content */}
                {loading ? (
                    <LoadingSpinner size={48} text="Loading bookings..." />
                ) : filtered.length === 0 ? (
                    <div className="glass-card-static" style={{ padding: '60px 20px', textAlign: 'center' }}>
                        <FaTicketAlt style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '16px' }} />
                        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>No bookings found</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Start exploring events and book your first ticket!</p>
                        <Link to="/" className="btn-primary btn-small">Browse Events</Link>
                    </div>
                ) : (
                    /* Mobile-friendly card layout */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {filtered.map(booking => (
                            <div key={booking._id} className="glass-card-static" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                                {/* Event image */}
                                {booking.eventId?.imageUrl && (
                                    <img src={booking.eventId.imageUrl} alt="" style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }} />
                                )}
                                {/* Info */}
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <Link to={`/events/${booking.eventId?._id}`} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem' }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                                        {booking.eventId?.title || 'Unknown Event'}
                                    </Link>
                                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {booking.eventId?.date && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCalendarAlt style={{ color: 'var(--accent-cyan)' }} /> {new Date(booking.eventId.date).toLocaleDateString()}</span>}
                                        <span>Amount: ${booking.amount}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                                        <span className={statusBadge(booking.status)}>{booking.status}</span>
                                        <span className={paymentBadge(booking.paymentStatus)}>{booking.paymentStatus}</span>
                                    </div>
                                </div>
                                {/* Actions */}
                                {booking.status !== 'cancelled' && (
                                    <button onClick={() => handleCancel(booking._id)} className="btn-danger btn-small" disabled={cancellingId === booking._id}>
                                        {cancellingId === booking._id ? '...' : <><FaTimes /> Cancel</>}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
