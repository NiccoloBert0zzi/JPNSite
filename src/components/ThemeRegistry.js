'use client';

import { useEffect } from 'react';
import { currentTrip } from '@/data';

export default function ThemeRegistry({ children }) {
    useEffect(() => {
        const root = document.documentElement;
        if (currentTrip?.theme) {
            root.style.setProperty('--primary', currentTrip.theme.primary);
            root.style.setProperty('--primary-light', currentTrip.theme.primaryLight);
        }
    }, []);

    return <>{children}</>;
}
