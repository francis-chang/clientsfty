import React from 'react'
import { draftPlayerPick } from 'utils/api/draft'
import { Button, FontRubik, styled } from 'utils/theme'
import PlayerStatsCenterConsole from './StatContainer'

type Props = {
    selectedPlayer: PlayerForDraftList | undefined
    draft_id: number
    all_picks: DraftPick[]
    is_player_turn: boolean
}

const CenterConsole: React.FC<Props> = ({ selectedPlayer, draft_id, all_picks, is_player_turn }) => {
    const draftPlayer = async () => {
        if (selectedPlayer) {
            // response will be handled by websocket
            // although an optimistic render might be nice
            if (is_player_turn) {
                await draftPlayerPick(
                    { s_name: selectedPlayer.s_name, PlayerID: selectedPlayer.season_averages.PlayerID },
                    draft_id
                )
            }
        }
    }

    const findIfDrafted = () => {
        const player = all_picks.find((element) => element.PlayerID === selectedPlayer?.last_five_averages.PlayerID)

        if (player) {
            return player
        }
        return false
    }

    const playerDrafted = findIfDrafted()

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
                        {playerDrafted ? (
                            <InfoContainer>
                                <div>{playerDrafted.info}</div>
                                <InfoSub>
                                    {playerDrafted.type === 'COMPUTER_PICK' ? 'Picked by Bot' : 'Picked by You'}
                                </InfoSub>
                            </InfoContainer>
                        ) : (
                            <DraftButton
                                is_player_turn={is_player_turn}
                                disabled={!is_player_turn}
                                onClick={draftPlayer}
                            >
                                DRAFT
                            </DraftButton>
                        )}
                    </SelectedPlayerContainerTop>
                    <PlayerStatsCenterConsole selectedPlayer={selectedPlayer} />
                </SelectedPlayerContainer>
            ) : null}
        </Container>
    )
}

export default CenterConsole

const InfoSub = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light3};
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SelectedPlayerContainer = styled.div``

const SelectedPlayerContainerTop = styled.div`
    display: flex;
    justify-content: space-between;
`

const NameContainer = styled.div`
    min-width: 15rem;
    display: flex;
    flex-grow: 1;

    align-items: center;
`

type DraftButtonProps = {
    is_player_turn: boolean
}

const DraftButton = styled(Button)<DraftButtonProps>`
    font-size: 1.1rem;
    font-weight: 700;
    background-color: ${({ theme, is_player_turn }) => (is_player_turn ? theme.colors.blue2 : theme.colors.dark2)};
    color: ${({ theme, is_player_turn }) => (is_player_turn ? theme.colors.light2 : theme.colors.light4)};
    cursor: ${({ is_player_turn }) => (is_player_turn ? 'pointer' : 'not-allowed')};
    &:hover {
        background-color: ${({ theme, is_player_turn }) => (is_player_turn ? theme.colors.blue1 : theme.colors.dark2)};
    }
`

const Container = styled.div``

type JerseyProps = {
    inner_color: string
    outer_color: string
}

const Jersey = styled(FontRubik)<JerseyProps>`
    background-color: ${({ outer_color }) => outer_color};
    color: ${({ inner_color }) => inner_color};
    border-radius: 4px;
    font-size: 1.6rem;
    font-weight: 700;
    margin-right: 0.6rem;
    height: 100%;
    width: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Name = styled.div`
    font-weight: 500;
    font-size: 1.35rem;
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
