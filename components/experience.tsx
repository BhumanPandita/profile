"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar, Rocket } from "lucide-react";
import { useRef } from "react";

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-20 px-4 max-w-6xl mx-auto" ref={containerRef}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary mb-6">
                    Professional Experience
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-secondary mx-auto rounded-full blur-[2px]" />
            </motion.div>

            <div className="relative space-y-16">
                {/* Center Timeline Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 md:-translate-x-1/2" />

                {/* Rocket Progress Line */}
                <motion.div
                    className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-secondary via-primary to-secondary md:-translate-x-1/2 origin-top"
                    style={{ scaleY, height: "100%" }}
                />

                {/* Rocket Icon */}
                <motion.div
                    className="absolute left-[11px] md:left-1/2 top-0 z-20 text-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{
                        top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                        x: "-50%"
                    }}
                >
                    <div className="relative">
                        <Rocket size={24} className="transform rotate-180" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-[2px]" />
                    </div>
                </motion.div>

                {resumeData.experience.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        className={`relative md:flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Planet Node */}
                        <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-secondary shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center">
                            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-20" />
                        </div>

                        {/* Content Card */}
                        <div className="ml-12 md:ml-0 md:w-1/2">
                            <Card className="relative overflow-hidden group border-primary/20 bg-card/10 backdrop-blur-md hover:bg-card/20 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                                {/* Gradient Border Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="p-6 md:p-8 relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {job.role}
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs md:text-sm text-secondary font-mono">
                                            <Calendar size={14} />
                                            {job.period}
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
                                        <Briefcase size={16} className="text-primary" />
                                        {job.company}
                                    </h4>

                                    <p className="text-muted-foreground/80 text-sm mb-6 leading-relaxed">
                                        {job.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {job.highlights.map((highlight, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                                <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                                                <span className="group-hover:text-foreground/90 transition-colors duration-300">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
