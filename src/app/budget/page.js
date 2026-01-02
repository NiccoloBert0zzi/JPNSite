"use client";
import { useState, useEffect } from 'react';
import { budget } from '@/data/budget';

export default function BudgetPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/reservations')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const updateCost = async (itemLabel, newCost) => {
        const updatedItems = items.map(i =>
            i.item === itemLabel ? { ...i, cost: parseFloat(newCost) || 0 } : i
        );
        setItems(updatedItems);

        try {
            await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItems)
            });
        } catch (error) {
            console.error("Failed to save cost", error);
        }
    };

    // Calculate totals
    const totalDynamic = items.reduce((acc, curr) => acc + (curr.cost || 0), 0);

    // Group by category
    const categories = ['Voli', 'Hotel', 'Trasporti', 'Attrazioni', 'Assicurazione', 'Servizi', 'Cibo'];
    const groupedItems = categories.map(cat => {
        const catItems = items.filter(i => i.category === cat);
        const catTotal = catItems.reduce((acc, curr) => acc + (curr.cost || 0), 0);
        return { category: cat, items: catItems, total: catTotal };
    }).filter(g => g.items.length > 0);

    return (
        <div className="section container">
            <h1>Budget Previsionale</h1>
            <p>Stima per 2 Persone (14 Giorni)</p>

            <div className="grid grid-2" style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                <div className="card total-card">
                    <h3>Totale Stimato (Statico)</h3>
                    <div className="total-amount">€{budget.totalSafe.toLocaleString('it-IT')}</div>
                    <p>Budget iniziale di riferimento</p>
                </div>
                <div className="card total-card safe">
                    <h3>Totale Reale</h3>
                    <div className="total-amount">€{totalDynamic.toLocaleString('it-IT')}</div>
                    <p>Somma dei costi attuali</p>
                </div>
            </div>

            <div className="budget-groups">
                {loading ? <p>Caricamento...</p> : groupedItems.map((group) => (
                    <div key={group.category} className="category-group">
                        <div className="group-header">
                            <h2>{group.category}</h2>
                            <span className="group-total">€{group.total.toLocaleString('it-IT')}</span>
                        </div>

                        <div className="items-list">
                            {group.items.map((item) => (
                                <div key={item.item} className="cost-row">
                                    <span className="cost-label">{item.item}</span>
                                    <div className="cost-input-wrapper">
                                        <span>€</span>
                                        <input
                                            type="number"
                                            value={item.cost || ''}
                                            onChange={(e) => updateCost(item.item, e.target.value)}
                                            className="cost-input"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .total-card {
                    text-align: center;
                    background: #fafafa;
                    border-color: #ddd;
                    padding: 2rem;
                    border-radius: 12px;
                    border: 1px solid #ddd;
                }
                .total-card.safe {
                    background: #f0f7f4;
                    border-color: #cceddf;
                }
                .total-amount {
                    font-family: var(--font-display);
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--primary);
                    margin: 1rem 0;
                }
                
                .category-group {
                    margin-bottom: 2rem;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    overflow: hidden;
                }
                
                .group-header {
                    background: #fafafa;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .group-header h2 { margin: 0; font-size: 1.25rem; }
                .group-total { font-weight: 700; font-size: 1.25rem; color: var(--primary); }
                
                .cost-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid var(--border);
                }
                .cost-row:last-child { border-bottom: none; }
                .cost-label { font-weight: 500; }
                
                .cost-input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #f4f4f4;
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                }
                .cost-input {
                    background: transparent;
                    border: none;
                    width: 80px;
                    text-align: right;
                    font-weight: 600;
                    font-size: 1rem;
                    outline: none;
                }
            `}</style>
        </div>
    );
}
