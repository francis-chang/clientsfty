import axios from 'axios'
import useErrorStore from 'utils/state/useErrorStore'

// const DEV_ENVIRONMENT = import.meta.env.NODE_ENV === 'development'

const PROD_KAYA_URL = import.meta.env.PROD_KAYA_URL ? import.meta.env.PROD_KAYA_URL : ''

// FIGURE OUT WAY TO SEPARATE PROD AND DEV ENVIRONMENT

// wrap fetches with a try catch

const base = axios.create({
    baseURL: 'https://kaya.fty.gg/auth',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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

// the third argument - store, represents a zustand store in which has an error property
// this is used in conjuction of the Error component which will bring up a fixed positioned error

// for example in createUser, useAuthStore is passed, then in the Register component, there is an Error Component
// that takes in an error paramter set by this apiPost below
const apiPost = async <T>(url: string, data: any, store: any): Promise<T | null> => {
    try {
        const response = await base.post<T, any>(url, data)
        return response.data
    } catch (err: any) {
        console.error(`error fetching ${url}`)
        if (err.response) {
            console.log(err.response.data)
            if (store) {
                store.setState({ error: err.response.data.msg })
            }
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            if (store) {
                store.setState({ error: 'Something went wrong. If error persists, please try again later.' })
            }
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

type UserCreateResponse = {
    user_id: number
    username: string
}

const createUser = async (username: string, password: string, email: string) => {
    return await apiPost<UserCreateResponse>(`/createuser`, { username, password, email }, useErrorStore)
}

const login = async (username: string, password: string) => {
    return await apiPost<UserCreateResponse>(`/login`, { username, password }, useErrorStore)
}

export { findUsernameAvailable, findEmailAvailable, createUser, login }
