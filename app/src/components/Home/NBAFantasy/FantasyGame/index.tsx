import React, { useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import useAuthStore from 'utils/state/useAuthStore'
import { styled } from 'utils/theme'
import InGame from './InGame'
import Lobby from './Lobby'
import useFantasyGame from './useFantasyGame'

const FantasyGame: React.FC = () => {
    const params = useParams()
    const [game, startGameHandler] = useFantasyGame(params.gameId)
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return !game ? (
        <Container>game not available</Container>
    ) : game.status === 'LOBBY' ? (
        <Lobby game={game} user={user} startGameHandler={startGameHandler} />
    ) : (
        <InGame game={game} user={user} />
    )
}

export default FantasyGame

const Container = styled.div``
