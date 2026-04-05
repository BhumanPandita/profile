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
                    // Use theme tokens instead of hard-coded hex values so light/dark mode both work
                    "rounded-xl bg-card/30 border border-border backdrop-blur-sm p-6 text-card-foreground shadow-sm transition-all duration-300",
                    hoverEffect && "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50",
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
