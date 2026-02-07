"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Trophy, Award } from "lucide-react";

export function Honors() {
    return (
        <section id="honors" className="py-20 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
                    Honors & Awards
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {resumeData.awards.map((award, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm hover:bg-yellow-500/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-500 shrink-0">
                                    <Trophy size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">{award.title}</h3>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-2 flex items-center gap-2">
                                        <Award size={14} />
                                        {award.organization} • {award.date}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {award.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
