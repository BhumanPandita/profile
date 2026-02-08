import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl bg-[#111] border border-[#2A0E61] bg-opacity-30 backdrop-blur-sm p-6 text-card-foreground shadow-sm transition-all duration-300",
                    hoverEffect && "hover:shadow-lg hover:shadow-[#2A0E61]/40 hover:-translate-y-1 hover:border-[#7042f88b]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
