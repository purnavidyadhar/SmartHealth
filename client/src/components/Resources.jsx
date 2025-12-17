import React, { useState } from 'react';
import { BookOpen, Droplets, Shield, PhoneCall, FileText, Download, Play, ExternalLink, ChevronDown, ChevronUp, LifeBuoy, Info, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../assets/hero2.jpg';

const Resources = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        { q: "What should I do if the water looks cloudy?", a: "Do not consume it directly. Let it settle, filter it using a clean cloth, and then boil strictly for at least 15 minutes. Use chlorine tablets if available." },
        { q: "Who do I contact for a sudden outbreak?", a: "Immediately perform a 'Report Case' on this platform and contact the 24/7 Health Helpline at 104. Isolate the affected individual." },
        { q: "Where can I get chlorine tablets?", a: "Chlorine tablets are distributed by local ASHA workers and community health centers. Check the 'Centers' map for the nearest supply point." }
    ];

    const guides = [
        { title: "Water Purification Guide", type: "TXT", size: "2 KB", color: "#3b82f6", link: "/SmartHealth/downloads/water_guide.txt" },
        { title: "Standard Sanitation Protocols", type: "TXT", size: "2 KB", color: "#10b981", link: "/SmartHealth/downloads/sanitation_protocols.txt" },
        { title: "Emergency Contact Directory", type: "TXT", size: "1 KB", color: "#f59e0b", link: "/SmartHealth/downloads/emergency_contacts.txt" },
        { title: "Malaria Prevention Steps", type: "TXT", size: "2 KB", color: "#ef4444", link: "/SmartHealth/downloads/malaria_prevention.txt" }
    ];

    const handleDownload = (link) => {
        const a = document.createElement('a');
        a.href = link;
        a.download = link.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="container" style={{ maxWidth: '1600px', padding: '0 2rem' }}>

            {/* --- HERO SECTION --- */}
            <header style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)', minHeight: '250px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                    <img src={heroImage} alt="Community Health" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 60%, transparent 100%)' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '2rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#93c5fd', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem', backdropFilter: 'blur(4px)' }}>
                            <BookOpen size={16} /> EDUCATIONAL HUB
                        </div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Public Health <br />
                            <span style={{ background: 'linear-gradient(to right, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Knowledge Center
                            </span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '600px', lineHeight: 1.6 }}>
                            Access vital safety guidelines, download official protocols, and find emergency contacts for your region.
                        </p>
                    </motion.div>

                    {/* Quick Stats Cards */}
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa' }}>24/7</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Helpline</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>12+</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Protocols</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CORE GUIDELINES GRID --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-panel"
                    style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0) 100%)', border: '1px solid rgba(14, 165, 233, 0.2)' }}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <Droplets size={32} color="#0ea5e9" />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-heading)' }}>Water Safety</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Boil water for at least 20 minutes',
                            'Use distributed chlorine tablets',
                            'Store in sealed, elevated containers',
                            'Avoid direct river water consumption'
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-panel"
                    style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <Shield size={32} color="#10b981" />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-heading)' }}>Disease Prevention</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Maintain rigorous hand hygiene',
                            'Isolate symptomatic individuals',
                            'Clear stagnant water around homes',
                            'Use mosquito nets at night'
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-panel"
                    style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0) 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <LifeBuoy size={32} color="#ef4444" />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-heading)' }}>Emergency Action</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '1rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ambulance</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444' }}>108</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '1rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Helpline</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444' }}>104</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- DOWNLOADS & MEDIA --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', marginBottom: '4rem' }}>

                {/* Downloadable Library */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-heading)' }}>Resource Library</h2>
                        <button style={{ padding: '0.8rem 1.5rem', borderRadius: '2rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}>View Archive</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {guides.map((guide, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                                onClick={() => handleDownload(guide.link)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.8rem', background: `rgba(${parseInt(guide.color.slice(1, 3), 16)}, ${parseInt(guide.color.slice(3, 5), 16)}, ${parseInt(guide.color.slice(5, 7), 16)}, 0.1)`, borderRadius: '0.8rem', color: guide.color }}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{guide.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{guide.type} • {guide.size}</div>
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDownload(guide.link); }} style={{ padding: '0.6rem', background: 'var(--bg-main)', borderRadius: '50%', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <Download size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Video / Visuals Box */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '2rem', padding: '2rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '300px' }}>
                    <div>
                        <div style={{ width: '50px', height: '50px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)' }}>
                            <Play size={24} color="white" style={{ marginLeft: '4px' }} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hygiene Tutorial</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            Watch our detailed 5-minute guide on proper water sanitation techniques for rural households.
                        </p>
                    </div>
                    <a href="https://youtu.be/pTBfPf0Z3FE?si=0XF9O4owsnp6-vXU" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                        <button style={{ width: '100%', padding: '1rem', borderRadius: '1rem', background: 'var(--text-main)', color: 'var(--bg-main)', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                            Watch Now <ExternalLink size={18} />
                        </button>
                    </a>
                </div>
            </div>



            {/* --- FAQ SECTION --- */}
            <div style={{ maxWidth: '800px', margin: '0 auto 6rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Common Questions</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Quick answers to the most frequent community concerns.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                            <button
                                onClick={() => toggleFaq(i)}
                                style={{ width: '100%', padding: '1.5rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>{faq.q}</span>
                                {openFaq === i ? <ChevronUp color="var(--primary)" /> : <ChevronDown color="var(--text-muted)" />}
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
