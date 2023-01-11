import { create, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserType {
    user_id: number
    username: string
}

interface UserState {
    user: null | UserType
    error: string | null
    setUser: (user: UserType | null) => void
    setError: (error: string | null) => void
}

const useAuthStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                error: null,
                setUser: (user: UserType | null) => set(() => ({ user })),
                setError: (error: string | null) => set(() => ({ error })),
            }),
            {
                name: 'auth-storage',
            }
        )
    )
)

export default useAuthStore
