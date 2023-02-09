import React from 'react'
import { styled } from 'utils/theme'

type Props = {
    game: GameDetails
}

const GameSettings: React.FC<Props> = ({ game }) => {
    return (
        <Container>
            <Title>Settings</Title>
            <DescContainer>
                <DescTitle>Draft Format</DescTitle>

                <Desc>{game.draftFormat === 'LIVE_DRAFT' ? 'LIVE DRAFT' : 'AI DRAFT'}</Desc>
            </DescContainer>
            <DescContainer>
                <DescTitle>Number of AI Teams for Draft</DescTitle>

                <Desc>{game.numberOfTeamsToSimul}</Desc>
            </DescContainer>
            <DescContainer>
                <DescTitle>Scoring</DescTitle>

                <Desc>9 CAT H2H</Desc>
            </DescContainer>
            <DescContainer>
                <DescTitle>Number of Games per Draft Interval</DescTitle>

                <Desc>{game.numGames}</Desc>
            </DescContainer>
        </Container>
    )
}

export default GameSettings
const Title = styled.div`
    margin-bottom: 0.6rem;

    color: ${({ theme }) => theme.colors.light25};
    font-weight: 500;
    font-size: 1.3rem;
`

const Container = styled.div`
    margin-bottom: 1rem;
    width: 21rem;
`

const DescContainer = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
    justify-content: space-between;
`
const DescTitle = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light3};
`

// const Grow = styled.div`
//     flex-grow: 1;
//     border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark2}`};
//     margin: 0rem 0.2rem;
//     margin-bottom: 0.1rem;
// `

const Desc = styled.div`
    font-weight: 600;

    color: ${({ theme }) => theme.colors.light25};
`
