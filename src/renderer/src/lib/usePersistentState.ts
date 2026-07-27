import { useEffect, useState } from 'react'

/** useState, значение которого переживает перезапуск приложения. */
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(`aftof:${key}`)
    if (stored === null) return initial
    try {
      return JSON.parse(stored) as T
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(`aftof:${key}`, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
