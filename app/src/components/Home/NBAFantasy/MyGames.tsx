import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAllGames } from 'utils/api/game'
import { styled } from 'utils/theme'

const MyGames: React.FC = () => {
    const allGames = useQuery('allGames', () => getAllGames())

    return (
        <Container>
            {allGames.data?.map((game) => (
                <Row key={game.game_id}>
                    <Title to={`/nbafantasygame/${game.game_id}`}>{game.name}</Title>
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
