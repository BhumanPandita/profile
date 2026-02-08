"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#" }, // Hero
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Publications", href: "#publications" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] md:w-full max-w-7xl rounded-full border px-3 md:px-4 py-3 flex justify-between items-center backdrop-blur-md",
                    scrolled ? "bg-background/80 border-border shadow-lg" : "bg-background/40 border-white/10 shadow-sm"
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg text-primary-foreground shadow-lg shadow-primary/20">
                        B
                    </div>
                    <span className="font-bold text-lg hidden sm:block tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Bhuman Pandita
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-1 items-center bg-card/30 rounded-full px-2 py-1 border border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            onMouseEnter={() => setHoveredPath(link.href)}
                            onMouseLeave={() => setHoveredPath(null)}
                        >
                            {link.name}
                            {hoveredPath === link.href && (
                                <motion.div
                                    layoutId="navbar-hover"
                                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex gap-3 items-center">
                    <div className="hidden sm:flex gap-3 items-center border-r border-border pr-3">
                        <Link href="https://github.com/BhumanPandita" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                            <Github size={18} />
                        </Link>
                        <Link href="https://linkedin.com/in/bhumanpandita" target="_blank" className="text-muted-foreground hover:text-secondary transition-colors hover:scale-110">
                            <Linkedin size={18} />
                        </Link>
                        <Link href="mailto:bhumanpandita4@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                            <Mail size={18} />
                        </Link>
                    </div>
                    <ThemeToggle />

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-4 right-4 z-40 md:hidden bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-center text-muted-foreground hover:text-primary transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-border my-2" />
                            <div className="flex justify-center gap-6">
                                <Link href="https://github.com/BhumanPandita" target="_blank" className="text-muted-foreground hover:text-primary">
                                    <Github size={24} />
                                </Link>
                                <Link href="https://linkedin.com/in/bhumanpandita" target="_blank" className="text-muted-foreground hover:text-secondary">
                                    <Linkedin size={24} />
                                </Link>
                                <Link href="mailto:bhumanpandita4@gmail.com" className="text-muted-foreground hover:text-primary">
                                    <Mail size={24} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
