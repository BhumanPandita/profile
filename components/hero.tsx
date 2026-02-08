"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";
import { FileText, Github, Linkedin, Mail, Send, Download, ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const y = useTransform(scrollY, [0, 200], [0, 50]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
            {/* Background Effects */}
            <div className="z-10 text-center max-w-4xl mx-auto space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-accent-foreground/10 text-sm md:text-base text-muted-foreground backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for new opportunities
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary/50 to-secondary/50 pb-2"
                >
                    {resumeData.personalInfo.name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground font-light"
                >
                    {resumeData.personalInfo.title}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="max-w-2xl mx-auto text-muted-foreground md:text-lg leading-relaxed"
                >
                    {resumeData.personalInfo.bio}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 justify-center pt-8"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#contact">
                            <Button variant="primary" className="min-w-[160px] h-12 text-lg">
                                Contact Me
                            </Button>
                        </Link>
                        <a href="/resume.pdf" download="Bhuman_Pandita_Resume.pdf">
                            <Button variant="outline" className="min-w-[160px] h-12 text-lg border-primary/50 hover:bg-primary/10">
                                <Download className="mr-2" size={20} />
                                Download CV
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity, y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10"
            >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                        const experienceSection = document.getElementById('experience');
                        if (experienceSection) {
                            experienceSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
                >
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll Down</span>
                    <ArrowDown size={24} className="animate-bounce" />
                </motion.div>
            </motion.div>
        </section>
    );
}
