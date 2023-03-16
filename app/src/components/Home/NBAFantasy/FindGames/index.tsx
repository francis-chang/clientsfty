import React, { useEffect } from 'react'
import { styled } from 'utils/theme'
import { joinGame, searchGames } from 'utils/api/game'
import { useQuery } from 'react-query'

const FindGames: React.FC = () => {
    const searchGamesQuery = useQuery(`search_games`, () => searchGames())

    useEffect(() => {
        console.log(searchGamesQuery.data)
    }, [searchGamesQuery.data])

    return (
        <Container>
            {searchGamesQuery.data &&
                searchGamesQuery.data.map((game_element) => (
                    <GameContainer key={game_element.game_id}>
                        <div>{game_element.name}</div>
                        <button onClick={async () => await joinGame(game_element.game_id)}>timetojoin game</button>
                    </GameContainer>
                ))}
        </Container>
    )
}

export default FindGames

const Container = styled.div``

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
`
