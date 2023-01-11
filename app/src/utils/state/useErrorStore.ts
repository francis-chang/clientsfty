import { create, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
    error: string | null
    setError: (error: string | null) => void
}

const useErrorStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                error: null,
                setError: (error: string | null) => set(() => ({ error })),
            }),
            {
                name: 'error-storage',
            }
        )
    )
)

export default useErrorStore
