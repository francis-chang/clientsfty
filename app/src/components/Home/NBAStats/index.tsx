import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getFourDayScores, getTStatlines } from 'utils/api/redis_stats'
import { styled } from 'utils/theme'
import BoxScores from './BoxScores'
import Statlines from './Statlines'

const NbaStats: React.FC = () => {
    const scores = useQuery('fourgameScores', getFourDayScores)
    const statsQuery = useQuery('gethomestatlines', getTStatlines)

    return (
        <Container>
            {scores.data && <BoxScores gamestats={scores.data} />}
            {statsQuery.data && <Statlines stats={statsQuery.data} />}
        </Container>
    )
}

export default NbaStats

const Container = styled.div`
    margin-top: 1rem;
    margin-left: 240px;
    display: flex;
`

const GameRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`
