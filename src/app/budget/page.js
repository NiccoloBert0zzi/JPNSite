"use client";
import { useState, useEffect } from "react";
import { budget } from "@/data/budget";
import BudgetChart from "@/components/BudgetChart";

// Helper for debounced updates could be useful, but for now simple onBlur or aggressive save is okay
// We'll stick to the existing pattern: update local state immediately, then optimistic save (or debounced).

const CATEGORY_COLORS = {
  Voli: "#3B82F6",
  Hotel: "#10B981",
  Trasporti: "#F59E0B",
  Attrazioni: "#F97316",
  Assicurazione: "#8B5CF6",
  Servizi: "#EF4444",
  Cibo: "#6366F1",
};

const CATEGORY_ICONS = {
  Voli: "✈️",
  Hotel: "🏨",
  Trasporti: "🚆",
  Attrazioni: "⛩️",
  Assicurazione: "🛡️",
  Servizi: "📱",
  Cibo: "🍱",
};

export default function BudgetPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSinglePerson, setIsSinglePerson] = useState(false);

  // Allow "raw" input for cost to avoid fighting the user
  // However, managing input state for many rows is tricky.
  // We'll trust that removing .toFixed(2) fixes the jumpiness.

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const saveItems = async (updatedItems) => {
    try {
      // Prepare items for save: remove temporary IDs if they shouldn't go to DB?
      // Actually backend ignores unknown fields usually, but let's be clean.
      // But we need to send the whole object. The backend looks for 'id' to UPDATE.
      // If no 'id', it INSERTS. '_tempId' will be ignored by backend logic assuming strict SQL but 
      // the backend does: `values (${item.item}, ...)` so extra fields in object are fine.

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItems),
      });
      const data = await res.json();
      if (data.success && data.data) {
        // If the backend returns the updated list with new IDs (for new items)
        // we should merge or replace. 
        // For simplicity, let's just silently accept if successful, 
        // or replace if we think IDs might have changed (e.g. new item created).
        // Since we are sending the Whole State, the backend might return the process results.
        // Actually, to get the new IDs for newly created items, we should probably reload 
        // OR rely on the backend response.
        // Our backend returns `processedItems`.

        // Strategy: We can just setItems(data.data) to sync IDs 
        // but that might clear focus if the user is typing.
        // So we only update if we added a new item (which has no ID locally).

        // For now, let's keep it simple: background save.
        // But if we added a NEW item, we need its ID.
        const hasNewItems = updatedItems.some(i => !i.id);
        if (hasNewItems) {
          setItems(data.data); // sync to get IDs
        }
      }
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  // Generic update function
  const updateItem = (uniqueKey, field, value) => {
    // Identify by ID or _tempId
    // uniqueKey is what we used to render.

    const updatedItems = items.map((i) => {
      const key = i.id || i._tempId;
      if (key === uniqueKey) {
        return { ...i, [field]: value };
      }
      return i;
    });

    setItems(updatedItems);
  };

  const persistChanges = () => {
    saveItems(items);
  };

  const handleAddItem = async (category) => {
    const newItem = {
      item: "Nuova voce",
      cost: 0,
      category: category,
      status: "todo",
      _tempId: `temp-${Date.now()}-${Math.random()}`
    };

    // We push to state first
    const newItems = [...items, newItem];
    setItems(newItems);

    // Save immediately to get ID
    await saveItems(newItems);
  };

  const handleDeleteItem = async (uniqueKey) => {
    // Helper to find ID if needed
    if (confirm("Sei sicuro di voler eliminare questa voce?")) {
      const itemToDelete = items.find(i => (i.id || i._tempId) === uniqueKey);
      const newItems = items.filter(i => (i.id || i._tempId) !== uniqueKey);
      setItems(newItems);

      if (itemToDelete && itemToDelete.id) {
        try {
          await fetch(`/api/reservations?id=${itemToDelete.id}`, { method: 'DELETE' });
        } catch (e) {
          console.error(e);
          items.push(itemToDelete); // Revert
          setItems([...items]);
        }
      }
    }
  };

  const displayMultiplier = isSinglePerson ? 0.5 : 1;
  const totalDynamic = items.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const budgetLimit = budget.totalSafe;
  const remaining = budgetLimit - totalDynamic;
  const percentageUsed = Math.min((totalDynamic / budgetLimit) * 100, 100);

  const categories = [
    "Voli",
    "Hotel",
    "Trasporti",
    "Attrazioni",
    "Assicurazione",
    "Servizi",
    "Cibo",
  ];

  const groupedItems = categories
    .map((cat) => {
      const catItems = items.filter((i) => i.category === cat);
      const catTotal = catItems.reduce(
        (acc, curr) => acc + (Number(curr.cost) || 0),
        0
      );
      return { category: cat, items: catItems, total: catTotal };
    })
  // .filter((g) => g.items.length > 0); // Removed to show empty categories where we can add items

  // Chart data
  const chartData = groupedItems.map((g) => ({
    ...g,
    total: g.total * displayMultiplier,
  })).filter(g => g.items.length > 0); // Chart needs real data

  return (
    <div className="section container">
      <header className="page-header">
        <h1>Budget Planner</h1>
        <p>Gestione spese in tempo reale.</p>
      </header>

      <div className="sticky-summary">
        <div className="summary-card">
          <span className="label">Totale Speso</span>
          <span className="value">
            €{(totalDynamic * displayMultiplier).toLocaleString("it-IT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="summary-card highlight">
          <span className="label">Rimanente</span>
          <span className="value">
            €{(remaining * displayMultiplier).toLocaleString("it-IT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="summary-card">
          <span className="label">Budget Massimo</span>
          <span className="value">
            €{(budgetLimit * displayMultiplier).toLocaleString("it-IT", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>

        <div className="toggle-container">
          <div className="toggle-bg">
            <button
              className={`toggle-btn ${!isSinglePerson ? "active" : ""}`}
              onClick={() => setIsSinglePerson(false)}
            >
              2 Persone
            </button>
            <button
              className={`toggle-btn ${isSinglePerson ? "active" : ""}`}
              onClick={() => setIsSinglePerson(true)}
            >
              1 Persona
            </button>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="fill"
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-section">
          <div className="chart-card">
            <h3>Ripartizione</h3>
            <BudgetChart data={chartData} />
          </div>
        </div>

        <div className="planner-section">
          {loading ? (
            <div className="loading">Caricamento budget...</div>
          ) : (
            <div className="planner-grid">
              {groupedItems.map((group) => {
                const color = CATEGORY_COLORS[group.category] || "#999";
                const icon = CATEGORY_ICONS[group.category] || "📦";

                return (
                  <div
                    key={group.category}
                    className="planner-card"
                    style={{ borderTop: `6px solid ${color}` }}
                  >
                    <div className="card-header">
                      <div className="header-title">
                        <span className="icon">{icon}</span>
                        <h2>{group.category}</h2>
                      </div>
                      <div className="header-actions">
                        <span className="category-total" style={{ color }}>
                          €{(group.total * displayMultiplier).toLocaleString(
                            "it-IT",
                            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                          )}
                        </span>
                        <button
                          className="add-btn"
                          onClick={() => handleAddItem(group.category)}
                          title="Aggiungi voce"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      {group.items.map((item, index) => {
                        const safeKey = item.id || item._tempId || `idx-${index}`;
                        return (
                          <div key={safeKey} className="budget-row">
                            {/* Item Name Input */}
                            <input
                              className="row-label-input"
                              value={item.item}
                              onChange={(e) => updateItem(safeKey, 'item', e.target.value)}
                              onBlur={persistChanges}
                            />

                            <div className="row-right">
                              <div className="input-group">
                                <span className="currency">€</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  // Use raw value or empty string. DO NOT use toFixed here to avoid input jumping.
                                  value={
                                    item.cost === 0 ? "" : (
                                      isSinglePerson ? item.cost / 2 : item.cost
                                    )
                                  }
                                  onChange={(e) => {
                                    const newVal = parseFloat(e.target.value);
                                    const realCost = isNaN(newVal) ? 0 : (isSinglePerson ? newVal * 2 : newVal);
                                    updateItem(safeKey, 'cost', realCost);
                                  }}
                                  onBlur={persistChanges}
                                  placeholder="0"
                                />
                              </div>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteItem(safeKey)}
                                title="Elimina"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {group.items.length === 0 && (
                        <div className="empty-category-msg">Nessuna voce</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .page-header h1 {
          font-size: 2.5rem;
          background: linear-gradient(to right, #111, #555);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sticky-summary {
          /* position: sticky; removed to let it scroll */
          /* top: 80px; */
          /* z-index: 90; */
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          padding: 1.5rem 2.5rem;
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .summary-card {
          display: flex;
          flex-direction: column;
          min-width: 140px;
        }
        .summary-card.highlight .value {
          color: ${remaining < 0 ? "#EF4444" : "#10B981"};
        }
        .label {
          font-size: 0.85rem;
          color: #999;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .value {
          font-size: 1.75rem;
          font-weight: 800;
          font-family: var(--font-base);
          color: #333;
        }

        .progress-bar-container {
          width: 100%;
          flex-basis: 100%;
          margin-top: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 999px;
          overflow: hidden;
        }
        .fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
          border-radius: 999px;
        }

        /* Toggle Styles */
        .toggle-container {
          display: flex;
          align-items: center;
        }
        .toggle-bg {
          background: #f3f4f6;
          padding: 4px;
          border-radius: 12px;
          display: flex;
          gap: 4px;
        }
        .toggle-btn {
          background: transparent;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .toggle-btn:hover {
          color: #374151;
        }
        .toggle-btn.active {
          background: white;
          color: #111;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(340px, 520px) 1fr;
          gap: 2rem;
          align-items: start;
        }

        .chart-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 40px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.06);
          padding: 1.5rem 1.5rem 0.75rem;
          position: sticky;
          top: 190px;
        }

        .chart-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-family: var(--font-base);
          font-weight: 700;
        }

        .planner-section {
          min-width: 0;
        }

        .planner-grid {
          column-count: 2;
          column-gap: 1.5rem;
        }

        .planner-card {
          display: inline-block;
          width: 100%;
          margin-bottom: 1.5rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
        }

        .card-header {
          padding: 1.25rem 2rem;
          background: white;
          border-bottom: 1px solid #f7f7f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .add-btn {
            background: #f3f4f6;
            border: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: #6b7280;
            transition: all 0.2s;
        }
        .add-btn:hover {
            background: #e5e7eb;
            color: #111;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .icon {
          font-size: 1.1rem;
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #1f2937;
          font-family: var(--font-base);
        }

        .category-total {
          font-weight: 700;
          font-size: 1.1rem;
          font-family: var(--font-base);
        }

        .card-body {
          padding: 0.5rem 0;
        }

        .budget-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          border-bottom: 1px solid #f7f7f7;
          gap: 1rem;
        }
        .budget-row:last-child {
          border-bottom: none;
        }
        
        .row-right {
             display: flex;
             align-items: center;
             gap: 0.5rem;
        }

        /* Replaced span with input */
        .row-label-input {
          font-size: 0.95rem;
          font-weight: 500;
          color: #4b5563;
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          padding: 0.2rem 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .row-label-input:focus {
            border-bottom: 1px solid #ddd;
            color: #111;
        }

        .input-group {
          display: flex;
          align-items: center;
          background: #f3f4f6;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 1px solid transparent;
          transition: all 0.2s;
          width: 140px;
        }
        .input-group:focus-within {
          background: white;
          border-color: #ddd;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);
        }
        .currency {
          color: #9ca3af;
          font-size: 0.9rem;
          margin-right: 0.5rem;
          font-weight: 500;
        }
        .input-group input {
          background: transparent;
          border: none;
          width: 100%;
          text-align: right;
          font-weight: 600;
          color: #374151;
          font-size: 1rem;
          outline: none;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .delete-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            opacity: 0.3;
            transition: opacity 0.2s;
            font-size: 1rem;
            padding: 4px;
        }
        .delete-btn:hover {
            opacity: 1;
        }
        
        .empty-category-msg {
            padding: 1rem 2rem;
            color: #9ca3af;
            font-size: 0.9rem;
            font-style: italic;
        }

        .loading {
          text-align: center;
          color: #888;
          margin-top: 3rem;
        }

        @media (max-width: 1100px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .chart-card {
            position: relative;
            top: 0;
          }

          .planner-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
}
