import { useCallback, useMemo, useState } from 'react'
import { createFreshHire, deleteFreshHire, getFreshHires } from '../api/freshHireApi'
import { fullName } from '../features/fresh-hires/personUtils'

export default function useFreshHires() {
  const [people, setPeople] = useState([])
  const [search, setSearch] = useState('')
  const clearPeople = useCallback(() => setPeople([]), [])

  const loadPeople = useCallback(async () => {
    const data = await getFreshHires()
    if (!Array.isArray(data)) {
      throw new Error('The Fresh Hire API returned an unexpected response.')
    }
    setPeople(data)
    return data
  }, [])

  const addPerson = useCallback(async (details) => {
    const result = await createFreshHire(details)
    await loadPeople()
    return result
  }, [loadPeople])

  const removePerson = useCallback(async (id) => {
    await deleteFreshHire(id)
    await loadPeople()
  }, [loadPeople])

  const filteredPeople = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return people

    return people.filter((person) => (
      [fullName(person), person.email, person.phone, person.college, person.position]
        .join(' ')
        .toLowerCase()
        .includes(query)
    ))
  }, [people, search])

  const collegeCount = useMemo(
    () => new Set(people.map((person) => person.college?.trim()).filter(Boolean)).size,
    [people],
  )
  const positionCount = useMemo(
    () => new Set(people.map((person) => person.position?.trim()).filter(Boolean)).size,
    [people],
  )

  return {
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
  }
}
