"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { updateData } from "@/app/actions";
import { MapPin, Calendar, Trash2, Plus, Save, X } from "lucide-react";
import { currentTrip } from "@/data";

export default function EditableAccommodationList({ initialData, tripId }) {
    const { isEditMode } = useAdmin();
    const [data, setData] = useState(initialData);
    const [originalData, setOriginalData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setData(initialData);
        setOriginalData(initialData);
    }, [initialData]);

    const handleChange = (id, field, value) => {
        setData(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
        setIsDirty(true);
    };

    const handleFeaturesChange = (id, featuresString) => {
        const features = featuresString.split(',').map(f => f.trim());
        handleChange(id, 'features', features);
    };

    const handleDelete = (id) => {
        if (!confirm("Sicuro di voler eliminare questo alloggio?")) return;
        setData(prev => prev.filter(item => item.id !== id));
        setIsDirty(true);
    };

    const handleAdd = () => {
        const newId = `new-${Date.now()}`;
        const newHotel = {
            id: newId,
            name: "Nuovo Hotel",
            city: "Città",
            checkIn: currentTrip.startDate,
            checkOut: currentTrip.startDate,
            nights: 1,
            price: 0,
            curr: "€",
            status: "pending",
            address: "Indirizzo",
            googleMapsUrl: "",
            image: "/images/hero.png",
            features: ["Nuovo"],
            website: ""
        };
        setData(prev => [...prev, newHotel]);
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const res = await updateData(tripId, 'accommodations', data);
        setIsSaving(false);
        if (res.success) {
            setOriginalData(data);
            setIsDirty(false);
            alert("Salvato con successo!");
        } else {
            alert("Errore cambio: " + res.error);
        }
    };

    const handleCancel = () => {
        setData(originalData);
        setIsDirty(false);
    };

    const totalCost = data.reduce((acc, item) => acc + Number(item.price), 0);
    const totalNights = data.reduce((acc, item) => acc + Number(item.nights), 0);

    return (
        <div className="relative">
            {/* Dirty State Floating Bar */}
            {isDirty && isEditMode && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-4 animate-in slide-in-from-bottom-4">
                    <span className="font-bold">Hai modifiche non salvate</span>
                    <button onClick={handleSave} disabled={isSaving} className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-gray-200">
                        {isSaving ? 'Salvataggio...' : 'Salva'}
                    </button>
                    <button onClick={handleCancel} className="p-1 hover:bg-white/20 rounded-full">
                        <X size={20} />
                    </button>
                </div>
            )}

            {/* STATS HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8 -mt-20 relative z-20 px-6 container mx-auto text-white">
                <div className="hidden md:block">
                    {/* This space is for the Title which is outside of this component usually, but values are here */}
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex gap-10 border border-white/20 shadow-xl ml-auto">
                    <div className="text-center md:text-left">
                        <p className="text-gray-300 text-xs uppercase tracking-wider font-bold mb-1">Totale Notti</p>
                        <p className="text-3xl font-bold text-white">{totalNights}</p>
                    </div>
                    <div className="w-px bg-white/20 h-auto"></div>
                    <div className="text-center md:text-left">
                        <p className="text-gray-300 text-xs uppercase tracking-wider font-bold mb-1">Budget Totale</p>
                        <p className="text-3xl font-bold text-[var(--primary)] text-shadow-sm">€ {totalCost.toFixed(2)}</p>
                    </div>
                </div>
            </div>


            {/* LIST */}
            <div className="container mx-auto max-w-5xl px-6 space-y-12 pb-20">
                {isEditMode && (
                    <button onClick={handleAdd} className="w-full py-8 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all flex flex-col items-center justify-center gap-2 font-bold mb-8">
                        <Plus size={32} />
                        Aggiungi Nuovo Alloggio
                    </button>
                )}

                {data.map((hotel, index) => (
                    <div key={hotel.id || index} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 relative group">

                        {/* DELETE BUTTON (Edit Mode) */}
                        {isEditMode && (
                            <button
                                onClick={() => handleDelete(hotel.id)}
                                className="absolute top-4 right-4 z-30 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                title="Elimina"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}

                        {/* IMAGE */}
                        <div className="md:w-5/12 min-h-[300px] relative overflow-hidden bg-gray-100">
                            {isEditMode ? (
                                <div className="absolute inset-0 p-6 flex flex-col gap-4 justify-center">
                                    <label className="text-xs uppercase font-bold text-gray-500">URL Immagine</label>
                                    <input
                                        type="text"
                                        value={hotel.image}
                                        onChange={(e) => handleChange(hotel.id, 'image', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                    <img src={hotel.image} className="h-32 object-cover rounded w-full opacity-50" />
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                </>
                            )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-8 md:w-7/12 flex flex-col justify-between relative">
                            {isEditMode ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Città</label>
                                            <input type="text" value={hotel.city} onChange={e => handleChange(hotel.id, 'city', e.target.value)} className="w-full font-bold border-b border-gray-300 focus:border-black outline-none py-1" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Prezzo (€)</label>
                                            <input type="number" value={hotel.price} onChange={e => handleChange(hotel.id, 'price', Number(e.target.value))} className="w-full font-bold border-b border-gray-300 focus:border-black outline-none py-1" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome Hotel</label>
                                        <input type="text" value={hotel.name} onChange={e => handleChange(hotel.id, 'name', e.target.value)} className="w-full text-2xl font-bold border-b border-gray-300 focus:border-black outline-none py-1 font-display" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Check-In</label>
                                            <input type="date" value={hotel.checkIn} onChange={e => handleChange(hotel.id, 'checkIn', e.target.value)} className="w-full border-b border-gray-300 focus:border-black outline-none py-1" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Check-Out</label>
                                            <input type="date" value={hotel.checkOut} onChange={e => handleChange(hotel.id, 'checkOut', e.target.value)} className="w-full border-b border-gray-300 focus:border-black outline-none py-1" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Indirizzo</label>
                                        <input type="text" value={hotel.address} onChange={e => handleChange(hotel.id, 'address', e.target.value)} className="w-full border-b border-gray-300 focus:border-black outline-none py-1" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Booking URL</label>
                                        <input type="text" value={hotel.website} onChange={e => handleChange(hotel.id, 'website', e.target.value)} className="w-full border-b border-gray-300 focus:border-black outline-none py-1 text-sm text-blue-600" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Features (semparate da virgola)</label>
                                        <input type="text" value={hotel.features.join(', ')} onChange={e => handleFeaturesChange(hotel.id, e.target.value)} className="w-full border-b border-gray-300 focus:border-black outline-none py-1" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.2em] mb-2">{hotel.city}</h3>
                                            <h2 className="text-3xl font-bold text-gray-900 font-display leading-tight">{hotel.name}</h2>
                                        </div>
                                        <div className="text-right pl-4">
                                            <span className="block text-3xl font-bold text-gray-900">€{hotel.price}</span>
                                            <span className="text-gray-400 text-sm font-medium">{hotel.nights} notti</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 mt-6">
                                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <span className="font-medium">{new Date(hotel.checkIn).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })} — {new Date(hotel.checkOut).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 px-3">
                                            <MapPin className="w-5 h-5 text-[var(--primary)]" />
                                            <span className="truncate border-b border-dashed border-gray-300 pb-0.5">{hotel.address}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {hotel.features.map((f, i) => (
                                            <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full font-semibold uppercase tracking-wide">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ACTION BUTTONS (Read Only) */}
                            {!isEditMode && (
                                <div className="mt-8 flex gap-4 pt-6 border-t border-gray-100">
                                    <a href={hotel.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-bold text-center hover:border-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 group/btn">
                                        <MapPin className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-900 transition-colors" />
                                        Mappa
                                    </a>
                                    {hotel.website && (
                                        <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[var(--primary)] text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-[var(--primary-light)] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                            Sito Ufficiale
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
