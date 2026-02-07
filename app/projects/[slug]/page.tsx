import { resumeData } from "@/data/resume";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Calendar, Code } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return resumeData.projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = resumeData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#030014] overflow-x-hidden text-white">
            <Navbar />

            <div className="relative pt-32 pb-20 px-4 max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/#projects" className="inline-block mb-8">
                    <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft size={20} /> Back to Projects
                    </Button>
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-purple-500" />
                            <span>{project.period}</span>
                        </div>
                        {project.github && (
                            <Link href={project.github} target="_blank" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                <Github size={18} className="text-purple-500" />
                                <span>View on GitHub</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                    <div className="space-y-8">
                        <Card className="bg-black/40 border-purple-500/30">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Code className="text-cyan-400" /> Project Overview
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.fullDescription || project.description}
                            </p>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-black/40 border-purple-500/30">
                            <h3 className="text-xl font-bold mb-4 text-purple-200">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
