import Icon from '../../components/Icon'

export default function StatsGrid({ total, colleges, positions }) {
  return (
    <section className="stats-grid" aria-label="Directory summary">
      <article className="stat-card stat-card-dark">
        <div className="stat-top">
          <span className="stat-label">TOTAL FRESH HIRES</span>
          <span className="stat-icon stat-icon-dark"><Icon name="users" size={18} /></span>
        </div>
        <div className="stat-number">{total.toString().padStart(2, '0')}</div>
        <div className="stat-foot">
          <span className="stat-caption">in your workspace</span>
          <span className="stat-trend"><Icon name="arrow" size={14} /></span>
        </div>
        <div className="stat-decoration" />
      </article>

      <article className="stat-card">
        <div className="stat-top">
          <span className="stat-label">COLLEGES</span>
          <span className="stat-icon stat-icon-yellow"><Icon name="building" size={18} /></span>
        </div>
        <div className="stat-number">{colleges.toString().padStart(2, '0')}</div>
        <div className="stat-foot"><span className="stat-caption">represented in the directory</span></div>
      </article>

      <article className="stat-card">
        <div className="stat-top">
          <span className="stat-label">POSITIONS</span>
          <span className="stat-icon stat-icon-mint"><Icon name="briefcase" size={18} /></span>
        </div>
        <div className="stat-number">{positions.toString().padStart(2, '0')}</div>
        <div className="stat-foot"><span className="stat-caption">unique roles across your team</span></div>
      </article>
    </section>
  )
}
