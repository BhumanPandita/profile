"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export function Skills() {
    return (
        <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                    Technical Arsenal
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
                {resumeData.skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={{
                            scale: 1.15,
                            y: -4,
                            transition: { duration: 0.15, ease: "easeOut" }
                        }}
                        className="px-5 py-2 rounded-full bg-card/30 backdrop-blur-sm border border-border text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:border-primary/50 transition-colors duration-200 cursor-default"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
