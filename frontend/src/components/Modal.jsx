import { useEffect } from 'react'
import Icon from './Icon'

export default function Modal({ title, subtitle, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <span className="modal-heading-icon">
            <Icon name={title.includes('Remove') ? 'trash' : 'users'} size={18} />
          </span>
          <button className="modal-close" type="button" aria-label="Close dialog" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
          <h2 id="modal-title">{title}</h2>
          <p>{subtitle}</p>
        </div>
        {children}
      </section>
    </div>
  )
}
