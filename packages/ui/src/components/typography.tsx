import { forwardRef, ForwardRefRenderFunction } from 'react'
import { cn } from '../lib/utils'

type TypographyProps = {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
    color?: string
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
    children: React.ReactNode
    className?: string
    preserveLineBreaks?: boolean
}
const _Typography: ForwardRefRenderFunction<HTMLDivElement, TypographyProps> = (
    {
        size = 'sm',
        color = 'neutral-900',
        weight = 'normal',
        children,
        className,
        preserveLineBreaks = false,
        ...rest
    },
    ref
) => {
    const classes = cn(
        `font-poppins font-${weight} text-${color} text-${size}`,
        preserveLineBreaks && 'whitespace-pre-line',
        className
    )
    return (
        <div ref={ref} className={classes} {...rest}>
            {children}
        </div>
    )
}

export const Typography = forwardRef(_Typography)
