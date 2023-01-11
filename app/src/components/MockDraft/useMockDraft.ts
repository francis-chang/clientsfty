import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { draft, getMockDraftList } from 'utils/api/redis_stats'
import useErrorStore from 'utils/state/useErrorStore'

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const teams = shuffle([
    { name: 'AdamAI', team: [] },
    { name: 'BenjaminAI', team: [] },
    { name: 'CharlieAI', team: [] },
    { name: 'DavidAI', team: [] },
    { name: 'EdwardAI', team: [] },
    { name: 'YOU', team: [] },
    { name: 'GeorgeAI', team: [] },
    { name: 'HarryAI', team: [] },
    { name: 'IsabellaAI', team: [] },
    { name: 'JuliaAI', team: [] },
    { name: 'KendallAI', team: [] },
    { name: 'MariAI', team: [] },
])

const initialState = {
    draftStarted: false,
    teams,
    pick: teams.indexOf('YOU') + 1,
}

export default () => {
    const [state, setState] = useState(initialState)
    // const { isLoading, error, data } = useQuery('mockDraftList', getMockDraftList)
    const { isLoading, error, data } = useQuery('mockDraftList', () => draft(initialState))

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if (error) {
            console.log(error)
            useErrorStore.setState({ error: 'Something went wrong. Please try again later.' })
        }
    }, [error])

    return [data, isLoading, state] as const
}
