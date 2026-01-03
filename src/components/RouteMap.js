"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function RouteMap({ coordinates }) {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const layerGroupRef = useRef(null);

    useEffect(() => {
        // 1. Initialize Map
        if (mapContainerRef.current && !mapInstanceRef.current) {

            // Fix Leaflet Icons
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            });

            const startCoord = coordinates && coordinates.length > 0 ? coordinates[0] : { lat: 34.6937, lng: 135.5023 };

            const map = L.map(mapContainerRef.current).setView([startCoord.lat, startCoord.lng], 13);

            L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }).addTo(map);

            mapInstanceRef.current = map;
            layerGroupRef.current = L.layerGroup().addTo(map);
        }

        // 2. Update Layers when coordinates change
        const map = mapInstanceRef.current;
        if (map && coordinates && coordinates.length > 0) {
            const layerGroup = layerGroupRef.current;
            layerGroup.clearLayers();

            const polylinePoints = [];

            coordinates.forEach((coord, index) => {
                // Add Marker
                const marker = L.marker([coord.lat, coord.lng])
                    .bindPopup(`<b>${coord.title}</b>`)
                    .addTo(layerGroup);

                // Open the first one by default if desired, or none
                // if (index === 0) marker.openPopup();

                polylinePoints.push([coord.lat, coord.lng]);
            });

            // Add Polyline
            if (polylinePoints.length > 1) {
                L.polyline(polylinePoints, {
                    color: "#D62F4D",
                    weight: 4,
                    opacity: 0.8,
                }).addTo(layerGroup);
            }

            // Fit Bounds
            const bounds = L.latLngBounds(polylinePoints);
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                layerGroupRef.current = null;
            }
        };
    }, [coordinates]);

    if (!coordinates || coordinates.length === 0) return null;

    return (
        <div className="map-wrapper">
            <div ref={mapContainerRef} className="map-container" />
            <style jsx>{`
        .map-wrapper {
            width: 100%;
            height: 450px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px -5px rgba(0,0,0,0.2);
            z-index: 1;
            position: relative;
        }
        .map-container {
            width: 100%;
            height: 100%;
            background: #222;
        }
        /* Leaflet popup overrides */
        :global(.leaflet-popup-content-wrapper) {
            border-radius: 12px;
            font-family: var(--font-base);
            font-weight: 600;
        }
        :global(.leaflet-popup-tip) {
            background: white;
        }
      `}</style>
        </div>
    );
}
