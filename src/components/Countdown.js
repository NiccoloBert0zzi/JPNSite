"use client";
import { useState, useEffect } from 'react';

function pad(n) {
    return String(n).padStart(2, '0');
}

function getTimeLeft(targetDate) {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

/** @param {{ startDate: string }} props */
export default function Countdown({ startDate }) {
    // null = server/not yet hydrated; undefined = date in the past; object = active countdown
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const update = () => setTimeLeft(getTimeLeft(startDate));
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
     
    }, [startDate]);

    // Don't render until hydrated to avoid mismatch
    if (timeLeft === null) return null;

    // Date is in the past
    if (!timeLeft) {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Buon viaggio!
            </div>
        );
    }

    const units = [
        { value: timeLeft.days, label: 'giorni' },
        { value: timeLeft.hours, label: 'ore' },
        { value: timeLeft.minutes, label: 'min' },
        { value: timeLeft.seconds, label: 'sec' },
    ];

    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">Partenza tra</p>
            <div className="flex items-end gap-2">
                {units.map(({ value, label }, i) => (
                    <div key={label} className="flex items-end gap-2">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2 min-w-[52px] text-center">
                                <span className="text-white font-bold text-2xl font-display tabular-nums">
                                    {pad(value)}
                                </span>
                            </div>
                            <span className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{label}</span>
                        </div>
                        {i < units.length - 1 && (
                            <span className="text-white/40 font-bold text-xl mb-4">:</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
