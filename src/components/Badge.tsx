import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/lib/utils"
import { Code2, Sparkles, Workflow } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-secondary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-primary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        selected: "border-transparent text-black dark:text-white text-md",
        suggested:
          "border border-[#14F195]/50 text-[#14F195] hover:bg-[#14F195]/10 transition-colors duration-200",
        codepie:
          "border-transparent bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
        sonnet:
          "border-transparent bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
        lionganify:
          "border-transparent bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  type,
  ...props
}: BadgeProps & { type?: "codepie" | "sonnet" | "lionganify" }) {
  const Icon =
    type === "codepie"
      ? Code2
      : type === "sonnet"
        ? Sparkles
        : type === "lionganify"
          ? Workflow
          : null

  return (
    <div
      className={cn(badgeVariants({ variant: type || variant }), className)}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
