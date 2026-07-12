"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import HeroShell from "./HeroShell";
import StaticGlobeFallback from "./StaticGlobeFallback";

const GlobeHero = dynamic(() => import("./GlobeHero"), {
    ssr: false,
    loading: () => <HeroShell />,
});

function detectWebGLSupport() {
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch {
        return false;
    }
}

function subscribe() {
    // Support/motion-preference/save-data are read once; nothing external
    // needs to re-trigger this check, so there's nothing to subscribe to.
    return () => {};
}

function getSnapshot() {
    const webglSupported = detectWebGLSupport();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = !!(/** @type {any} */ (navigator).connection?.saveData);
    return !webglSupported || (reducedMotion && saveData);
}

function getServerSnapshot() {
    // Unknown on the server (and during the client's first hydration pass) —
    // renders the same HeroShell both sides to avoid a hydration mismatch.
    return null;
}

export default function GlobeHeroWrapper() {
    const useFallback = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (useFallback === null) return <HeroShell />;
    if (useFallback) return <StaticGlobeFallback />;
    return <GlobeHero />;
}
