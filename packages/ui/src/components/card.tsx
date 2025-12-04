import { cn } from "../lib/utils"

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex flex-col p-4 rounded-md border border-neutral-200", className)}>
            {children}
        </div>
    )
}