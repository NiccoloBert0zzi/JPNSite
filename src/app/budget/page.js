"use client";
import { useState, useEffect } from "react";
import { budget } from "@/data/budget";
import BudgetChart from "@/components/BudgetChart";

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

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const updateCost = async (itemLabel, displayedCost) => {
    const multiplier = isSinglePerson ? 2 : 1;
    const realCost = (parseFloat(displayedCost) || 0) * multiplier;

    const updatedItems = items.map((i) =>
      i.item === itemLabel ? { ...i, cost: realCost } : i
    );
    setItems(updatedItems);

    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItems),
      });
    } catch (error) {
      console.error("Failed to save cost", error);
    }
  };

  const displayMultiplier = isSinglePerson ? 0.5 : 1;
  const totalDynamic = items.reduce((acc, curr) => acc + (curr.cost || 0), 0);
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
        (acc, curr) => acc + (curr.cost || 0),
        0
      );
      return { category: cat, items: catItems, total: catTotal };
    })
    .filter((g) => g.items.length > 0);

  // Chart data should also reflect the view mode
  const chartData = groupedItems.map((g) => ({
    ...g,
    total: g.total * displayMultiplier,
  }));

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
                      <span className="category-total" style={{ color }}>
                        €{(group.total * displayMultiplier).toLocaleString(
                          "it-IT",
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        )}
                      </span>
                    </div>

                    <div className="card-body">
                      {group.items.map((item) => (
                        <div key={item.item} className="budget-row">
                          <span className="row-label">{item.item}</span>
                          <div className="input-group">
                            <span className="currency">€</span>
                            <input
                              type="number"
                              value={
                                item.cost
                                  ? (item.cost * displayMultiplier).toFixed(2)
                                  : ""
                              }
                              onChange={(e) =>
                                updateCost(item.item, e.target.value)
                              }
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ))}
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
        }
        .budget-row:last-child {
          border-bottom: none;
        }

        .row-label {
          font-size: 0.95rem;
          font-weight: 500;
          color: #4b5563;
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
