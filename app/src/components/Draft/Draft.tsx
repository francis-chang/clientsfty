import React from 'react'

import { styled } from 'utils/theme'
import CenterConsole from './CenterConsole'
import DraftList from './DraftList'
import Left from './Left'

type Props = {
    draft: DraftInformationType | undefined
    draftList: PlayerForDraftList[]
    selectedPlayer: PlayerForDraftList | undefined
    setSelectedPlayer: React.Dispatch<React.SetStateAction<PlayerForDraftList | undefined>>
    listView: 'SEASON' | 'FIVE'
    setListView: (viewType: 'SEASON' | 'FIVE') => void
    catView: keyof PlayerForDraftListAvgs
    setCatView: (viewType: keyof PlayerForDraftListAvgs) => void
}

const Draft: React.FC<Props> = ({
    draft,
    draftList,
    setSelectedPlayer,
    selectedPlayer,
    listView,
    setListView,
    catView,
    setCatView,
}) => {
    return (
        <Container>
            {draft ? (
                <>
                    <Left draft={draft} />

                    <Center>
                        <CenterConsole selectedPlayer={selectedPlayer} draft_id={draft.draft_id} />
                        <PickView>
                            <PickViewInner>
                                <PickViewButton selected={listView === 'SEASON'} onClick={() => setListView('SEASON')}>
                                    SEASON AVG
                                </PickViewButton>
                                <PickViewButton selected={listView === 'FIVE'} onClick={() => setListView('FIVE')}>
                                    LAST 5 AVG
                                </PickViewButton>
                            </PickViewInner>
                            <PickViewInner>
                                <PickViewButtonCat selected={catView === 'Points'} onClick={() => setCatView('Points')}>
                                    PTS
                                </PickViewButtonCat>
                                <PickViewButtonCat
                                    selected={catView === 'Rebounds'}
                                    onClick={() => setCatView('Rebounds')}
                                >
                                    REB
                                </PickViewButtonCat>
                                <PickViewButtonCat
                                    selected={catView === 'Assists'}
                                    onClick={() => setCatView('Assists')}
                                >
                                    AST
                                </PickViewButtonCat>
                                <PickViewButtonCat selected={catView === 'Steals'} onClick={() => setCatView('Steals')}>
                                    STL
                                </PickViewButtonCat>
                                <PickViewButtonCat
                                    selected={catView === 'BlockedShots'}
                                    onClick={() => setCatView('BlockedShots')}
                                >
                                    BLK
                                </PickViewButtonCat>
                                <PickViewButtonCat
                                    selected={catView === 'ThreePointersMade'}
                                    onClick={() => setCatView('ThreePointersMade')}
                                >
                                    3PM
                                </PickViewButtonCat>
                                <PickViewButtonCat
                                    selected={catView === 'FantasyPoints'}
                                    onClick={() => setCatView('FantasyPoints')}
                                >
                                    FAN
                                </PickViewButtonCat>
                            </PickViewInner>
                        </PickView>
                        <DraftList
                            listView={listView}
                            draftList={draftList}
                            setSelectedPlayer={setSelectedPlayer}
                            selectedPlayer={selectedPlayer}
                        ></DraftList>
                    </Center>
                    <Right></Right>
                </>
            ) : null}
        </Container>
    )
}

export default Draft

const PickView = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
`

type PickViewButtonProps = {
    selected: boolean
}

const PickViewInner = styled.div`
    display: flex;
`

const PickViewButtonCat = styled.div<PickViewButtonProps>`
    padding: 0.5rem;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark4)};
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
    cursor: pointer;
    border-radius: 4px;
    font-weight: 700;
    transition-duration: 200ms;
    transition-timing-function: ease;
    font-size: 0.9rem;
    &:not(:last-child) {
        margin-right: 0.4rem;
    }
    &:hover {
        background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light25)};
    }
`

const PickViewButton = styled.div<PickViewButtonProps>`
    padding: 0.5rem 1rem;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark4)};
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
    cursor: pointer;
    margin-right: 0.5rem;
    border-radius: 4px;
    font-weight: 700;
    transition-duration: 200ms;
    transition-timing-function: ease;
    font-size: 0.9rem;

    &:hover {
        background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light25)};
    }
`

const DraftedList = styled.div`
    display: flex;
    flex-direction: column;
`

const Right = styled.div`
    flex-grow: 1;
`

const Center = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const Container = styled.div`
    overflow: hidden;
    display: flex;
    margin: 0 auto;
    width: 1400px;
    padding-top: 1rem;
`
