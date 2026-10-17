import Icon from '../../components/Icon'

export default function AuthScreen({ mode, setMode, form, setForm, error, busy, onSubmit, notice }) {
  const isLogin = mode === 'login'

  return (
    <main className="auth-screen">
      <section className="auth-art-panel">
        <a className="brand auth-brand" href="#home">
          <span className="brand-mark"><span>fh</span></span>
          <span className="brand-name">freshhire<span>WORKSPACE</span></span>
        </a>
        <div className="auth-art-copy">
          <span className="art-kicker"><i /> PEOPLE, WITH PURPOSE</span>
          <h1>Make every<br />first day <em>count.</em></h1>
          <p>One thoughtful place to welcome new talent and keep your people details in good company.</p>
          <div className="auth-illustration" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-card art-card-back"><span /><span /><span /></div>
            <div className="art-card art-card-front">
              <div className="art-card-top">
                <span className="art-mini-avatar">J</span>
                <div><b>Jordan Lee</b><i>Product designer</i></div>
                <span className="art-verified"><Icon name="check" size={12} /></span>
              </div>
              <div className="art-card-line" />
              <div className="art-card-bottom"><span>FIRST DAY</span><b>MON, 09:30 AM</b></div>
            </div>
            <span className="art-confetti confetti-a">✳</span>
            <span className="art-confetti confetti-b">✦</span>
            <span className="art-confetti confetti-c">·</span>
            <span className="art-label">A warm welcome<br />starts right here.</span>
          </div>
        </div>
        <div className="auth-art-footer">
          <span>FRESHHIRE <b>·</b> PEOPLE OPERATIONS</span>
          <span>GOOD PEOPLE. GOOD BEGINNINGS.</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand">
            <span className="brand-mark"><span>fh</span></span>
            <span className="brand-name">freshhire<span>WORKSPACE</span></span>
          </div>
          <div className="auth-overline">
            <span className="auth-overline-icon"><Icon name="key" size={15} /></span>
            YOUR TEAM, ALL TOGETHER
          </div>
          <h2>{isLogin ? 'Welcome back' : 'Create your account'}<span>.</span></h2>
          <p className="auth-intro">
            {isLogin
              ? 'Sign in to pick up where your people journey left off.'
              : 'Set up your workspace and start welcoming new people.'}
          </p>

          {notice && (
            <div className="auth-success">
              <span><Icon name="check" size={15} /></span>
              {notice.message}
            </div>
          )}
          {error && (
            <div className="auth-error" role="alert">
              <span>!</span>{error}
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <label className="field-label" htmlFor="auth-email">Email address</label>
            <div className="auth-input">
              <Icon name="mail" size={17} />
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>

            <div className="password-label-row">
              <label className="field-label" htmlFor="auth-password">Password</label>
              {isLogin && <span className="password-hint">Your secure workspace login</span>}
            </div>
            <div className="auth-input">
              <Icon name="key" size={17} />
              <input
                id="auth-password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            </div>

            {!isLogin && (
              <div className="register-note">
                <Icon name="shield" size={15} />
                <span>New accounts start with the Employee role.</span>
              </div>
            )}
            <button className="button button-primary auth-submit" type="submit" disabled={busy}>
              {busy
                ? <><span className="button-spinner" /> {isLogin ? 'Signing in...' : 'Creating account...'}</>
                : <>{isLogin ? 'Sign in to workspace' : 'Create account'} <Icon name="arrow" size={17} /></>}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? (
              <>New to FreshHire? <button type="button" onClick={() => setMode('register')}>Create an account <Icon name="chevron" size={14} /></button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => setMode('login')}>Sign in <Icon name="chevron" size={14} /></button></>
            )}
          </div>
          <div className="auth-secure">
            <Icon name="shield" size={15} />
            <span>Your session is protected with secure authentication.</span>
          </div>
        </div>
        <div className="auth-mobile-footer">FRESHHIRE · PEOPLE OPERATIONS</div>
      </section>
    </main>
  )
}
