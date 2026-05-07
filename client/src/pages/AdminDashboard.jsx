import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaCalendarAlt, FaTimes, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
    const [tab, setTab] = useState('events');
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', date: '', location: '', category: 'Technology', totalSeats: '', ticketPrice: '', imageUrl: '' });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const [evRes] = await Promise.all([api.get('/events')]);
            setEvents(evRes.data);
            // Fetch bookings for each event's users (admin sees all via my-bookings or a workaround)
            try {
                const bkRes = await api.get('/bookings/all');
                setBookings(bkRes.data);
            } catch (e) {
                console.error('Failed to fetch bookings:', e);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ title: '', description: '', date: '', location: '', category: 'Technology', totalSeats: '', ticketPrice: '', imageUrl: '' });
        setEditEvent(null);
        setError('');
    };

    const openCreate = () => { resetForm(); setShowModal(true); };

    const openEdit = (ev) => {
        setEditEvent(ev);
        setForm({
            title: ev.title, description: ev.description,
            date: ev.date ? new Date(ev.date).toISOString().split('T')[0] : '',
            location: ev.location, category: ev.category,
            totalSeats: ev.totalSeats, ticketPrice: ev.ticketPrice, imageUrl: ev.imageUrl || ''
        });
        setError('');
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const payload = { ...form, availableSeats: form.totalSeats };
        try {
            if (editEvent) {
                const { data } = await api.put(`/events/${editEvent._id}`, payload);
                setEvents(prev => prev.map(ev => ev._id === data._id ? data : ev));
            } else {
                const { data } = await api.post('/events', payload);
                setEvents(prev => [...prev, data]);
            }
            setShowModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save event.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this event permanently?')) return;
        try {
            await api.delete(`/events/${id}`);
            setEvents(prev => prev.filter(ev => ev._id !== id));
        } catch (err) {
            alert('Failed to delete event.');
        }
    };

    const handleConfirmBooking = async (id, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}/confirm`, { paymentStatus });
            setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'confirmed', paymentStatus } : b));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to confirm.');
        }
    };

    const categories = ['Technology', 'Music', 'Business', 'Art', 'Sports'];
    const spinner = <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />;

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingSpinner size={48} text="Loading dashboard..." /></div>;

    return (
        <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Manage events and bookings</p>
                    </div>
                    <button onClick={openCreate} className="btn-primary"><FaPlus /> Create Event</button>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    {[
                        { label: 'Total Events', value: events.length, color: 'var(--accent-cyan)', icon: <FaCalendarAlt /> },
                        { label: 'Total Bookings', value: bookings.length, color: 'var(--accent-purple)', icon: <FaChartBar /> },
                        { 
                            label: 'Total Revenue', 
                            value: `$${bookings.reduce((s, b) => s + (b.amount || 0), 0).toLocaleString()}`, 
                            color: 'var(--accent-green)', 
                            icon: <FaChartBar />,
                            sub: `${bookings.filter(b => b.paymentStatus === 'paid').length} Paid`
                        },
                    ].map((s, i) => (
                        <div key={i} className="glass-card-static" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.4rem' }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: s.color, lineHeight: '1.2' }}>{s.value}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
                                {s.sub && <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: '600', marginTop: '4px' }}>{s.sub}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Revenue Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <div className="glass-card-static" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaChartBar style={{ color: 'var(--accent-cyan)' }} /> Revenue Breakdown
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Paid Revenue', amount: bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + (b.amount || 0), 0), color: 'var(--accent-green)' },
                                { label: 'Pending Revenue', amount: bookings.filter(b => b.paymentStatus === 'non-paid').reduce((s, b) => s + (b.amount || 0), 0), color: 'var(--accent-amber)' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                                        <span style={{ fontWeight: '700', color: item.color }}>${item.amount.toLocaleString()}</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ 
                                            height: '100%', 
                                            background: item.color, 
                                            width: `${(item.amount / (bookings.reduce((s, b) => s + (b.amount || 0), 0) || 1)) * 100}%` 
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card-static" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaCalendarAlt style={{ color: 'var(--accent-purple)' }} /> Top Events by Revenue
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {events
                                .map(ev => ({
                                    title: ev.title,
                                    revenue: bookings.filter(b => b.eventId?._id === ev._id && b.paymentStatus === 'paid').reduce((s, b) => s + (b.amount || 0), 0)
                                }))
                                .sort((a, b) => b.revenue - a.revenue)
                                .slice(0, 3)
                                .map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.title}</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>${item.revenue.toLocaleString()}</span>
                                    </div>
                                ))}
                            {events.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>No events data</p>}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '28px', display: 'inline-flex' }}>
                    <button className={`tab ${tab === 'events' ? 'tab-active' : ''}`} onClick={() => setTab('events')}>Events</button>
                    <button className={`tab ${tab === 'bookings' ? 'tab-active' : ''}`} onClick={() => setTab('bookings')}>Bookings</button>
                </div>

                {/* Events Tab */}
                {tab === 'events' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {events.length === 0 ? (
                            <div className="glass-card-static" style={{ padding: '60px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-secondary)' }}>No events yet. Create your first event!</p>
                            </div>
                        ) : events.map(ev => (
                            <div key={ev._id} className="glass-card-static" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                                {ev.imageUrl && <img src={ev.imageUrl} alt="" style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />}
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>{ev.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        <span>{new Date(ev.date).toLocaleDateString()}</span>
                                        <span>{ev.category}</span>
                                        <span>{ev.totalSeats} seats</span>
                                        <span>{ev.ticketPrice === 0 ? 'Free' : `$${ev.ticketPrice}`}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => openEdit(ev)} className="btn-secondary btn-small"><FaEdit /> Edit</button>
                                    <button onClick={() => handleDelete(ev._id)} className="btn-danger btn-small"><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bookings Tab */}
                {tab === 'bookings' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {bookings.length === 0 ? (
                            <div className="glass-card-static" style={{ padding: '60px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-secondary)' }}>No bookings to display.</p>
                            </div>
                        ) : bookings.map(b => (
                            <div key={b._id} className="glass-card-static" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>{b.eventId?.title || 'Unknown'}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        <span>Amount: ${b.amount}</span>
                                        <span className={b.status === 'confirmed' || b.status === 'approved' ? 'badge badge-green' : b.status === 'pending' ? 'badge badge-amber' : 'badge badge-red'}>{b.status}</span>
                                        <span className={b.paymentStatus === 'paid' ? 'badge badge-green' : 'badge badge-red'}>{b.paymentStatus}</span>
                                    </div>
                                </div>
                                {b.status === 'pending' && (
                                    <button onClick={() => handleConfirmBooking(b._id, 'paid')} className="btn-primary btn-small"><FaCheck /> Confirm</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{editEvent ? 'Edit Event' : 'Create Event'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.1rem' }}><FaTimes /></button>
                        </div>
                        {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}>{error}</div>}
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
                                <div className="form-group"><label className="form-label">Category</label><select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            </div>
                            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label className="form-label">Total Seats</label><input type="number" className="form-input" value={form.totalSeats} onChange={e => setForm({ ...form, totalSeats: e.target.value })} required /></div>
                                <div className="form-group"><label className="form-label">Ticket Price ($)</label><input type="number" className="form-input" value={form.ticketPrice} onChange={e => setForm({ ...form, ticketPrice: e.target.value })} required /></div>
                            </div>
                            <div className="form-group"><label className="form-label">Image URL</label><input className="form-input" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/..." /></div>
                            <button type="submit" className="btn-primary" disabled={saving} style={{ width: '100%', marginTop: '8px' }}>
                                {saving ? spinner : editEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
