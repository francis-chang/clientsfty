import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getFourDayScores } from 'utils/api/redis_stats'
import { styled } from 'utils/theme'

const NbaStats: React.FC = () => {
    const scores = useQuery('fourgameScores', getFourDayScores)

    return (
        <Container>
            {scores.data &&
                scores.data.map((game) => (
                    <GameRow>
                        <div>{game.date}</div>
                        {game.games.map((g) => (
                            <div>
                                {g.away_team.Key +
                                    '  ' +
                                    g.AwayTeamScore +
                                    ' ' +
                                    g.home_team.Key +
                                    ' ' +
                                    g.HomeTeamScore}
                            </div>
                        ))}
                    </GameRow>
                ))}
            <div>hi</div>
        </Container>
    )
}

export default NbaStats

const Container = styled.div`
    margin-left: 240px;
`

const GameRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`
