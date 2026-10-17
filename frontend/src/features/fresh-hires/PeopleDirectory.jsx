import Icon from '../../components/Icon'
import { fullName, initials, personColor } from './personUtils'

function EmptyState({ search, onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-art">
        <div className="empty-orbit orbit-one" />
        <div className="empty-orbit orbit-two" />
        <span className="empty-avatar"><Icon name={search ? 'search' : 'users'} size={26} /></span>
        <span className="empty-spark spark-one">✦</span>
        <span className="empty-spark spark-two">✧</span>
      </div>
      <h3>{search ? 'No matches found' : 'Your next great hire starts here'}</h3>
      <p>{search
        ? 'Try a different name, college, email, or position.'
        : 'Add your first fresh hire to start building your people directory.'}</p>
      {!search && (
        <button className="button button-primary" type="button" onClick={onAdd}>
          <Icon name="plus" size={17} /> Add your first hire
        </button>
      )}
    </div>
  )
}

function PersonRow({ person }) {
  return (
    <tr>
      <td>
        <div className="person-cell">
          <span className={`avatar avatar-${personColor(person)}`}>{initials(person)}</span>
          <span className="person-name"><strong>{fullName(person)}</strong><span>Fresh hire</span></span>
        </div>
      </td>
      <td><span className="role-pill"><i />{person.position || 'Position not set'}</span></td>
      <td>
        <div className="college-cell">
          <span className="college-badge"><Icon name="building" size={15} /></span>
          <span>{person.college || '—'}</span>
        </div>
      </td>
      <td>
        <a className="contact-link" href={`mailto:${person.email}`}>
          <Icon name="mail" size={15} />{person.email || 'No email'}
        </a>
        {person.phone && (
          <span className="contact-phone"><Icon name="phone" size={13} />{person.phone}</span>
        )}
      </td>
      <td className="td-arrow"><Icon name="arrow" size={15} /></td>
    </tr>
  )
}

export default function PeopleDirectory({ people, total, search, onSearch, onAdd, onDelete }) {
  return (
    <section className="directory-card">
      <div className="directory-heading">
        <div><h2>People directory</h2><p>Every new beginning, all in one view.</p></div>
        <button type="button" className="delete-by-id" onClick={onDelete}>
          <Icon name="trash" size={15} /> Remove by ID
        </button>
      </div>

      <div className="table-tools">
        <div className="search-wrap">
          <Icon name="search" size={18} />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search people, college, role..."
            aria-label="Search fresh hires"
          />
          <kbd>⌘ K</kbd>
        </div>
        <span className="result-count">
          <strong>{people.length}</strong> {people.length === 1 ? 'person' : 'people'}
        </span>
      </div>

      {people.length > 0 ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>NAME</th><th>POSITION</th><th>COLLEGE</th><th>CONTACT</th><th className="th-arrow" aria-label="Open details" /></tr>
            </thead>
            <tbody>{people.map((person, index) => <PersonRow key={`${person.email}-${index}`} person={person} />)}</tbody>
          </table>
        </div>
      ) : <EmptyState search={search} onAdd={onAdd} />}

      <div className="directory-footer">
        <span><span className="footer-check"><Icon name="check" size={12} /></span> Synced with your workspace</span>
        <span>Showing {people.length} of {total}</span>
      </div>
    </section>
  )
}
