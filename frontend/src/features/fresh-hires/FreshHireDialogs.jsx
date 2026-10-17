import Field from '../../components/Field'
import Icon from '../../components/Icon'
import Modal from '../../components/Modal'

export const emptyHire = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  college: '',
  position: '',
}

function FormActions({ saving, onClose, action, pendingLabel, icon, tone = 'primary' }) {
  return (
    <div className="modal-actions">
      <button className="button button-quiet" type="button" onClick={onClose}>Cancel</button>
      <button className={`button button-${tone}`} type="submit" disabled={saving}>
        {saving
          ? <><span className="button-spinner" /> {pendingLabel}</>
          : <><Icon name={icon} size={16} /> {action}</>}
      </button>
    </div>
  )
}

function AddHireDialog({ onClose, onSubmit, saving, form, setForm }) {
  return (
    <Modal
      title="Add a fresh hire"
      subtitle="A few details to help your new teammate feel at home."
      onClose={onClose}
    >
      <form className="modal-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <Field label="First name" required value={form.firstName} onChange={(firstName) => setForm({ ...form, firstName })} placeholder="e.g. Jordan" />
          <Field label="Last name" required value={form.lastName} onChange={(lastName) => setForm({ ...form, lastName })} placeholder="e.g. Lee" />
          <Field label="Work email" type="email" required value={form.email} onChange={(email) => setForm({ ...form, email })} placeholder="jordan@company.com" />
          <Field label="Phone number" type="tel" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} placeholder="+1 555 000 0000" />
          <Field label="College / university" required value={form.college} onChange={(college) => setForm({ ...form, college })} placeholder="School or university" />
          <Field label="Position" required value={form.position} onChange={(position) => setForm({ ...form, position })} placeholder="e.g. Product designer" />
        </div>
        <FormActions saving={saving} onClose={onClose} action="Add fresh hire" pendingLabel="Saving..." icon="plus" />
      </form>
    </Modal>
  )
}

function DeleteHireDialog({ onClose, onSubmit, saving, id, setId }) {
  return (
    <Modal
      title="Remove a fresh hire"
      subtitle="This action permanently removes the selected record."
      onClose={onClose}
    >
      <form className="modal-form" onSubmit={onSubmit}>
        <div className="permission-note">
          <span><Icon name="shield" size={17} /></span>
          <p>
            Removing a hire requires a <strong>Manager</strong> account. Your backend list API does not return record IDs, so enter the ID from your database.
          </p>
        </div>
        <Field label="Fresh hire record ID" type="number" min="1" required value={id} onChange={setId} placeholder="e.g. 12" />
        <FormActions
          saving={saving}
          onClose={onClose}
          action="Remove hire"
          pendingLabel="Removing..."
          icon="trash"
          tone="danger"
        />
      </form>
    </Modal>
  )
}

export default function FreshHireDialogs({
  modal,
  onClose,
  onAdd,
  onDelete,
  saving,
  hireForm,
  setHireForm,
  deleteId,
  setDeleteId,
}) {
  if (modal === 'add') {
    return (
      <AddHireDialog
        onClose={onClose}
        onSubmit={onAdd}
        saving={saving}
        form={hireForm}
        setForm={setHireForm}
      />
    )
  }

  if (modal === 'delete') {
    return (
      <DeleteHireDialog
        onClose={onClose}
        onSubmit={onDelete}
        saving={saving}
        id={deleteId}
        setId={setDeleteId}
      />
    )
  }

  return null
}
