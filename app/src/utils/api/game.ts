import axios from 'axios'
import { defaultForm } from 'components/Home/NBAFantasy/CreateNBAGame/useForm'

const DEV_ENVIRONMENT = import.meta.env.MODE === 'development'

const gameUrl = DEV_ENVIRONMENT ? 'http://localhost:5555/game' : 'https://kaya.fty.gg/game'

const base = axios.create({
    baseURL: gameUrl,
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
})

const apiPost = async <T>(url: string, data: any, store: any): Promise<T | null> => {
    try {
        const response = await base.post<T, any>(url, data)
        return response.data
    } catch (err: any) {
        console.error(`error fetching ${url}`)
        if (err.response) {
            console.log(err.response)
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

const createGame = async (data: typeof defaultForm) => {
    return await apiPost<GameInterface>(`/create`, data, null)
}

export { createGame }
