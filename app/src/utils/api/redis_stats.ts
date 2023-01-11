import axios from 'axios'
import useErrorStore from 'utils/state/useErrorStore'

// const DEV_ENVIRONMENT = import.meta.env.NODE_ENV === 'development'

const PROD_KAYA_URL = import.meta.env.PROD_KAYA_URL ? import.meta.env.PROD_KAYA_URL : ''

// FIGURE OUT WAY TO SEPARATE PROD AND DEV ENVIRONMENT

// wrap fetches with a try catch

const base = axios.create({
    baseURL: 'http://localhost:3000/redis_stats',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const apiGet = async <T>(url: string): Promise<T | null> => {
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

const mockDraftBase = axios.create({
    baseURL: 'http://localhost:3000/mockdraft',
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

// for react-query usage
const getMockDraftList = async () => {
    const response = await base.get<MockDraftPlayer[]>('getmockdraftlist')
    if (response) {
        return response.data
    }
}

const draft = async (data: any) => {
    const response = await mockDraftBase.post('draft', data)
    if (response) {
        return response.data
    }
}

export { getMockDraftList, draft }
