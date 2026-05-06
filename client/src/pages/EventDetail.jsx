import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTag, FaArrowLeft, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingStep, setBookingStep] = useState(0); // 0=idle, 1=otp-sent, 2=success
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Event not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleSendOtp = async () => {
        setBtnLoading(true);
        setError('');
        try {
            await api.post('/bookings/send-otp');
            setBookingStep(1);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setBtnLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        setError('');
        try {
            await api.post('/bookings', { eventId: id, otp });
            setBookingStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed.');
        } finally {
            setBtnLoading(false);
        }
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingSpinner size={48} text="Loading event..." /></div>;
    if (!event) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}><p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Event not found.</p><Link to="/" className="btn-secondary">Go Home</Link></div>;

    const dateStr = new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const seatsLeft = event.availableSeats ?? event.totalSeats;

    const spinner = <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />;

    return (
        <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
            {/* Hero Image */}
            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                <img src={event.imageUrl || event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.6) 100%)' }} />
                <div className="container" style={{ position: 'absolute', bottom: '32px', left: 0, right: 0 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '16px', transition: 'color var(--transition-fast)' }}
                        onMouseOver={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                        <FaArrowLeft /> Back to Events
                    </Link>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', lineHeight: '1.2', maxWidth: '700px' }}>{event.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '1000px' }}>
                    {/* Use responsive layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        {/* Left: Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                            {/* Info cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { icon: <FaCalendarAlt />, label: 'Date', value: dateStr, color: 'var(--accent-cyan)' },
                                    { icon: <FaMapMarkerAlt />, label: 'Location', value: event.location, color: 'var(--accent-purple)' },
                                    { icon: <FaUsers />, label: 'Seats Left', value: `${seatsLeft} / ${event.totalSeats}`, color: 'var(--accent-green)' },
                                    { icon: <FaTag />, label: 'Category', value: event.category, color: 'var(--accent-pink)' },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card-static" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <span style={{ color: item.color }}>{item.icon}</span> {item.label}
                                        </div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Description */}
                            <div>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>About This Event</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>{event.description}</p>
                            </div>
                        </div>

                        {/* Right: Booking Panel */}
                        <div>
                            <div className="glass-card-static" style={{ padding: '28px', position: 'sticky', top: '90px' }}>
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }} className="gradient-text">
                                        {event.ticketPrice === 0 ? 'FREE' : `$${event.ticketPrice}`}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>per ticket</p>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                                    {error && <div className="alert alert-error" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>{error}</div>}

                                    {bookingStep === 2 ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.4rem', color: 'var(--accent-green)' }}>✓</div>
                                            <p style={{ fontWeight: '700', marginBottom: '8px' }}>Booking Submitted!</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Your booking is pending admin confirmation.</p>
                                            <Link to="/dashboard" className="btn-primary btn-small" style={{ width: '100%' }}>View My Bookings</Link>
                                        </div>
                                    ) : bookingStep === 1 ? (
                                        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>Enter the OTP sent to your email</p>
                                            <input type="text" className="form-input" placeholder="Enter OTP" value={otp} onChange={e => { setOtp(e.target.value); setError(''); }} maxLength={6} style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '6px', fontWeight: '700' }} required />
                                            <button type="submit" className="btn-primary" disabled={btnLoading} style={{ width: '100%' }}>
                                                {btnLoading ? spinner : <><FaShieldAlt /> Confirm Booking</>}
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            {!user ? (
                                                <Link to="/login" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                                    <FaTicketAlt /> Login to Book
                                                </Link>
                                            ) : seatsLeft <= 0 ? (
                                                <button className="btn-primary" disabled style={{ width: '100%', opacity: 0.5 }}>Sold Out</button>
                                            ) : (
                                                <button onClick={handleSendOtp} className="btn-primary" disabled={btnLoading} style={{ width: '100%' }}>
                                                    {btnLoading ? spinner : <><FaTicketAlt /> Book Now</>}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '20px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <span>Time: {timeStr}</span>
                                    <span>{seatsLeft} seats left</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
