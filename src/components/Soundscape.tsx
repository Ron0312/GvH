import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function Soundscape() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Nature sounds (Wind, Birds, distant water)
        // Using a reliable CDN placeholder or base64 if short.
        // For this demo, using a placeholder URL. In production, this should be a local asset.
        audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2021/09/06/audio_173003010c.mp3?filename=nature-sounds-forest-birds-and-river-10657.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Autoplay prevented", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={toggleSound}
            className="fixed bottom-8 right-24 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-brand-moss transition-all duration-500 group hidden lg:flex items-center gap-2 overflow-hidden"
            aria-label="Soundscape toggle"
        >
            <span className="w-0 overflow-hidden group-hover:w-auto group-hover:pr-2 transition-all duration-500 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap opacity-0 group-hover:opacity-100">
                {isPlaying ? 'Stille' : 'Soundscape'}
            </span>
            {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
    );
}
