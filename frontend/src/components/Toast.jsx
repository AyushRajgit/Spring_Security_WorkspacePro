import Icon from './Icon'

export default function Toast({ notice, onDismiss }) {
  if (!notice) return null

  return (
    <div className={`toast toast-${notice.tone}`} role="status">
      <span className="toast-check">
        <Icon name={notice.tone === 'success' ? 'check' : 'close'} size={15} />
      </span>
      {notice.message}
      <button aria-label="Dismiss notification" type="button" onClick={onDismiss}>
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}
