import axios from 'axios'

// const DEV_ENVIRONMENT = import.meta.env.NODE_ENV === 'development'

const PROD_KAYA_URL = import.meta.env.PROD_KAYA_URL ? import.meta.env.PROD_KAYA_URL : ''

// FIGURE OUT WAY TO SEPARATE PROD AND DEV ENVIRONMENT

// wrap fetches with a try catch

const base = axios.create({
    baseURL: 'http://localhost:5555/auth',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const apiCall = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await base.get<T, any>(url)
        return response.data
    } catch (err: any) {
        console.error(`error fetching ${url}`)
        if (err.response) {
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(err.request)
        } else {
            // Something happened in setting up the request that triggered an err
            console.error(err.message)
        }
        return null
    }
}

const findUsernameAvailable = async (username: string) => {
    const response = await apiCall<{ msg: string }>(`/finduser/${username}`)
    if (response && response.msg === 'USERNAME_AVAILABLE') {
        return true
    }
    return false
}

const findEmailAvailable = async (email: string) => {
    const response = await apiCall<{ msg: string }>(`/findemail/${email}`)
    if (response && response.msg === 'EMAIL_AVAILABLE') {
        return true
    }
    return false
}
export { findUsernameAvailable, findEmailAvailable }
