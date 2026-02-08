"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Quote, UserCheck } from "lucide-react";

export function Recommendations() {
    return (
        <section id="recommendations" className="py-20 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 mb-4">
                    Recommendations
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid gap-6">
                {resumeData.recommendations.map((rec, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="relative border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                            <Quote className="absolute top-6 right-6 text-green-500/20" size={48} />
                            <div className="relative z-10">
                                <p className="text-muted-foreground italic mb-6 text-lg leading-relaxed">
                                    {rec.content}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                                        <UserCheck size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{rec.name}</div>
                                        <div className="text-sm text-green-600 dark:text-green-400">{rec.role}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
