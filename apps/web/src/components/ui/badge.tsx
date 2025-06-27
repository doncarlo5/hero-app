import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        upperA: "border-transparent bg-sky-100/60 text-sky-700/80 font-medium hover:bg-sky-100/70",
        upperB: "border-transparent bg-purple-100/60 text-purple-700/80 font-medium hover:bg-purple-100/70",
        lower: "border-transparent bg-emerald-100/60 text-emerald-700/80 font-medium hover:bg-emerald-100/70",
        seanceA: "border-transparent bg-secondary text-secondary-foreground/80 hover:bg-secondary/80",
        seanceB: "border-transparent bg-secondary text-secondary-foreground/80 hover:bg-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
