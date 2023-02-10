import React, { useEffect } from 'react'
import { styled } from 'utils/theme'
import { joinGame } from 'utils/api/game'

const FindGames: React.FC = () => {
    return (
        <Container>
            <button onClick={async () => await joinGame(25)}>timetojoin game</button>
        </Container>
    )
}

export default FindGames

const Container = styled.div``
