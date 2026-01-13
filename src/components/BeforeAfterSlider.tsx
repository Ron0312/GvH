import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterProps {
    beforeImg: string;
    afterImg: string;
    alt: string;
}

export default function BeforeAfterSlider({ beforeImg, afterImg, alt }: BeforeAfterProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

        let position = ((clientX - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));

        setSliderPosition(position);
    };

    useEffect(() => {
        const handleUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging]);

    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        // Prevent default only for mouse to allow scrolling on touch unless strictly horizontal?
        // For simplicity, we don't prevent default unless necessary.
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize group shadow-premium"
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            role="slider"
            aria-valuenow={sliderPosition}
        >
            {/* After Image (Full width background) */}
            <img
                src={afterImg}
                alt={`${alt} - Nachher`}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />

            {/* Before Image (Clipped) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={beforeImg}
                    alt={`${alt} - Vorher`}
                    className="absolute top-0 left-0 max-w-none h-full object-cover"
                    style={{ width: containerRef.current?.offsetWidth || '100%' }} // Dynamic width adjustment might be needed or just 100vw/container width if predictable
                />
                {/* Improve: To make sure before image scales same as after image, it needs to be same size.
                    Using simple CSS relative/absolute stacking.
                    The inner img needs to be the width of the container.
                */}
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-dark">
                    <MoveHorizontal size={16} />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold backdrop-blur-sm pointer-events-none">
                Baustelle
            </div>
            <div className="absolute top-4 right-4 bg-brand-moss/80 text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold backdrop-blur-sm pointer-events-none">
                Vision
            </div>
        </div>
    );
}
