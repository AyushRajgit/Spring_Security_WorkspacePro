import Icon from '../../components/Icon'
import PeopleDirectory from './PeopleDirectory'
import StatsGrid from './StatsGrid'

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="FreshHire home">
      <span className="brand-mark"><span>fh</span></span>
      <span className="brand-name">freshhire<span>WORKSPACE</span></span>
    </a>
  )
}

function Sidebar({ email, peopleCount, onLogout }) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-label">DIRECTORY</div>
      <nav className="side-nav" aria-label="Main navigation">
        <button className="nav-item active" type="button">
          <Icon name="users" /><span>Fresh hires</span><span className="nav-count">{peopleCount}</span>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon"><Icon name="shield" size={17} /></div>
          <strong>Your data, in one place</strong>
          <p>Keep every new starter's details close at hand.</p>
        </div>
        <button className="profile-row" type="button" onClick={onLogout} title="Sign out">
          <span className="avatar avatar-profile">{email?.[0]?.toUpperCase() || 'U'}</span>
          <span className="profile-copy">
            <strong>{email || 'Signed in'}</strong><span>Workspace member</span>
          </span>
          <Icon name="logout" size={17} className="profile-logout" />
        </button>
      </div>
    </aside>
  )
}

function Topbar({ email }) {
  return (
    <header className="topbar">
      <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Fresh hires</strong></div>
      <div className="topbar-right">
        <span className="live-indicator"><i /> API connected</span>
        <span className="topbar-avatar">{email?.[0]?.toUpperCase() || 'U'}</span>
      </div>
    </header>
  )
}

export default function FreshHireDashboard({
  email,
  people,
  filteredPeople,
  search,
  onSearch,
  collegeCount,
  positionCount,
  onRefresh,
  refreshing,
  onAdd,
  onDelete,
  onLogout,
}) {
  return (
    <main className="app-shell">
      <Sidebar email={email} peopleCount={people.length} onLogout={onLogout} />
      <section className="main-panel">
        <Topbar email={email} />
        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">PEOPLE DIRECTORY</div>
              <h1>Fresh hires<span className="title-dot">.</span></h1>
              <p className="page-subtitle">A thoughtful start begins with knowing who's joining.</p>
            </div>
            <div className="heading-actions">
              <button className="button button-quiet" type="button" onClick={onRefresh} disabled={refreshing}>
                <span className={refreshing ? 'refresh-icon spinning' : 'refresh-icon'}>↻</span> Refresh
              </button>
              <button className="button button-primary" type="button" onClick={onAdd}>
                <Icon name="plus" size={18} /> Add fresh hire
              </button>
            </div>
          </div>

          <StatsGrid total={people.length} colleges={collegeCount} positions={positionCount} />
          <PeopleDirectory
            people={filteredPeople}
            total={people.length}
            search={search}
            onSearch={onSearch}
            onAdd={onAdd}
            onDelete={onDelete}
          />
          <footer className="page-footer">
            <span>Made for good beginnings.</span>
            <span>FRESHHIRE <b>·</b> PEOPLE OPERATIONS</span>
          </footer>
        </div>
      </section>
    </main>
  )
}
