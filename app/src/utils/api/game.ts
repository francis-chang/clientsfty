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
    return await apiPost<GameDetails>(`/create`, data, null)
}

const findGame = async (gameId: string | undefined) => {
    if (!gameId) {
        return null
    }
    return await apiCall<GameDetails>(`/find/${gameId}`)
}

const getAllGames = async () => {
    return await apiCall<GameDetailsWrapper[]>('/getallgames')
}

const joinGame = async (game_id: number) => {
    return await apiPost<any>('/joingame', { game_id }, null)
}

const leaveGame = async (userforgame_id: number) => {
    return await apiPost<any>('/leavegame', { userforgame_id }, null)
}

const kickPlayer = async (game_id: number, player_to_kick_id: number) => {
    return await apiPost<any>('/kickplayer', { game_id, player_to_kick_id }, null)
}

const startGame = async (game_id: number) => {
    return await apiPost<any>('/startgame', { game_id }, null)
}

const startDraft = async (game_id: number) => {
    const response = await apiPost<{
        draft_id: number
        userforgame_id: number
    }>('/startdraft', { game_id }, null)

    return response
}

const findDraft = async (draft_id: number) => {
    return await apiPost<DraftInformationType>('/finddraft', { draft_id }, null)
}

export { createGame, findGame, getAllGames, joinGame, leaveGame, kickPlayer, startGame, startDraft, findDraft }
