import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

export default function ProgressBar({
  label,
  current,
  total,
  percent: percentOverride,
  color = '#C0392B',
  unit = '',
  className = '',
}) {
  const { t } = useTranslation('progressBar')
  const pct = percentOverride !== undefined
    ? percentOverride
    : Math.min(Math.round((current / total) * 100), 100)

  const [width, setWidth] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(pct), 150)
      return () => clearTimeout(timer)
    }
  }, [inView, pct])

  const formatNum = (n) => typeof n === 'number' ? n.toLocaleString('es-HN') : n

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex justify-between items-end mb-1.5 gap-4">
        <span className="text-sm font-medium text-cafe leading-tight">{label}</span>
        <span className="text-sm font-bold text-cafe flex-shrink-0" style={{ color }}>
          {pct}%
        </span>
      </div>

      {/* Numbers below label */}
      {current !== undefined && total !== undefined && (
        <div className="flex justify-between text-xs text-cafe-light mb-2">
          <span>{formatNum(current)}{unit} {t('achieved')}</span>
          <span>{t('goal')} {formatNum(total)}{unit}</span>
        </div>
      )}

      {/* Bar */}
      <div className="w-full h-2.5 bg-crema-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1400ms] ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
