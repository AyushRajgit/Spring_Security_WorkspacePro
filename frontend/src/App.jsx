import { useEffect, useState } from 'react'
import { login, logout, register } from './api/authApi'
import LoadingScreen from './components/LoadingScreen'
import Toast from './components/Toast'
import AuthScreen from './features/auth/AuthScreen'
import FreshHireDashboard from './features/fresh-hires/FreshHireDashboard'
import FreshHireDialogs, { emptyHire } from './features/fresh-hires/FreshHireDialogs'
import useFreshHires from './hooks/useFreshHires'
import './App.css'

function App() {
  const [screen, setScreen] = useState('loading')
  const [authMode, setAuthMode] = useState('login')
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('freshhire-email') || '')
  const [modal, setModal] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [notice, setNotice] = useState(null)
  const [authError, setAuthError] = useState('')
  const [hireForm, setHireForm] = useState(emptyHire)
  const [authForm, setAuthForm] = useState({ email: '', password: '' })
  const [deleteId, setDeleteId] = useState('')

  const {
    people,
    clearPeople,
    filteredPeople,
    search,
    setSearch,
    collegeCount,
    positionCount,
    loadPeople,
    addPerson,
    removePerson,
  } = useFreshHires()

  useEffect(() => {
    let active = true

    loadPeople().then(() => {
      if (active) setScreen('dashboard')
    }).catch((error) => {
      if (!active) return
      setScreen('auth')
      if (!error.message.includes('Sign in again')) setAuthError(error.message)
    })

    return () => { active = false }
  }, [loadPeople])

  function showNotice(message, tone = 'success') {
    setNotice({ message, tone })
    window.setTimeout(() => setNotice(null), 4200)
  }

  async function handleAuth(event) {
    event.preventDefault()
    setAuthError('')
    setAuthBusy(true)

    try {
      if (authMode === 'register') {
        const result = await register(authForm)
        setAuthMode('login')
        setAuthForm((current) => ({ ...current, password: '' }))
        showNotice(result || 'Account created. You can sign in now.')
        return
      }

      await login(authForm)
      localStorage.setItem('freshhire-email', authForm.email)
      setUserEmail(authForm.email)
      const data = await loadPeople()
      setScreen('dashboard')
      showNotice('Welcome back. Your Fresh Hire workspace is ready.')
      if (!data.length) setSearch('')
    } catch (error) {
      setAuthError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setAuthBusy(false)
    }
  }

  async function handleAddHire(event) {
    event.preventDefault()
    setSaving(true)

    try {
      const result = await addPerson(hireForm)
      setModal('')
      setHireForm(emptyHire)
      showNotice(result || 'Fresh hire added successfully.')
    } catch (error) {
      if (error.message.includes('session has ended')) setScreen('auth')
      showNotice(error.message || 'Could not add this hire.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteHire(event) {
    event.preventDefault()
    setSaving(true)

    try {
      await removePerson(deleteId)
      setModal('')
      setDeleteId('')
      showNotice('Fresh hire removed.')
    } catch (error) {
      if (error.message.includes('session has ended')) setScreen('auth')
      showNotice(error.message || 'Could not remove this hire.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleRefresh() {
    setRefreshing(true)
    try {
      await loadPeople()
      showNotice('Fresh hire list is up to date.')
    } catch (error) {
      if (error.message.includes('session has ended')) setScreen('auth')
      showNotice(error.message || 'Could not refresh the list.', 'error')
    } finally {
      setRefreshing(false)
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Clear local state even if the server session already expired.
    }

    localStorage.removeItem('freshhire-email')
    setUserEmail('')
    clearPeople()
    setAuthForm({ email: '', password: '' })
    setScreen('auth')
    setAuthError('')
  }

  if (screen === 'loading') return <LoadingScreen />

  if (screen === 'auth') {
    return (
      <>
        <AuthScreen
          mode={authMode}
          setMode={(mode) => { setAuthMode(mode); setAuthError('') }}
          form={authForm}
          setForm={setAuthForm}
          error={authError}
          busy={authBusy}
          onSubmit={handleAuth}
          notice={notice}
        />
      </>
    )
  }

  return (
    <>
      <FreshHireDashboard
        email={userEmail}
        people={people}
        filteredPeople={filteredPeople}
        search={search}
        onSearch={setSearch}
        collegeCount={collegeCount}
        positionCount={positionCount}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onAdd={() => setModal('add')}
        onDelete={() => setModal('delete')}
        onLogout={handleLogout}
      />
      <FreshHireDialogs
        modal={modal}
        onClose={() => setModal('')}
        onAdd={handleAddHire}
        onDelete={handleDeleteHire}
        saving={saving}
        hireForm={hireForm}
        setHireForm={setHireForm}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
      />
      <Toast notice={notice} onDismiss={() => setNotice(null)} />
    </>
  )
}

export default App
