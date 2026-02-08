"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { BookOpen, ExternalLink, ScrollText } from "lucide-react";
import Link from "next/link"; // Import Link correctly

export function Publications() {
    return (
        <section id="publications" className="py-20 px-4 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                    Research Publications
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {resumeData.publications.map((pub, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card hoverEffect className="h-full flex flex-col justify-between border-l-4 border-l-primary bg-card/30 backdrop-blur-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <BookOpen size={16} />
                                        <span className="text-sm font-medium">{pub.journal}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">{pub.year}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                                        {pub.title}
                                    </h3>
                                </div>
                                {/* Add download/link icon if link exists */}
                                <Link href={pub.link} target="_blank" className="p-2 rounded-full bg-accent hover:bg-accent/80 text-secondary transition-colors">
                                    <ExternalLink size={20} />
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
