import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
        }

        const sizes = {
            sm: "h-9 px-3 rounded-md text-sm",
            md: "h-10 px-4 py-2 rounded-md",
            lg: "h-11 px-8 rounded-md text-lg",
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props as any}
            >
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
