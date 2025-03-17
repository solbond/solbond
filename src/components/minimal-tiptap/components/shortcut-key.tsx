import { cn } from "~/lib/utils"
import { getShortcutKeys } from "../utils"

interface ShortcutKeyProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[]
  withBg?: boolean
}

const ShortcutKey = ({
  className,
  keys,
  withBg,
  ...props
}: ShortcutKeyProps) => {
  return (
    <span
      className={cn("text-xs tracking-widest opacity-60", className)}
      {...props}
    >
      <span
        className={cn("ml-4", {
          "bg-accent self-end rounded p-1 leading-3": withBg,
        })}
      >
        {getShortcutKeys(keys)}
      </span>
    </span>
  )
}

ShortcutKey.displayName = "ShortcutKey"

export { ShortcutKey }
