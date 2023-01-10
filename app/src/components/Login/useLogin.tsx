import { useState } from 'react'
// import authAPI from 'utils/api/auth'

const useLogin = () => {
    const [username, setU] = useState('')
    const [password, setP] = useState('')

    const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // authAPI.login(username, password)
    }

    const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setU(e.target.value)
    }

    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setP(e.target.value)
    }

    return [username, password, setUsername, setPassword, submitLogin] as const
}

export default useLogin
