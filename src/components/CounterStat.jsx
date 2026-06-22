import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

export default function CounterStat({ value, suffix = '', prefix = '', label, className = '', valueClassName = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const startedRef = useRef(false)
  const rafRef = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ''))
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutQuart(progress) * numericValue))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView])

  const formatNumber = (n) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (n >= 1_000) return n.toLocaleString('es-HN')
    return n.toString()
  }

  return (
    <div ref={ref} className={className}>
      <div className={`font-black tabular-nums leading-none ${valueClassName || 'text-4xl md:text-5xl'}`}>
        {prefix}{formatNumber(count)}{suffix}
      </div>
      {label && <p className="mt-2 text-sm md:text-base opacity-80 leading-snug">{label}</p>}
    </div>
  )
}
