import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const MagneticElement = ({ children, strength = 0.3, className = "" }: any) => {
    const elRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!elRef.current || window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = elRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * strength;
        const y = (clientY - (top + height / 2)) * strength;
        elRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const handleMouseLeave = () => {
        if (!elRef.current) return;
        elRef.current.style.transform = `translate3d(0, 0, 0)`;
    };
    return (
        <div ref={elRef} className={`magnetic-wrap ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {children}
        </div>
    );
};

export default function ContactForm() {
    const [formStep, setFormStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setFormSubmitted(true);
        }, 1500);
    };

    const setCursorMode = (active: boolean) => {
        if (typeof window !== 'undefined' && (window as any).setCursorMode) {
             (window as any).setCursorMode(active);
        }
    }

    return (
        <div className="bg-white p-10 md:p-24 lg:p-32 shadow-premium border border-gray-50 relative rounded-sm max-w-[1000px] mx-auto min-h-[400px] flex flex-col justify-center">
            {formSubmitted ? (
                <div className="text-center space-y-8 animate-in zoom-in duration-700">
                    <div className="w-20 h-20 bg-[#A0522D]/10 rounded-full flex items-center justify-center mx-auto text-[#A0522D]">
                        <CheckCircle size={48} />
                    </div>
                    <h3 className="text-4xl font-serif italic">Vielen Dank für Ihre Resonanz</h3>
                    <p className="text-gray-400 text-xl font-light italic leading-relaxed max-w-lg mx-auto">Sören von Hoerschelmann wird Ihre Vision sichten. Wir werden uns diskret mit Ihnen in Verbindung setzen.</p>
                    <a href="/" onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)} className="text-[#A0522D] uppercase text-[10px] font-black tracking-widest border-b border-[#A0522D] pb-1 hover:opacity-60 transition-opacity">Zurück zur Ouvertüre</a>
                </div>
            ) : (
                <>
                    <div className="mb-20 relative">
                        <div className="flex justify-between mb-6">
                            {['Vision', 'Volumen', 'Verbindung'].map((label, i) => (
                                <span key={label} className={`text-[9px] md:text-[11px] uppercase font-black tracking-widest transition-colors duration-700 ${formStep > i ? 'text-[#A0522D]' : 'text-gray-300'}`}>
                                    {label}
                                </span>
                            ))}
                        </div>
                        <div className="h-[1px] w-full bg-gray-100 relative">
                            <div className="absolute top-0 left-0 h-[1px] bg-[#A0522D] transition-all duration-1000 ease-in-out" style={{ width: `${((formStep - 1) / 2) * 100}%` }}>
                                <div className="absolute right-0 -top-1.5 w-3 h-3 bg-[#A0522D] rounded-full shadow-[0_0_10px_#A0522D]"></div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
                        {formStep === 1 && (
                            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700 text-center">
                                <h3 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A]">Welche Resonanz soll Ihr Garten erzeugen?</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {['Stille & Meditation', 'Repräsentative Ästhetik', 'Architektonische Strenge', 'Naturgetreue Wildnis'].map(o => (
                                        <button key={o} type="button" onClick={() => setFormStep(2)} onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)}
                                            className="group p-10 border border-gray-100 text-left transition-all bg-[#FDFCFB] hover:border-[#A0522D] hover:shadow-lg">
                                            <span className="block text-[8px] font-black uppercase tracking-widest text-gray-300 group-hover:text-[#A0522D] mb-4">Charakter</span>
                                            <span className="block text-xl md:text-2xl font-serif italic">{o}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formStep === 2 && (
                            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700 text-center">
                                <h3 className="text-3xl md:text-4xl font-serif italic">Welchen Raum geben wir der Vision?</h3>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    {[{ l: 'Private Refuge', r: '150k — 350k' }, { l: 'Estate Design', r: '350k — 750k' }, { l: 'Masterpiece', r: 'Exzellenz (1M+)' }].map(o => (
                                        <button key={o.l} type="button" onClick={() => setFormStep(3)} onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)}
                                            className="p-10 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 group">
                                            <span className="block text-[8px] font-black uppercase tracking-widest mb-6 opacity-40 group-hover:opacity-100">Dimension</span>
                                            <span className="block text-lg font-serif italic mb-2">{o.l}</span>
                                            <span className="block text-[9px] font-black tracking-widest">{o.r}</span>
                                        </button>
                                    ))}
                                </div>
                                <button type="button" onClick={() => setFormStep(1)} onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)} className="text-[9px] uppercase tracking-widest font-black opacity-30 hover:opacity-100 mt-12 transition-opacity">← Zurück zur Auswahl</button>
                            </div>
                        )}

                        {formStep === 3 && (
                            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                                <div className="text-center space-y-6">
                                    <h3 className="text-3xl md:text-4xl font-serif italic">Persönliche Orchestrierung</h3>
                                    <p className="text-gray-400 italic text-lg">Diskret für Ihr Erstgespräch.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-12">
                                    <input type="text" placeholder="IHR NAME" required className="w-full bg-transparent border-b border-gray-200 py-5 text-[10px] tracking-widest outline-none focus:border-[#A0522D] transition-colors" />
                                    <input type="email" placeholder="E-MAIL ADRESSE" required className="w-full bg-transparent border-b border-gray-200 py-5 text-[10px] tracking-widest outline-none focus:border-[#A0522D] transition-colors" />
                                    <textarea placeholder="PROJEKTSTANDORT ODER BESONDERE WÜNSCHE" rows={1} className="sm:col-span-2 w-full bg-transparent border-b border-gray-200 py-5 text-[10px] tracking-widest outline-none focus:border-[#A0522D] transition-colors resize-none"></textarea>
                                </div>
                                <div className="text-center pt-10">
                                    <MagneticElement strength={0.15}>
                                        <button type="submit" disabled={isSubmitting} onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)} className="group relative inline-flex items-center justify-center px-16 py-7 bg-[#A0522D] text-white overflow-hidden tracking-widest uppercase text-[10px] font-black disabled:opacity-50">
                                            <span className="relative z-10">{isSubmitting ? 'Verbinde...' : 'Das Gespräch eröffnen'}</span>
                                            <div className="absolute inset-0 bg-[#8B4513] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                        </button>
                                    </MagneticElement>
                                    <button type="button" onClick={() => setFormStep(2)} onMouseEnter={() => setCursorMode(true)} onMouseLeave={() => setCursorMode(false)} className="block mx-auto text-[9px] uppercase tracking-widest font-black opacity-30 hover:opacity-100 mt-12 transition-opacity">← Dimension anpassen</button>
                                </div>
                            </div>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}
