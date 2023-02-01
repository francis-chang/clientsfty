import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAllGames, leaveGame } from 'utils/api/game'
import { styled } from 'utils/theme'

const MyGames: React.FC = () => {
    const allGames = useQuery('allGames', () => getAllGames())

    const onClick = async (userforgame_id: number) => {
        await leaveGame(userforgame_id)
        await allGames.refetch()
    }

    return (
        <Container>
            {allGames.data?.map((game) => (
                <Row key={game.userforgame_id}>
                    <Title to={`/nbafantasygame/${game.game.game_id}`}>{game.game.name}</Title>
                    <button onClick={() => onClick(game.userforgame_id)}>Leave</button>
                </Row>
            ))}
        </Container>
    )
}

export default MyGames

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`
const Title = styled(Link)`
    color: ${({ theme }) => theme.colors.light2};
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 700;
`
