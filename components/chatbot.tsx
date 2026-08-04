"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Trash2, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "model"; text: string };
const STORAGE_KEY = "bhuman_chat_history_v1";
const INITIAL_MSG: Message = { role: "model", text: "Hi! I'm Bhuman's AI Agent. I can answer any questions about his agentic AI systems, data pipelines, and experience." };

const SUGGESTIONS = [
    "Tell me about your AI work at IndiGo.",
    "What are your core technical skills?",
    "Where did you study?"
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const speechAudioRef = useRef<HTMLAudioElement | null>(null);
    const speechAudioUrlRef = useRef<string | null>(null);

    // 1. Load History on Mount
    useEffect(() => {
        let loadedMessages = [INITIAL_MSG];
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    loadedMessages = parsed;
                }
            }
        } catch (e) {
            console.error("Failed to load chat history:", e);
        }
        setMessages(loadedMessages);
    }, []);

    // 2. Auto-save & Auto-Scroll
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // Tooltip delayed trigger Every Time
    useEffect(() => {
        const showTimer = setTimeout(() => setShowTooltip(true), 2500);
        const hideTimer = setTimeout(() => setShowTooltip(false), 8500);
        return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }, []);

    const handleClearChat = () => {
        setMessages([INITIAL_MSG]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const stopSpeaking = () => {
        speechAudioRef.current?.pause();
        speechAudioRef.current = null;
        if (speechAudioUrlRef.current) URL.revokeObjectURL(speechAudioUrlRef.current);
        speechAudioUrlRef.current = null;
        setIsSpeaking(false);
    };

    const speakResponse = async (text: string) => {
        try {
            stopSpeaking();
            const response = await fetch("/api/speech", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error(`Speech synthesis failed with ${response.status}`);

            const audioUrl = URL.createObjectURL(await response.blob());
            const audio = new Audio(audioUrl);
            speechAudioRef.current = audio;
            speechAudioUrlRef.current = audioUrl;
            setIsSpeaking(true);
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                speechAudioUrlRef.current = null;
                if (speechAudioRef.current === audio) speechAudioRef.current = null;
                setIsSpeaking(false);
            };
            await audio.play();
        } catch (error) {
            console.error("Speech synthesis error:", error);
            setIsSpeaking(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userText = input.trim();
        setInput("");
        
        // Optimistically update UI
        const updatedMessages: Message[] = [...messages, { role: "user", text: userText }];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const result = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages })
            });

            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.error || "Failed to fetch AI network");
            }

            setMessages(prev => [...prev, { role: "model", text: data.response }]);
            void speakResponse(data.response);
        } catch (error) {
            console.error("Backend Error:", error);
            setMessages(prev => [...prev, { role: "model", text: "Sorry, I ran into an error connecting to my neural network. Please check my server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (isLoading) return;
        
        // Optimistically update UI
        const updatedMessages: Message[] = [...messages, { role: "user", text: suggestion }];
        setMessages(updatedMessages);
        setIsLoading(true);

        // Directly call fetch instead of setting state to avoid closure issues with 'input'
        fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updatedMessages })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            setMessages(prev => [...prev, { role: "model", text: data.response }]);
            void speakResponse(data.response);
        })
        .catch(err => {
            console.error(err);
            setMessages(prev => [...prev, { role: "model", text: "I ran into a connection error. Please try again!" }]);
        })
        .finally(() => setIsLoading(false));
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-[84px] right-0 w-[calc(100vw-48px)] sm:w-[400px] h-[calc(100dvh-130px)] sm:h-[550px] max-h-[800px] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Premium Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10 bg-gradient-to-r from-zinc-100/80 dark:from-black/60 to-primary/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-tr from-primary/20 dark:from-primary/30 to-secondary/20 dark:to-secondary/30 rounded-full border border-black/5 dark:border-white/5 relative">
                                    <Sparkles size={16} className="text-primary absolute top-0 right-0 animate-pulse" />
                                    <Bot size={20} className="text-zinc-800 dark:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white tracking-wide">Bhuman's AI Agent</h3>
                                    <p className="text-[10px] text-green-600 dark:text-green-400 mt-0.5 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                {isSpeaking && (
                                    <button
                                        onClick={stopSpeaking}
                                        title="Stop speaking"
                                        className="text-red-500 hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-red-500/10"
                                    >
                                        <VolumeX size={18} />
                                    </button>
                                )}
                                <button 
                                    onClick={handleClearChat}
                                    title="Erase Chat History"
                                    className="text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-red-500/10 dark:hover:bg-red-400/10"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={idx} 
                                    className={"flex items-start gap-3 " + (msg.role === "user" ? "justify-end" : "justify-start")}
                                >
                                    {msg.role === "model" && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/10 dark:from-primary/20 to-secondary/10 dark:to-secondary/20 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                                            <Bot size={14} className="text-zinc-800 dark:text-white" />
                                        </div>
                                    )}
                                    
                                    <div className={"px-4 py-3 rounded-2xl text-[14px] leading-relaxed max-w-[85%] shadow-sm " + (
                                        msg.role === "user" 
                                        ? "bg-primary text-white font-medium rounded-tr-sm" 
                                        : "bg-zinc-100/80 dark:bg-white/10 text-zinc-900 dark:text-zinc-200 rounded-tl-sm border border-black/5 dark:border-white/5 font-light"
                                    )}>
                                        {msg.role === "user" ? (
                                            msg.text
                                        ) : (
                                            <div className="markdown-prose break-words [&>p]:mb-3 last:[&>p]:mb-0 [&>strong]:font-semibold [&>strong]:text-black dark:[&>strong]:text-white [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-3 [&>li]:mb-1 [&>a]:text-primary [&>a]:underline">
                                                <ReactMarkdown>
                                                    {msg.text}
                                                </ReactMarkdown>
                                                <button
                                                    onClick={() => void speakResponse(msg.text)}
                                                    title="Play this response"
                                                    className="mt-2 inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-primary transition-colors"
                                                >
                                                    <Volume2 size={13} /> Listen
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {msg.role === "user" && (
                                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 mt-1">
                                            <User size={14} className="text-zinc-700 dark:text-white" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            
                            {isLoading && (
                                <div className="flex items-start gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/10 dark:from-primary/20 to-secondary/10 dark:to-secondary/20 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                                        <Bot size={14} className="text-zinc-800 dark:text-white" />
                                    </div>
                                    <div className="px-5 py-4 rounded-2xl bg-zinc-100/80 dark:bg-white/5 rounded-tl-sm border border-black/5 dark:border-white/5 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:-.15s]" />
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                                    </div>
                                </div>
                            )}

                            {/* Suggestion Chips */}
                            {messages.length === 1 && !isLoading && (
                                <div className="flex flex-col gap-2 pt-2 ml-10">
                                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold px-2">Suggestions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SUGGESTIONS.map((s, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestionClick(s)}
                                                className="px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 hover:border-primary/50 hover:text-primary transition-all text-left"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-1" />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-black/40">
                            <div className="flex items-center gap-2 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Message AI Agent..."
                                    className="flex-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-zinc-500 shadow-inner"
                                    disabled={isLoading}
                                    autoFocus
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={"absolute right-1.5 top-1.5 bottom-1.5 rounded-full w-9 flex items-center justify-center transition-all " + 
                                        (input.trim() ? "bg-primary text-white shadow-md hover:scale-105 active:scale-95" : "bg-zinc-200 dark:bg-white/10 text-zinc-500")}
                                >
                                    <Send size={14} className={input.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timed Welcome Tooltip */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute right-[80px] bottom-3 bg-white dark:bg-[#1a1a1a] text-black dark:text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-xl border border-black/10 dark:border-white/10 flex items-center gap-2 pointer-events-none"
                    >
                        <Sparkles size={16} className="text-primary animate-pulse" />
                        <span className="text-sm font-medium tracking-tight whitespace-nowrap">Ask my Agent anything!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ultra-Premium Animated Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => { 
                    setIsOpen(!isOpen); 
                    setShowTooltip(false); 
                }}
                className="group relative h-16 w-16 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center border border-black/10 dark:border-white/20 overflow-hidden"
            >
                {/* Glowing Aura Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 dark:from-cyan-500/20 via-primary/10 dark:via-purple-500/20 to-transparent opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                
                {/* Rotating Tech Ring */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[3px] rounded-full border border-dashed border-black/20 dark:border-white/30 group-hover:border-black/40 dark:group-hover:border-white/50 transition-colors duration-300"
                />

                <span className="relative z-10 flex items-center justify-center">
                    {isOpen ? (
                        <X size={26} className="text-zinc-600 dark:text-white" />
                    ) : (
                        <div className="relative">
                            <Sparkles size={10} className="text-primary dark:text-cyan-300 absolute -top-1 -right-1.5 animate-pulse" />
                            <Bot size={26} className="text-zinc-900 dark:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                            <Sparkles size={8} className="text-secondary dark:text-purple-300 absolute -bottom-1 -left-1.5 animate-pulse [animation-delay:1s]" />
                        </div>
                    )}
                </span>
            </motion.button>
        </div>
    );
}
