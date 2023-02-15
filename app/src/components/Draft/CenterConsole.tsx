import React from 'react'
import { Button, styled } from 'utils/theme'

type Props = {
    selectedPlayer: PlayerForDraftList | undefined
}

const CenterConsole: React.FC<Props> = ({ selectedPlayer }) => {
    return (
        <Container>
            {selectedPlayer ? (
                <SelectedPlayerContainer>
                    <SelectedPlayerContainerTop>
                        <NameContainer>
                            <Jersey
                                inner_color={selectedPlayer.team.inner_color}
                                outer_color={selectedPlayer.team.outer_color}
                            >
                                {selectedPlayer.Jersey}
                            </Jersey>
                            <NameAndTeam>
                                <Name>{selectedPlayer.FirstName + ' ' + selectedPlayer.LastName}</Name>
                                <Team>{selectedPlayer.team.City + ' ' + selectedPlayer.team.Name}</Team>
                            </NameAndTeam>
                        </NameContainer>
                        <DraftButton>DRAFT</DraftButton>
                    </SelectedPlayerContainerTop>
                </SelectedPlayerContainer>
            ) : null}
        </Container>
    )
}

export default CenterConsole

const SelectedPlayerContainer = styled.div``

const SelectedPlayerContainerTop = styled.div`
    display: flex;
    justify-content: space-between;
`

const NameContainer = styled.div`
    width: 15rem;
    min-width: 15rem;
    display: flex;

    align-items: center;
`

const DraftButton = styled(Button)`
    font-size: 1.1rem;
    font-weight: 700;
`

const Container = styled.div`
    margin-bottom: 0.5rem;
    height: 250px;
`

type JerseyProps = {
    inner_color: string
    outer_color: string
}

const Jersey = styled.div<JerseyProps>`
    background-color: ${({ outer_color }) => outer_color};
    color: ${({ inner_color }) => inner_color};
    padding: 0.3rem;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 700;
    margin-right: 0.6rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Name = styled.div`
    font-weight: 600;
`

const Team = styled.div`
    font-size: 0.87rem;
    color: ${({ theme }) => theme.colors.light4};
`

const NameAndTeam = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
