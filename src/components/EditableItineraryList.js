"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { updateData } from "@/app/actions";
import Link from 'next/link';
import { Trash2, Plus, Save, X, ArrowUp, ArrowDown } from "lucide-react";

export default function EditableItineraryList({ initialData, tripId }) {
    const { isEditMode } = useAdmin();
    const [data, setData] = useState(initialData);
    const [originalData, setOriginalData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setData(initialData);
        setOriginalData(initialData);
    }, [initialData]);

    // Update a Day field
    const handleDayChange = (dayIndex, field, value) => {
        setData(prev => prev.map((day, i) =>
            i === dayIndex ? { ...day, [field]: value } : day
        ));
        setIsDirty(true);
    };

    // Update an Activity field
    const handleActivityChange = (dayIndex, activityIndex, field, value) => {
        setData(prev => prev.map((day, i) => {
            if (i !== dayIndex) return day;
            const newDetails = day.details.map((act, j) =>
                j === activityIndex ? { ...act, [field]: value } : act
            );
            return { ...day, details: newDetails };
        }));
        setIsDirty(true);
    };

    // Add Activity
    const handleAddActivity = (dayIndex) => {
        const newActivity = {
            time: "09:00",
            activity: "Nuova Tappa",
            type: "visit" // default
        };
        setData(prev => prev.map((day, i) =>
            i === dayIndex ? { ...day, details: [...day.details, newActivity] } : day
        ));
        setIsDirty(true);
    };

    // Delete Activity
    const handleDeleteActivity = (dayIndex, activityIndex) => {
        if (!confirm("Eliminare questa tappa?")) return;
        setData(prev => prev.map((day, i) => {
            if (i !== dayIndex) return day;
            return { ...day, details: day.details.filter((_, j) => j !== activityIndex) };
        }));
        setIsDirty(true);
    };

    // Move Activity Up
    const moveActivityUp = (dayIndex, activityIndex) => {
        if (activityIndex === 0) return;
        setData(prev => prev.map((day, i) => {
            if (i !== dayIndex) return day;
            const newDetails = [...day.details];
            [newDetails[activityIndex - 1], newDetails[activityIndex]] = [newDetails[activityIndex], newDetails[activityIndex - 1]];
            return { ...day, details: newDetails };
        }));
        setIsDirty(true);
    };

    // Move Activity Down
    const moveActivityDown = (dayIndex, activityIndex) => {
        setData(prev => prev.map((day, i) => {
            if (i !== dayIndex) return day;
            if (activityIndex === day.details.length - 1) return day;
            const newDetails = [...day.details];
            [newDetails[activityIndex + 1], newDetails[activityIndex]] = [newDetails[activityIndex], newDetails[activityIndex + 1]];
            return { ...day, details: newDetails };
        }));
        setIsDirty(true);
    };

    // Handle Highlights (comma separated)
    const handleHighlightsChange = (dayIndex, value) => {
        const highlights = value.split(',').map(s => s.trim()).filter(s => s);
        handleDayChange(dayIndex, 'highlights', highlights);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const res = await updateData(tripId, 'itinerary', data);
        setIsSaving(false);
        if (res.success) {
            setOriginalData(data);
            setIsDirty(false);
            alert("Itinerario salvato!");
        } else {
            alert("Errore: " + res.error);
        }
    };

    const handleCancel = () => {
        setData(originalData);
        setIsDirty(false);
    };

    return (
        <div className="relative">
            {/* Dirty State Floating Bar */}
            {isDirty && isEditMode && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-4 animate-in slide-in-from-bottom-4">
                    <span className="font-bold">Modifiche non salvate</span>
                    <button onClick={handleSave} disabled={isSaving} className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-gray-200">
                        {isSaving ? 'Salvataggio...' : 'Salva'}
                    </button>
                    <button onClick={handleCancel} className="p-1 hover:bg-white/20 rounded-full">
                        <X size={20} />
                    </button>
                </div>
            )}

            <div className="timeline">
                {data.map((day, dayIndex) => (
                    <div key={day.date || dayIndex} className="day-wrapper">
                        {/* If not edit mode, wrap in Link, else standard div for editing */}
                        {isEditMode ? (
                            <div className="day-card edit-mode-card">
                                <div className="date-badge">
                                    <span className="day-name">{day.day}</span>
                                    <span className="day-date">{day.date.split('-').reverse().join('/')}</span>
                                </div>

                                <div className="day-content w-full">
                                    {/* HEADER EDIT */}
                                    <div className="flex flex-col gap-2 mb-4 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                                        <label className="text-xs uppercase font-bold text-gray-400">Titolo Giorno</label>
                                        <input
                                            value={day.title}
                                            onChange={(e) => handleDayChange(dayIndex, 'title', e.target.value)}
                                            className="font-bold text-xl bg-transparent border-b border-gray-300 focus:border-black outline-none"
                                        />

                                        <label className="text-xs uppercase font-bold text-gray-400 mt-2">Location</label>
                                        <input
                                            value={day.location}
                                            onChange={(e) => handleDayChange(dayIndex, 'location', e.target.value)}
                                            className="text-sm bg-transparent border-b border-gray-300 focus:border-black outline-none"
                                        />

                                        <label className="text-xs uppercase font-bold text-gray-400 mt-2">Highlights (separati da virgola)</label>
                                        <input
                                            value={day.highlights.join(', ')}
                                            onChange={(e) => handleHighlightsChange(dayIndex, e.target.value)}
                                            className="text-sm bg-transparent border-b border-gray-300 focus:border-black outline-none"
                                        />
                                    </div>

                                    {/* ACTIVITIES EDIT */}
                                    <div className="activities-list space-y-2">
                                        {day.details.map((detail, actIndex) => (
                                            <div key={actIndex} className="flex items-start gap-2 bg-white p-2 border rounded-lg shadow-sm">
                                                <div className="flex flex-col gap-1 pt-1">
                                                    <button onClick={() => moveActivityUp(dayIndex, actIndex)} className="text-gray-400 hover:text-black"><ArrowUp size={14} /></button>
                                                    <button onClick={() => moveActivityDown(dayIndex, actIndex)} className="text-gray-400 hover:text-black"><ArrowDown size={14} /></button>
                                                </div>

                                                <div className="flex-1 grid grid-cols-[80px_1fr] gap-2">
                                                    <input
                                                        value={detail.time}
                                                        onChange={(e) => handleActivityChange(dayIndex, actIndex, 'time', e.target.value)}
                                                        className="text-sm font-bold bg-gray-50 p-1 rounded border-none w-full"
                                                    />
                                                    <input
                                                        value={detail.activity}
                                                        onChange={(e) => handleActivityChange(dayIndex, actIndex, 'activity', e.target.value)}
                                                        className="text-sm p-1 border-b border-transparent focus:border-gray-300 outline-none w-full"
                                                    />
                                                </div>

                                                <button onClick={() => handleDeleteActivity(dayIndex, actIndex)} className="text-red-400 hover:text-red-600 p-1">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={() => handleAddActivity(dayIndex)} className="mt-4 w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-400 flex items-center justify-center gap-2 text-sm font-bold transition-all">
                                        <Plus size={16} /> Aggiungi Tappa
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href={`/itinerary/${day.slug}`} className="day-card-link">
                                <div className="day-card">
                                    <div className="date-badge">
                                        <span className="day-name">{day.day}</span>
                                        <span className="day-date">{day.date.split('-').reverse().join('/')}</span>
                                    </div>
                                    <div className="day-content">
                                        <div className="day-header">
                                            <h2>{day.title}</h2>
                                            <span className="location-tag">{day.location}</span>
                                        </div>

                                        <div className="highlights">
                                            {day.highlights.map((h, i) => (
                                                <span key={i} className="highlight-pill">{h}</span>
                                            ))}
                                        </div>

                                        <div className="activities">
                                            {day.details.map((detail, i) => (
                                                <div key={i} className={`activity-row type-${detail.type}`}>
                                                    <span className="time">{detail.time}</span>
                                                    <span className="description">{detail.activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
        }
        .day-card-link {
          display: block;
          transition: transform 0.2s;
        }
        .day-card-link:hover {
          transform: translateY(-4px);
        }
        .day-card {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 2rem;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: border-color 0.2s;
        }
        .day-card.edit-mode-card {
            border: 2px solid #3b82f6; /* Highlight edit mode */
        }
        .day-card-link:hover .day-card {
          border-color: var(--primary);
        }
        .date-badge {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #f9fafb;
          border-radius: 8px;
          padding: 1rem;
          height: fit-content;
        }
        .day-name {
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        .day-date {
          font-size: 1.1rem;
          font-family: var(--font-display);
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .day-header h2 {
            font-weight: 700;
            font-size: 1.5rem;
        }
        .location-tag {
          background: #4b5563;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .highlight-pill {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #555;
        }
        .activities {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .activity-row {
          display: flex;
          gap: 1.5rem;
          padding: 0.5rem;
          border-radius: 6px;
        }
        .activity-row:hover {
          background: #fafafa;
        }
        .time {
          font-weight: 600;
          min-width: 60px;
          color: var(--primary);
        }
        .type-transport .time { color: #9ca3af; }
        
        @media (max-width: 768px) {
          .day-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .date-badge {
            flex-direction: row;
            gap: 1rem;
            align-items: baseline;
            justify-content: flex-start;
          }
        }
      `}</style>
        </div>
    );
}
