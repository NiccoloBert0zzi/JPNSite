"use client";
import { useState, useEffect, useCallback } from 'react';

/**
 * @param {{ currencies: string[] }} props
 * currencies: e.g. ['JPY'] or ['HUF']
 */
export default function CurrencyCalculator({ currencies }) {
    const [eur, setEur] = useState('100');
    const [rates, setRates] = useState(/** @type {Record<string,number>|null} */ (null));
    const [lastUpdated, setLastUpdated] = useState('');
    const [error, setError] = useState(false);

    const fetchRates = useCallback(async () => {
        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?from=EUR&to=${currencies.join(',')}`
            );
            const data = await res.json();
            setRates(data.rates);
            setLastUpdated(new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
        } catch {
            setError(true);
        }
    }, [currencies]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchRates();
    }, [fetchRates]);

    const amount = parseFloat(eur) || 0;

    const formatAmount = (/** @type {number} */ value, /** @type {string} */ currency) => {
        if (currency === 'JPY' || currency === 'HUF') {
            return Math.round(value).toLocaleString('it-IT');
        }
        return value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const symbols = { JPY: '¥', HUF: 'Ft', EUR: '€' };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xl">💱</span>
                <h2 className="font-bold text-gray-900 dark:text-white text-base">Calcolatrice Valuta</h2>
                {lastUpdated && !error && (
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                        Tasso live · {lastUpdated}
                    </span>
                )}
            </div>

            <div className="p-6">
                {error ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">Impossibile caricare i tassi. Verifica la connessione.</p>
                ) : (
                    <div className="flex flex-wrap items-center gap-4">
                        {/* EUR input */}
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                            <span className="text-lg font-bold text-gray-400">€</span>
                            <input
                                type="number"
                                min="0"
                                value={eur}
                                onChange={(e) => setEur(e.target.value)}
                                className="bg-transparent outline-none w-full text-xl font-bold text-gray-900 dark:text-white tabular-nums"
                                placeholder="100"
                            />
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">EUR</span>
                        </div>

                        <span className="text-gray-300 dark:text-gray-600 text-2xl font-light">=</span>

                        {/* Converted amounts */}
                        <div className="flex flex-wrap gap-3 flex-1">
                            {rates ? currencies.map((cur) => (
                                <div
                                    key={cur}
                                    className="flex-1 min-w-[140px] rounded-xl px-4 py-3 text-white"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                >
                                    <div className="text-xl font-bold tabular-nums">
                                        {symbols[cur] || ''}{formatAmount(amount * rates[cur], cur)}
                                    </div>
                                    <div className="text-xs opacity-80 mt-0.5 font-semibold uppercase tracking-wide">
                                        {cur} · 1€ = {formatAmount(rates[cur], cur)}{symbols[cur] || cur}
                                    </div>
                                </div>
                            )) : (
                                <div className="flex-1 min-w-[140px] rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-700 animate-pulse h-14" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
