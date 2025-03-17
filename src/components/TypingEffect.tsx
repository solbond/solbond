import { useEffect, useState } from "react"

interface TypingEffectProps {
  text: string
  delay?: number
  className?: string
}

export function TypingEffect({
  text,
  delay = 0.01,
  className,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span className={className}>{displayText}</span>
}
