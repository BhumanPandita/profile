"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumeData } from "@/data/resume";
import ReactMarkdown from "react-markdown";

const API_KEY = "AIzaSyDx9oQ518udpwaam87xQHduSgZazHozppc";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `
You are an expert AI assistant living on Bhuman Pandita's portfolio website. 
You act as his digital representative, answering questions from recruiters and engineers.
Keep your answers concise, highly professional, and lean heavily into highlighting his AI, Machine Learning, and Data Science expertise.
Use markdown for formatting. Bold key terms, use bullet points for lists.

IMPORTANT TIME CONTEXT: 
Bhuman is an ALUMNI of BITS Pilani (Class of 2025). He has already graduated. He is a full-time professional working in the industry, and is NOT a current student. Be sure to answer as if he has already finished college.

Here is the document context (RAG data) you have access to:
Name: ${resumeData.personalInfo.name}
Title: ${resumeData.personalInfo.title}
Bio: ${resumeData.personalInfo.bio}
Skills: ${resumeData.skills.join(", ")}
Experience: ${JSON.stringify(resumeData.experience)}
Projects: ${JSON.stringify(resumeData.projects)}
Education: ${JSON.stringify(resumeData.education)}

If the user asks something outside this context, politely let them know you don't have that specific file but they can email Bhuman directly at ${resumeData.personalInfo.email}.
`;

type Message = { role: "user" | "model"; text: string };
const STORAGE_KEY = "bhuman_chat_history_v1";
const INITIAL_MSG: Message = { role: "model", text: "Hi! I'm Bhuman's AI Agent. I can answer any questions about his agentic AI systems, data pipelines, and experience." };

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    
    const chatSessionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

        // Prep history for Gemini connection
        const geminiHistory = loadedMessages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        
        // Gemini API strictly expects alternating user->model history if it exists. 
        if (geminiHistory[0]?.role === "model") {
            geminiHistory.unshift({ role: "user", parts: [{ text: "Hello" }] });
        }

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: SYSTEM_INSTRUCTION,
            });
            chatSessionRef.current = model.startChat({
                history: geminiHistory,
            });
        } catch (e) {
            console.error("Failed to initialize Gemini:", e);
        }
    }, []);

    // 2. Persist History continuously & Tooltip trigger
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
        
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: SYSTEM_INSTRUCTION,
            });
            chatSessionRef.current = model.startChat({
                history: [
                    { role: "user", parts: [{ text: "Hello" }] },
                    { role: "model", parts: [{ text: INITIAL_MSG.text }] }
                ],
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !chatSessionRef.current || isLoading) return;
        
        const userText = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userText }]);
        setIsLoading(true);

        try {
            const result = await chatSessionRef.current.sendMessage(userText);
            const responseText = result.response.text();
            setMessages(prev => [...prev, { role: "model", text: responseText }]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { role: "model", text: "Sorry, I ran into an error connecting to my neural network. Please try again!" }]);
        } finally {
            setIsLoading(false);
        }
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
                        className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] max-h-[75vh] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
