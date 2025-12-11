import React, { useState } from 'react';
import {
    Send, CheckCircle2, MapPin,
    Thermometer, Droplets, Activity,
    ShieldAlert, AlertTriangle, Info,
    ChevronDown, LocateFixed, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ReportForm = () => {
    const { token } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState('idle');
    const [activeSection, setActiveSection] = useState(0);

    const [form, setForm] = useState({
        state: 'Assam',
        location: '',
        symptoms: [],
        severity: 'Low',
        waterSource: '',
        notes: ''
    });

    const NORTH_EAST_STATES = [
        "Arunachal Pradesh", "Assam", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Sikkim", "Tripura"
    ];

    const toggleSymptom = (id) => {
        setForm(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(id)
                ? prev.symptoms.filter(s => s !== id)
                : [...prev.symptoms, id]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('http://localhost:5000/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    setStatus('idle');
                    setForm({ state: 'Assam', location: '', symptoms: [], severity: 'Low', waterSource: '', notes: '' });
                }, 4000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    // UI Components
    const GlassCard = ({ children, className = "" }) => (
        <div className={`glass-panel ${className}`} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
            {children}
        </div>
    );

    const StepIndicator = ({ active }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingRight: '2rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            {[
                { icon: MapPin, label: "Location" },
                { icon: Activity, label: "Symptoms" },
                { icon: ShieldAlert, label: "Analysis" }
            ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: active >= idx ? 1 : 0.4 }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: active >= idx ? '#10b981' : 'transparent',
                        border: active >= idx ? 'none' : '1px solid #94a3b8',
                        color: active >= idx ? 'white' : '#94a3b8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s'
                    }}>
                        <step.icon size={20} />
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>{step.label}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at top right, #064e3b 0%, #0f172a 60%, #020617 100%)',
            padding: '4rem 2rem',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>

                {/* Header */}
                <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: '20px', color: '#34d399', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem'
                        }}>
                            <ShieldAlert size={16} /> Secure Health Uplink
                        </motion.div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
                            Submit Field Report
                        </h1>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '4rem' }}>

                    {/* Left Sidebar (Desktop) */}
                    <div className="hidden-mobile" style={{ paddingTop: '2rem' }}>
                        <StepIndicator active={activeSection} />

                        <div style={{ marginTop: '4rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Info size={16} /> Protocols
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                                Accurate reporting is crucial for predictive modeling. Ensure location coordinates are verified before transmission.
                            </p>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <GlassCard className="form-container">
                        <form onSubmit={handleSubmit} style={{ padding: '3rem' }}>

                            {/* Success Overlay */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        style={{
                                            position: 'absolute', inset: 0, background: 'rgba(6, 78, 59, 0.95)',
                                            backdropFilter: 'blur(10px)', zIndex: 50, borderRadius: '24px',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{ padding: '1.5rem', background: '#34d399', borderRadius: '50%', marginBottom: '1.5rem' }}>
                                            <CheckCircle2 size={48} color="#064e3b" />
                                        </div>
                                        <h2 style={{ fontSize: '2rem', color: 'white', fontWeight: 800 }}>Report Secured</h2>
                                        <p style={{ color: '#a7f3d0' }}>ID: {Math.floor(Math.random() * 1000000)}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Section 1: Location */}
                            <div style={{ marginBottom: '3rem' }} onFocus={() => setActiveSection(0)}>
                                <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ color: '#34d399' }}>01.</span> Location Vector
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>State Jurisdiction</label>
                                        <div style={{ position: 'relative' }}>
                                            <select
                                                value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}
                                                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', appearance: 'none' }}
                                            >
                                                {NORTH_EAST_STATES.map(s => <option key={s} value={s} style={{ background: '#0f172a' }}>{s}</option>)}
                                            </select>
                                            <ChevronDown style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }} color="white" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Precise Sector / Village</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                                                placeholder="e.g. Sonapur, Kamrup District"
                                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }}
                                            />
                                            <LocateFixed style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} color="white" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Symptoms */}
                            <div style={{ marginBottom: '3rem' }} onFocus={() => setActiveSection(1)}>
                                <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ color: '#34d399' }}>02.</span> Observable Symptoms
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
                                    {[
                                        { id: 'Fever', icon: Thermometer },
                                        { id: 'Diarrhea', icon: Droplets },
                                        { id: 'Vomiting', icon: Activity },
                                        { id: 'Skin Rash', icon: ShieldAlert },
                                        { id: 'Fatigue', icon: Activity }
                                    ].map(sym => {
                                        const isActive = form.symptoms.includes(sym.id);
                                        return (
                                            <div
                                                key={sym.id} onClick={() => toggleSymptom(sym.id)}
                                                style={{
                                                    padding: '1.25rem', borderRadius: '16px', cursor: 'pointer',
                                                    background: isActive ? '#10b981' : 'rgba(255,255,255,0.03)',
                                                    border: isActive ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                                                    transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '0.75rem'
                                                }}
                                            >
                                                <sym.icon size={24} color={isActive ? 'white' : '#94a3b8'} />
                                                <span style={{ color: isActive ? 'white' : '#94a3b8', fontWeight: 600 }}>{sym.id}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Section 3: Analysis */}
                            <div style={{ marginBottom: '3rem' }} onFocus={() => setActiveSection(2)}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ color: '#34d399' }}>03.</span> Suspected Source
                                        </h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                            {['River', 'Well', 'Pond', 'Tank', 'Other'].map(src => (
                                                <button
                                                    key={src} type="button"
                                                    onClick={() => setForm({ ...form, waterSource: src })}
                                                    style={{
                                                        padding: '0.75rem 1.25rem', borderRadius: '50px', border: 'none',
                                                        background: form.waterSource === src ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                                                        color: form.waterSource === src ? '#082f49' : '#cbd5e1',
                                                        fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                                                    }}
                                                >
                                                    {src}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ color: '#ef4444' }}>04.</span> Severity
                                        </h3>
                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '16px', display: 'flex' }}>
                                            {['Low', 'Medium', 'High'].map(lvl => (
                                                <button
                                                    key={lvl} type="button"
                                                    onClick={() => setForm({ ...form, severity: lvl })}
                                                    style={{
                                                        flex: 1, padding: '0.75rem', borderRadius: '12px', border: 'none',
                                                        background: form.severity === lvl ? (lvl === 'High' ? '#ef4444' : lvl === 'Medium' ? '#f59e0b' : '#10b981') : 'transparent',
                                                        color: form.severity === lvl ? 'white' : '#64748b',
                                                        fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {lvl}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                type="submit" disabled={submitting}
                                style={{
                                    width: '100%', padding: '1.25rem', borderRadius: '16px',
                                    background: 'linear-gradient(to right, #10b981, #059669)',
                                    border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 800,
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                                }}
                            >
                                {submitting ? <Activity className="spin" /> : <>TRANSMIT DATA <ArrowRight /></>}
                            </motion.button>

                        </form>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ReportForm;
