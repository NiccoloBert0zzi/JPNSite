"use client";
import { useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function StatsDashboard({ checklist, totalBudget }) {
    const stats = useMemo(() => {
        const booked = checklist.filter(c => c.status === 'done');
        const spent = booked.reduce((acc, curr) => acc + (curr.cost || 0), 0);
        const progress = Math.round((booked.length / checklist.length) * 100) || 0;

        // Countdown to October 3rd, 2026
        const tripDate = new Date('2026-10-03');
        const today = new Date();
        const diffTime = Math.abs(tripDate - today);
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return { spent, progress, daysLeft };
    }, [checklist]);

    useEffect(() => {
        if (stats.progress === 100) {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, shapes: ['circle', 'square', 'emoji'], scalar: 2, emoji: ['🎉', '🇯🇵'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, shapes: ['circle', 'square', 'emoji'], scalar: 2, emoji: ['🎉', '🇯🇵'] });
            }, 250);
        }
    }, [stats.progress]);

    return (
        <div className="dashboard">
            {/* Countdown Card */}
            <div className="card countdown-card">
                <h3>🇯🇵 Manca poco!</h3>
                <div className="countdown-number">{stats.daysLeft}</div>
                <div className="countdown-label">Giorni alla partenza</div>
            </div>

            {/* Budget Progress Card */}
            <div className="card budget-card">
                <h3>💰 Budget Prenotato</h3>
                <div className="budget-values">
                    <span className="spent">€{stats.spent.toLocaleString('it-IT')}</span>
                    <span className="total"> / €{totalBudget.toLocaleString('it-IT')}</span>
                </div>
                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${Math.min((stats.spent / totalBudget) * 100, 100)}%` }}
                    ></div>
                </div>
                <p className="budget-note">
                    Hai impegnato il <b>{Math.round((stats.spent / totalBudget) * 100)}%</b> del budget totale sicuro.
                </p>
            </div>

            {/* Tasks Progress Card */}
            <div className="card tasks-card">
                <h3>✅ Stato Prenotazioni</h3>
                <div className="donut-chart">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={`${stats.progress}, 100`}
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{stats.progress}%</text>
                    </svg>
                </div>
                <p>{checklist.filter(c => c.status === 'done').length} su {checklist.length} completati</p>
            </div>

            <style jsx>{`
                .dashboard {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    height: 100%;
                    align-content: start;
                }
                .card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transition: transform 0.2s;
                    aspect-ratio: 1 / 1;
                }
                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                
                /* Countdown */
                .countdown-card {
                    background: linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%);
                    color: white;
                    border: none;
                }
                .countdown-card h3 { color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; }
                .countdown-number {
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1;
                    margin: 0.5rem 0;
                }
                .countdown-label { font-size: 0.9rem; opacity: 0.9; }

                /* Budget */
                .budget-card { align-items: flex-start; text-align: left; }
                .budget-values { margin: 1rem 0 0.5rem 0; }
                .spent { font-size: 2rem; font-weight: 700; color: var(--foreground); }
                .total { color: #888; font-size: 1.2rem; }
                .progress-bar-container {
                    width: 100%;
                    height: 12px;
                    background: #eee;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-bottom: 0.5rem;
                }
                .progress-bar-fill {
                    height: 100%;
                    background: var(--primary); /* Assuming blue from globals */
                    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
                    border-radius: 6px;
                    transition: width 0.5s ease-out;
                }
                .budget-note { font-size: 0.8rem; color: #666; }

                /* Circular Chart */
                .circular-chart {
                    display: block;
                    margin: 10px auto;
                    max-width: 80%;
                    max-height: 250px;
                }
                .circle-bg {
                    fill: none;
                    stroke: #eee;
                    stroke-width: 3.8;
                }
                .circle {
                    fill: none;
                    stroke-width: 2.8;
                    stroke-linecap: round;
                    stroke: #10b981; /* Emerald green */
                    animation: progress 1s ease-out forwards;
                }
                .percentage {
                    fill: #333;
                    font-family: sans-serif;
                    font-weight: bold;
                    font-size: 0.5em;
                    text-anchor: middle;
                }
            `}</style>
        </div>
    );
}
