"use client";

export default function HeroShell() {
    return (
        <section
            className="relative h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            <div
                className="w-40 h-40 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
                    animation: "globeShellPulse 1.2s ease-in-out infinite",
                }}
            />
            <style jsx>{`
                @keyframes globeShellPulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </section>
    );
}
