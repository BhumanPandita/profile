"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "default" | "icon";
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 relative overflow-hidden group border",
                    size === "default" && "px-6 py-3",
                    size === "icon" && "h-10 w-10 p-0",

                    variant === "primary" && "bg-gradient-to-r from-primary to-secondary text-primary-foreground border-transparent shadow-lg shadow-primary/20 hover:shadow-secondary/30",
                    variant === "secondary" && "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
                    variant === "outline" && "bg-transparent border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary",
                    variant === "ghost" && "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
                {variant === "primary" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
