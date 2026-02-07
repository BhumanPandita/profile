"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border bg-background/80 backdrop-blur-md">
            <p>© {new Date().getFullYear()} Bhuman Pandita. All rights reserved.</p>
        </footer>
    );
}
