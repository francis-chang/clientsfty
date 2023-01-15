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
    pickedAt: number
    pickedString: string
}

interface FilteredDraftedPlayerWithTeamName extends FilteredDraftedPlayer {
    owner: string
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
    picked: MockDraftPlayer | null
    round: number
    currentPick: number
}

export default () => {
    const [state, setState] = useState(initialState)
    const [draftList, setDraftList] = useState<MockDraftPlayer[]>([])
    const draftListQuery = useQuery('mockDraftList', getMockDraftList, { refetchOnWindowFocus: false })
    const { data, refetch } = useQuery('draftData', () => draft({ ...state, picked: state.picked?.PlayerID }), {
        enabled: false,
        refetchOnWindowFocus: false,
    })

    const [isOpen, setIsOpen] = useState(true)

    const [pickedList, setPickedList] = useState<FilteredDraftedPlayerWithTeamName[]>([])
    const [previousLengthOfPicked, setPreviousLengthOfPicked] = useState(0)

    useEffect(() => {
        if (data && draftListQuery.data) {
            setIsOpen(true)
            setState({ ...state, ...data })
            setPreviousLengthOfPicked(pickedList.length)
            let allPickedPlayerIDs: number[] = []
            // figure out how to get types from react query

            let allPicked: FilteredDraftedPlayerWithTeamName[] = []
            data.teams.forEach((team: TeamElement) => {
                allPickedPlayerIDs = [...allPickedPlayerIDs, ...team.team.map(({ PlayerID }) => PlayerID)]
                allPicked = [...allPicked, ...team.team.map((player) => ({ ...player, owner: team.name }))]
            })
            const newDraftList = draftListQuery.data.filter((player) => !allPickedPlayerIDs.includes(player.PlayerID))
            allPicked.sort((a, b) => b.pickedAt - a.pickedAt)
            setDraftList(newDraftList)
            setPickedList(allPicked)
        } else if (draftListQuery.data) {
            setDraftList(draftListQuery.data)
        }
    }, [data, draftListQuery.data])

    const setPicked = (player: MockDraftPlayer) => {
        setState({ ...state, picked: player })
    }

    const onClick = async () => {
        await refetch()
        setState({ ...state, picked: null })
    }

    // useEffect(() => {
    //     if (error) {
    //         console.log(error)
    //         useErrorStore.setState({ error: 'Something went wrong. Please try again later.' })
    //     }
    // }, [error])

    return [
        state,
        onClick,
        draftListQuery,
        setPicked,
        draftList,
        pickedList,
        previousLengthOfPicked,
        isOpen,
        setIsOpen,
    ] as const
}
