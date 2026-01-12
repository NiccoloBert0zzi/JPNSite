"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
    ssr: false,
    loading: () => (
        <div
            style={{
                height: "450px",
                background: "#111",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#555",
            }}
        >
            Caricamento Mappa...
        </div>
    ),
});

export default function RouteMapWrapper({ coordinates }) {
    return <RouteMap coordinates={coordinates} />;
}
