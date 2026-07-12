"use client";

import { Component } from "react";

/**
 * Catches render/runtime errors from the 3D scene (GL context loss, texture
 * decode failure) so they don't crash the whole page. Renders nothing itself
 * and notifies the parent via onError, which swaps the entire hero for
 * StaticGlobeFallback — avoiding a duplicate title/countdown/pills overlay.
 */
export default class GlobeErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error("3D globe failed to render, falling back to static hero:", error);
        this.props.onError?.();
    }

    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}
