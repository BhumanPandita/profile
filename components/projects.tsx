"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Code, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Projects() {
    // Duplicate projects to create seamless loop - need enough copies to fill screen + buffer
    const duplicatedProjects = [...resumeData.projects, ...resumeData.projects, ...resumeData.projects];

    return (
        <section id="projects" className="py-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 px-4"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                    Featured Projects
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />

                <div className="flex w-max py-12">
                    <motion.div
                        className="flex gap-8 px-4 will-change-transform"
                        animate={{ x: "-33.33%" }}
                        initial={{ x: "0%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40, // Slower for smoothness
                        }}
                    >
                        {duplicatedProjects.map((project, index) => (
                            <Link href={`/projects/${project.slug || '#'}`} key={index} className="block w-[350px] md:w-[450px] shrink-0">
                                <div className="h-full transform transition-transform hover:scale-105 duration-300">
                                    <Card hoverEffect className="h-full flex flex-col justify-between group border-primary/20 bg-card/30 backdrop-blur-sm overflow-hidden">

                                        {/* Project Image */}
                                        <div className="h-48 w-full bg-muted relative overflow-hidden group-hover:opacity-100 transition-opacity">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                                                    <Code size={40} className="text-primary/30" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                <div className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                                                    <Code size={20} />
                                                </div>
                                                <ExternalLink size={20} className="text-muted-foreground group-hover:text-secondary transition-colors" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                                            <div className="text-sm font-mono text-secondary mb-4">{project.period}</div>
                                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{project.description}</p>
                                        </div>

                                        <div className="px-6 pb-6 flex flex-wrap gap-2 mt-auto">
                                            {project.technologies.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded bg-accent text-muted-foreground border border-border">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-xs px-2 py-1 rounded bg-accent text-muted-foreground border border-border">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
