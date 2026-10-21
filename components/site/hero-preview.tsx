import { Star } from 'lucide-react'
import { LogoMark } from './logo'
import { sampleLocations } from '@/lib/sample-data'
import styles from './hero-preview.module.css'

/* Derived from the shared Mumbai sample workspace so the preview never
   invents client names or extra widgets. */
const total = sampleLocations.length
const healthy = sampleLocations.filter((l) => l.status === 'healthy').length
const attention = sampleLocations.filter((l) => l.status === 'attention').length
const critical = sampleLocations.filter((l) => l.status === 'critical').length
const openItems = attention + critical
const reviews = sampleLocations.reduce((sum, l) => sum + l.reviews, 0)
const rating = (
  sampleLocations.reduce((sum, l) => sum + l.rating * l.reviews, 0) / reviews
).toFixed(1)

const row = (id: string) => sampleLocations.find((l) => l.id === id) ?? sampleLocations[0]
const THANE = row('thane')
const VASHI = row('vashi')

/* 12-week sample review trend — illustrative, labelled as such in the frame. */
const TREND = [18, 22, 20, 27, 25, 31, 30, 36, 34, 39, 41, 44]
const TREND_W = 156
const TREND_H = 30
const maxTrend = Math.max(...TREND)
const minTrend = Math.min(...TREND)
const trendPoints = TREND.map((value, i) => {
  const x = (i / (TREND.length - 1)) * TREND_W
  const y = TREND_H - 4 - ((value - minTrend) / (maxTrend - minTrend)) * (TREND_H - 9)
  return [Number(x.toFixed(1)), Number(y.toFixed(1))] as const
})
const trendLine = trendPoints.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
const trendArea = `${trendLine} L${TREND_W},${TREND_H} L0,${TREND_H} Z`
const lastPoint = trendPoints[trendPoints.length - 1]

export function HeroPreview() {
  return (
    <figure
      className={styles.preview}
      aria-label="Illustrative What The Local product preview: portfolio health, reviews and an Ahana insight for a twelve-site Mumbai workspace."
    >
      <div className={styles.bar}>
        <LogoMark className="size-[18px]" />
        <span className={styles.brand}>What The Local</span>
        <span aria-hidden="true" className={styles.barSep} />
        <span className={styles.context}>Portfolio overview</span>
        <span className={styles.sample}>
          <span aria-hidden="true" className={styles.sampleDot} />
          Sample data
        </span>
        <span className={styles.sync}>SYNCED 2M AGO</span>
      </div>

      <div className={styles.body}>
        <div className={styles.cards}>
          <section className={styles.card} aria-label="Portfolio health summary">
            <div className={styles.cardTop}>
              <span className={styles.kicker}>Portfolio health</span>
              <span className={styles.openPill}>{openItems} open</span>
            </div>
            <p className={styles.healthMain}>
              <b>{healthy}</b>
              <span>/ {total}</span>
            </p>
            <p className={styles.caption}>locations healthy</p>
            <div
              className={styles.segBar}
              role="img"
              aria-label={`${healthy} healthy, ${attention} need attention, ${critical} critical`}
            >
              <span className={styles.segOk} style={{ flex: healthy }} />
              <span className={styles.segWarn} style={{ flex: attention }} />
              <span className={styles.segBad} style={{ flex: critical }} />
            </div>
            <div className={styles.legend}>
              <span>
                <i className={styles.dotOk} aria-hidden="true" /> {healthy} healthy
              </span>
              <span>
                <i className={styles.dotWarn} aria-hidden="true" /> {attention} attention
              </span>
              <span>
                <i className={styles.dotBad} aria-hidden="true" /> {critical} critical
              </span>
            </div>
          </section>

          <section className={styles.card} aria-label="Review rating and trend summary">
            <div className={styles.cardTop}>
              <span className={styles.kicker}>Reviews</span>
              <span className={styles.monoMeta}>12 WK</span>
            </div>
            <p className={styles.ratingMain}>
              <b>{rating}</b>
              <Star aria-hidden="true" className={styles.star} />
            </p>
            <p className={styles.caption}>{reviews} reviews across {total} sites</p>
            <svg
              className={styles.spark}
              viewBox={`0 0 ${TREND_W} ${TREND_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.sparkArea} d={trendArea} />
              <path className={styles.sparkLine} d={trendLine} />
              <circle className={styles.sparkDot} cx={lastPoint[0]} cy={lastPoint[1]} r="2.2" />
            </svg>
            <p className={styles.sparkCaption}>Sample review momentum</p>
          </section>

          <section className={styles.ahana} aria-label="Ahana insight">
            <span className={styles.ahanaTag}>✦ Ahana insight</span>
            <p className={styles.ahanaText}>
              Wait-time mentions are rising at <b>Powai</b> this month. The rest of the network is
              steady.
            </p>
            <span className={styles.ahanaCta}>
              Open Powai <span aria-hidden="true">→</span>
            </span>
          </section>
        </div>

        <div className={styles.attention}>
          <div className={styles.attnHead}>
            <b>Needs attention</b>
            <span>2 of {openItems} shown</span>
          </div>

          <div className={styles.attnRow}>
            <span aria-hidden="true" className={styles.attnIconWarn}>
              ▲
            </span>
            <span className={styles.attnName}>{THANE.name}</span>
            <span className={styles.attnNote}>Saturday hours changed</span>
            <span className={styles.attnCode}>{THANE.code}</span>
            <span className={styles.attnActionWarn}>Revert →</span>
          </div>

          <div className={styles.attnRow}>
            <span aria-hidden="true" className={styles.attnIconBad}>
              ✕
            </span>
            <span className={styles.attnName}>{VASHI.name}</span>
            <span className={styles.attnNote}>3 unanswered · oldest 3 days</span>
            <span className={styles.attnCode}>{VASHI.code}</span>
            <span className={styles.attnActionBad}>Reply →</span>
          </div>
        </div>

        <div className={styles.foot}>
          <span>Illustrative workspace data</span>
          <span>Mumbai metro · {total} sites</span>
        </div>
      </div>
    </figure>
  )
}
