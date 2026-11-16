import { cn } from "@/lib/utils"

type StarFieldProps = {
  className?: string
  count?: number
}

export function StarField({ className, count = 90 }: StarFieldProps) {
  const stars = Array.from({ length: count }, (_, index) => {
    const x = (index * 79 + 13) % 100
    const y = (index * 43 + 7) % 100
    const size = index % 11 === 0 ? 2.4 : index % 4 === 0 ? 1.8 : 1.1
    const violet = index % 3 !== 0
    const delay = ((index * 7) % 40) / 10
    const duration = 3.4 + ((index * 5) % 17) / 4

    return {
      x,
      y,
      size,
      color: violet ? "bg-[#8f86ff]" : "bg-white",
      opacity: 0.22 + ((index * 13) % 55) / 100,
      blur: index % 11 === 0 ? 1 : 0,
      animated: index % 2 === 0,
      delay,
      duration,
    }
  })

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full",
            star.color,
            star.animated && "animate-[twinkle_var(--twinkle-duration)_ease-in-out_infinite]"
          )}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            filter: star.blur ? "blur(1px)" : undefined,
            ["--twinkle-duration" as string]: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
