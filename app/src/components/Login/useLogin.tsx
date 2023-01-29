import { useState } from 'react'
import { login } from 'utils/api/auth'
import useAuthStore from 'utils/state/useAuthStore'

const useLogin = () => {
    const [username, setU] = useState('')
    const [password, setP] = useState('')

    const [finalLogin, setFinalLogin] = useState(false)

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await login(username, password)
        if (response) {
            useAuthStore.setState({ user: response })
            setFinalLogin(true)
        }
    }

    const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setU(e.target.value)
    }

    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setP(e.target.value)
    }

    return [username, password, setUsername, setPassword, submitLogin, finalLogin] as const
}

export default useLogin
