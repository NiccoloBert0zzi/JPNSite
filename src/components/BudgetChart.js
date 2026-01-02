"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = {
    'Voli': '#0088FE',
    'Hotel': '#00C49F',
    'Trasporti': '#FFBB28',
    'Attrazioni': '#FF8042',
    'Assicurazione': '#A28BFB',
    'Servizi': '#FF6B6B',
    'Cibo': '#8884d8'
};

export default function BudgetChart({ data }) {
    // Transform groups into chart-friendly format
    const chartData = data.map(group => ({
        name: group.category,
        value: group.total
    })).filter(d => d.value > 0);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={8}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#ccc'} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `€${value.toLocaleString('it-IT')}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: '20px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
