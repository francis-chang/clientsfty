import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { findGame } from 'utils/api/game'
import Pusher, { Channel } from 'pusher-js'

const { VITE_PUSHER_CLIENT_KEY } = import.meta.env

if (!VITE_PUSHER_CLIENT_KEY) {
    console.log('PUSHER KEY NOT AVAILABLE')
}

export default (gameId: string | undefined) => {
    const [game, setGame] = useState<GameDetails>()
    const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })

    Pusher.logToConsole = true

    useEffect(() => {
        const pusher = new Pusher(VITE_PUSHER_CLIENT_KEY, {
            cluster: 'us2',
        })
        const channel = pusher.subscribe(`nbafantasygame_${gameId}`)
        channel.bind('players_adjust', (data: PlayersForGameDetails[]) => {
            if (game) {
                setGame({ ...game, players: data })
            }
        })

        return () => channel.unsubscribe()
    }, [])

    useEffect(() => {
        if (gameQuery.data) {
            setGame(gameQuery.data)
        }
    }, [gameQuery.data])

    return [game] as const
}
