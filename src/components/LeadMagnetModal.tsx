import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Download } from 'lucide-react';

export default function LeadMagnetModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Trigger after 15 seconds if not already shown
        const timer = setTimeout(() => {
            const seen = localStorage.getItem('gvh_vision_seen');
            if (!seen) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('gvh_vision_seen', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setStep(2), 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-slate/80 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="relative bg-[#FDFCFB] w-full max-w-4xl grid md:grid-cols-2 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>

                {/* Image Side */}
                <div className="relative hidden md:block bg-brand-slate">
                    <img src="https://images.unsplash.com/photo-1558293842-c0fd3db86157?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay grayscale" alt="Vision Paper Cover" />
                    <div className="absolute inset-0 p-12 flex flex-col justify-between text-white">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-sand">Limited Edition</span>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-serif italic">Vision Paper</h3>
                            <p className="text-sm font-light opacity-80 leading-relaxed">„Die 5 Regeln für Gärten am Elbhang“ — Ein Leitfaden für Bauherren, die das Besondere suchen.</p>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="p-10 md:p-16 flex flex-col justify-center text-center md:text-left">
                    {step === 1 ? (
                        <>
                            <span className="text-brand-moss text-[9px] uppercase tracking-widest font-bold mb-6 block">Exklusiver Download</span>
                            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-brand-dark">Vermeiden Sie die 5 häufigsten Fehler bei Hanglagen.</h2>
                            <p className="text-gray-500 font-light italic mb-10 text-sm leading-relaxed">Erfahren Sie, wie wir statische Herausforderungen in atemberaubende Architektur verwandeln. Sichern Sie sich unser Vision Paper.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    required
                                    placeholder="Ihre E-Mail Adresse"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b border-gray-300 py-3 text-sm focus:border-brand-earth outline-none bg-transparent transition-colors text-center md:text-left"
                                />
                                <button type="submit" className="w-full bg-brand-earth text-white py-4 uppercase text-[10px] font-black tracking-widest hover:bg-brand-slate transition-colors flex items-center justify-center gap-2 group">
                                    <span>Jetzt anfordern</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                            <p className="mt-6 text-[8px] text-gray-400 uppercase tracking-wider">Wir respektieren Ihre Privatsphäre. Kein Spam.</p>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-brand-moss/10 text-brand-moss rounded-full flex items-center justify-center mx-auto mb-6">
                                <Download size={32} />
                            </div>
                            <h3 className="text-2xl font-serif italic mb-4">Vielen Dank.</h3>
                            <p className="text-gray-500 text-sm mb-8">Ihr Vision Paper ist auf dem Weg zu Ihnen ({email}).</p>
                            <button onClick={handleClose} className="text-[10px] uppercase font-bold tracking-widest text-brand-earth hover:text-brand-dark transition-colors">Zurück zur Website</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
