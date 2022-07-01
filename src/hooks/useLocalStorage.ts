import { useEffect, useState } from "react"
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

    const [value, setValue] = useState<T>(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue] as [typeof value, typeof setValue]
}

