export default function Field({ label, value, onChange, type = 'text', required = false, ...props }) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <label className="form-field" htmlFor={id}>
      <span className="field-label">
        {label}{required && <i> *</i>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        {...props}
      />
    </label>
  )
}
