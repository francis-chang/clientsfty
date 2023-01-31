import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getFourDayScores } from 'utils/api/redis_stats'
import { styled } from 'utils/theme'
import BoxScores from './BoxScores'

const NbaStats: React.FC = () => {
    const scores = useQuery('fourgameScores', getFourDayScores)

    return <Container>{scores.data && <BoxScores gamestats={scores.data} />}</Container>
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
