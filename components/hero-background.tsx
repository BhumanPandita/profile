"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

// Error Boundary to catch WebGL crashes on unsupported or low-end devices
class CanvasErrorBoundary extends React.Component<
    { fallback: React.ReactNode; children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.warn("WebGL Canvas crashed, falling back to static background:", error);
    }

    render() {
        if (this.state.hasError) {
            return <>{this.props.fallback}</>;
        }
        return <>{this.props.children}</>;
    }
}

function StarField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

    useFrame((state: any, delta: any) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#a855f7" // Purple color matching the theme
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export function HeroBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <CanvasErrorBoundary
                fallback={
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0a0a1a] to-background" />
                }
            >
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <StarField />
                    </Suspense>
                </Canvas>
            </CanvasErrorBoundary>
        </div>
    );
}
