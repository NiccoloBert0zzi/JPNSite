"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Lock, Unlock, Edit, Eye, X } from "lucide-react";

export default function AdminControls() {
    const { isAdmin, isEditMode, toggleEditMode, login, logout } = useAdmin();
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(password);
        if (res.success) {
            setShowLogin(false);
            setPassword("");
        } else {
            setError(res.error);
        }
    };

    return (
        <>
            {/* Trigger Button (Bottom Right) */}
            <div className="fixed bottom-4 right-4 z-50">
                {!isAdmin ? (
                    <button
                        onClick={() => setShowLogin(true)}
                        className="p-2 bg-gray-100/50 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                        title="Admin Login"
                    >
                        <Lock size={16} />
                    </button>
                ) : (
                    <div className="flex gap-2 items-center bg-white shadow-lg p-2 rounded-full border border-gray-200">
                        <button
                            onClick={toggleEditMode}
                            className={`p-2 rounded-full transition-colors ${isEditMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                            title={isEditMode ? "Mdoalità Modifica Attiva" : "Passa a Modalità Modifica"}
                        >
                            {isEditMode ? <Edit size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-full"
                            title="Logout"
                        >
                            <Unlock size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold mb-4 font-display">Area Riservata</h3>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password Admin"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    autoFocus
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Accedi
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
