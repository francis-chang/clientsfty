import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { draft, getMockDraftList } from 'utils/api/redis_stats'
import useErrorStore from 'utils/state/useErrorStore'

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

type TeamElement = {
    name: string
    team: FilteredDraftedPlayer[]
}

type FilteredDraftedPlayer = {
    PlayerID: number
    name: string
    score: number
    n: number
}

const t: TeamElement[] = shuffle([
    { name: 'AdamAI', team: [] },
    { name: 'BenjaminAI', team: [] },
    { name: 'CharlieAI', team: [] },
    { name: 'DavidAI', team: [] },
    { name: 'EdwardAI', team: [] },
    { name: 'GeorgeAI', team: [] },
    { name: 'HarryAI', team: [] },
    { name: 'IsabellaAI', team: [] },
    { name: 'JuliaAI', team: [] },
    { name: 'KendallAI', team: [] },
    { name: 'MariAI', team: [] },
])
const youPlacement = Math.round(Math.random() * 9 + 1)
const teams = [...t.slice(0, youPlacement), { name: 'YOU', team: [] }, ...t.slice(youPlacement, t.length)]

const initialState = {
    teams,
    picked: null,
    round: 0,
    draftFinished: false,
    currentPick: 1,
} as {
    draftFinished: boolean
    teams: TeamElement[]
    picked: null | number
    round: number
    currentPick: number
}

export default () => {
    const [state, setState] = useState(initialState)
    const draftListQuery = useQuery('mockDraftList', getMockDraftList)
    const { data, refetch } = useQuery('draftData', () => draft(state), { enabled: false, refetchOnWindowFocus: false })

    useEffect(() => {
        if (data) {
            console.log(data)
            setState({ ...state, ...data })
        }
    }, [data])

    const setPicked = (player: MockDraftPlayer) => {
        setState({ ...state, picked: player.PlayerID })
    }

    const onClick = () => {
        refetch()
    }

    // useEffect(() => {
    //     if (error) {
    //         console.log(error)
    //         useErrorStore.setState({ error: 'Something went wrong. Please try again later.' })
    //     }
    // }, [error])

    return [state, onClick, draftListQuery, setPicked] as const
}
