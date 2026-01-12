"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, loginAdmin, logoutAdmin } from "@/app/actions";

const AdminContext = createContext();

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth().then((isAuth) => {
            setIsAdmin(isAuth);
            // Auto-enable edit mode if admin cookie exists? Maybe better manual toggle.
            // setIsEditMode(isAuth); 
            setIsLoading(false);
        });
    }, []);

    const login = async (password) => {
        const res = await loginAdmin(password);
        if (res.success) {
            setIsAdmin(true);
            setIsEditMode(true);
        }
        return res;
    };

    const logout = async () => {
        await logoutAdmin();
        setIsAdmin(false);
        setIsEditMode(false);
    };

    const toggleEditMode = () => {
        if (!isAdmin) return;
        setIsEditMode(!isEditMode);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, isEditMode, toggleEditMode, login, logout, isLoading }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);
