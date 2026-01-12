"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { updateData } from "@/app/actions";
import { Trash2, Plus, Save, X } from "lucide-react";

export default function EditableTransportList({ initialData, tripId }) {
    const { isEditMode } = useAdmin();
    const [data, setData] = useState(initialData);
    const [originalData, setOriginalData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setData(initialData);
        setOriginalData(initialData);
    }, [initialData]);

    const handleChange = (index, field, value) => {
        setData(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
        setIsDirty(true);
    };

    const handleCoverageChange = (index, text) => {
        // Split by newline to create array
        const coverage = text.split('\n').filter(line => line.trim() !== '');
        handleChange(index, 'coverage', coverage);
    };

    const handleDelete = (index) => {
        if (!confirm("Eliminare questo trasporto?")) return;
        setData(prev => prev.filter((_, i) => i !== index));
        setIsDirty(true);
    };

    const handleAdd = () => {
        const newItem = {
            name: "Nuovo Trasporto",
            dates: "Date",
            duration: "Durata",
            cost: "€0",
            coverage: ["Dettaglio 1", "Dettaglio 2"],
            image: "/images/hero.png"
        };
        setData(prev => [...prev, newItem]);
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const res = await updateData(tripId, 'transport', data);
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

            {/* LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                {isEditMode && (
                    <button onClick={handleAdd} className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all font-bold min-h-[500px]">
                        <Plus size={48} />
                        Aggiungi Nuovo Trasporto
                    </button>
                )}

                {data.map((item, index) => (
                    <div key={index} className="bg-white rounded-[20px] overflow-hidden border border-black/5 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col relative group">

                        {/* DELETE BUTTON (Edit Mode) */}
                        {isEditMode && (
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-4 right-4 z-30 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                title="Elimina"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}

                        <div className="h-[250px] relative bg-cover bg-center" style={{ backgroundImage: isEditMode ? 'none' : `url(${item.image})` }}>
                            {isEditMode ? (
                                <div className="absolute inset-0 p-6 flex flex-col justify-center bg-gray-100">
                                    <label className="text-xs uppercase font-bold text-gray-500 mb-1">URL Immagine</label>
                                    <input
                                        type="text"
                                        value={item.image}
                                        onChange={(e) => handleChange(index, 'image', e.target.value)}
                                        className="w-full p-2 border rounded mb-4"
                                    />
                                    {item.image && <img src={item.image} className="h-24 w-full object-cover rounded opacity-60" />}

                                    <label className="text-xs uppercase font-bold text-gray-500 mb-1 mt-2">Costo (Etichetta)</label>
                                    <input
                                        type="text"
                                        value={item.cost}
                                        onChange={(e) => handleChange(index, 'cost', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 right-5 bg-white/95 text-[var(--primary)] px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm">
                                        {item.cost}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            {isEditMode ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="text-xl font-bold w-full border-b border-gray-300 focus:border-black outline-none"
                                        placeholder="Nome Trasporto"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item.duration}
                                            onChange={(e) => handleChange(index, 'duration', e.target.value)}
                                            className="text-sm w-1/2 p-1 bg-gray-50 rounded"
                                            placeholder="Durata"
                                        />
                                        <input
                                            type="text"
                                            value={item.dates}
                                            onChange={(e) => handleChange(index, 'dates', e.target.value)}
                                            className="text-sm w-1/2 p-1 bg-gray-50 rounded"
                                            placeholder="Date"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase font-bold text-gray-500 block mb-1">Copertura (una per riga)</label>
                                        <textarea
                                            value={item.coverage.join('\n')}
                                            onChange={(e) => handleCoverageChange(index, e.target.value)}
                                            className="w-full p-2 border rounded text-sm h-32"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider whitespace-nowrap">{item.duration}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 font-medium">📅 {item.dates}</p>

                                    <div className="mt-auto">
                                        <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-3">Copertura</h4>
                                        <ul className="space-y-2">
                                            {item.coverage.map((c, i) => (
                                                <li key={i} className="text-gray-700 text-sm flex gap-2 relative pl-4">
                                                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
