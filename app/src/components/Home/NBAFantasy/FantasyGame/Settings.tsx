import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { styled } from 'utils/theme'
import { useGame } from '.'

const GameSettings: React.FC = () => {
    const data = useGame()
    return (
        <Container>
            <DescRow>
                <DescContainer>
                    <DescTitle>DRAFT FORMAT</DescTitle>
                    <Desc>{data.draftFormat}</Desc>
                </DescContainer>
                <DescContainer>
                    <DescTitle># AI TEAMS</DescTitle>
                    <Desc>{data.numberOfTeamsToSimul}</Desc>
                </DescContainer>
                <DescContainer>
                    <DescTitle>SCORING</DescTitle>
                    <Desc>9 CAT H2H</Desc>
                </DescContainer>
                <DescContainer>
                    <DescTitle># GM/DRAFT INTERVAL</DescTitle>
                    <Desc>{data.numGames}</Desc>
                </DescContainer>
            </DescRow>
        </Container>
    )
}

export default GameSettings

const Container = styled.div`
    margin-top: 1.5rem;
`

const DescRow = styled.div`
    display: flex;
    flex-direction: column;
`

const DescContainer = styled.div`
    padding: 1rem;
    display: flex;

    &:not(:last-child) {
        margin-right: 2rem;
    }
    align-items: center;
`
const DescTitle = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.light4};
`

const Desc = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.light2};
`
