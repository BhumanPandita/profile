"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Loader2, Mail, MapPin, Linkedin, Github } from "lucide-react";
import Link from 'next/link';

// Placeholder Input Component
function SimpleInput({ className, ...props }: any) {
    return (
        <input
            className={`w-full bg-accent/50 backdrop-blur-sm border border-input rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${className}`}
            {...props}
        />
    )
}
// Placeholder Textarea Component
function SimpleTextarea({ className, ...props }: any) {
    return (
        <textarea
            className={`w-full bg-accent/50 backdrop-blur-sm border border-input rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px] ${className}`}
            {...props}
        />
    )
}

export function Contact() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        };

        try {
            // Using FormSubmit.co for serverless email handling
            const response = await fetch("https://formsubmit.co/ajax/bhumanpandita4@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                console.error("Failed to send message");
                setStatus("error");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
                            Let's Build the Future
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Card className="flex items-center gap-4 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-secondary/50 transition-colors">
                            <div className="p-3 rounded-full bg-primary/20 text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Email</div>
                                <div className="text-foreground font-medium">bhumanpandita4@gmail.com</div>
                            </div>
                        </Card>

                        <Card className="flex items-center gap-4 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-secondary/50 transition-colors">
                            <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Location</div>
                                <div className="text-foreground font-medium">Bengaluru, India</div>
                            </div>
                        </Card>

                        <div className="flex gap-4 pt-4">
                            <Link href="https://linkedin.com/in/bhumanpandita" target="_blank">
                                <Button variant="outline" className="w-full gap-2">
                                    <Linkedin size={20} /> LinkedIn
                                </Button>
                            </Link>
                            <Link href="https://github.com/BhumanPandita" target="_blank">
                                <Button variant="outline" className="w-full gap-2">
                                    <Github size={20} /> GitHub
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 rounded-full" />

                    <Card className="border-t border-t-primary/50 bg-card/30 backdrop-blur-xl">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                                <p className="text-muted-foreground mt-2">I'll get back to you as soon as possible.</p>
                                <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
                                    Send another message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <SimpleInput name="name" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <SimpleInput name="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                                    <SimpleTextarea name="message" placeholder="Tell me about your project..." required />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 transform hover:scale-[1.02]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={20} />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send className="ml-2" size={20} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
