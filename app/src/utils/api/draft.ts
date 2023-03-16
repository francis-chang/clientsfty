import axios from 'axios'
import useErrorStore from 'utils/state/useErrorStore'

const base = axios.create({
    baseURL: 'https://yasha.fty.gg/draft',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
})

const baseKayaDraft = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5555/draft' : 'https://kaya.fty.gg/draft',
    timeout: 20000,
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

const kayaApiPost = async <T>(url: string, data: any, store: any): Promise<T | null> => {
    try {
        const response = await baseKayaDraft.post<T, any>(url, data)
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

const getDraftList = async () => {
    return await apiCall<PlayerForDraftList[]>('/draftlist')
}

const startDraft = async (draft_id: number) => {
    return await kayaApiPost('/draftstart', { draft_id }, null)
}

const draftPlayerPick = async (draftpick: { s_name: string; PlayerID: number }, draft_id: number) => {
    return await kayaApiPost('/playerpick', { player_tobe_drafted: draftpick, draft_id }, null)
}

export { getDraftList, startDraft, draftPlayerPick }
