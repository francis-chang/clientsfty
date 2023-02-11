import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { findGame, startDraft, startGame } from 'utils/api/game'
import Pusher from 'pusher-js'

const { VITE_PUSHER_CLIENT_KEY } = import.meta.env

if (!VITE_PUSHER_CLIENT_KEY) {
    console.log('PUSHER KEY NOT AVAILABLE')
}

export default (gameId: string | undefined) => {
    const [game, setGame] = useState<GameDetails>()
    const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })

    Pusher.logToConsole = true

    const startGameHandler = async () => {
        if (gameId) {
            const response = await startGame(parseInt(gameId))
            // figure out which data to set into state
            setGame(response)
        }
    }

    const startDraftHandler = async (game_id: number, user_id: number) => {
        const response = await startDraft(game_id)
        const players = game?.players.slice()

        if (response && players && game) {
            const newPlayers = players.map((p) => {
                if (p.user_id === user_id) {
                    p.draft = response
                    return p
                }
                return p
            })

            setGame({ ...game, players: newPlayers })
        }
    }

    useEffect(() => {
        const pusher = new Pusher(VITE_PUSHER_CLIENT_KEY, {
            cluster: 'us2',
        })
        const channel = pusher.subscribe(`nbafantasygame_${gameId}`)
        channel.bind('players_adjust', (data: PlayersForGameDetails[]) => {
            setGame((g) => {
                if (g) {
                    return { ...g, players: data }
                }
                return undefined
            })
        })

        return () => channel.unsubscribe()
    }, [])

    useEffect(() => {
        if (gameQuery.data) {
            setGame(gameQuery.data)
        }
    }, [gameQuery.data])

    return [game, startGameHandler, startDraftHandler] as const
}
