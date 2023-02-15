import React from 'react'
import { styled } from 'utils/theme'
import CenterConsole from './CenterConsole'
import DraftList from './DraftList'

type Props = {
    draft: DraftInformationType | undefined
    draftList: PlayerForDraftList[]
    selectedPlayer: PlayerForDraftList | undefined
    setSelectedPlayer: React.Dispatch<React.SetStateAction<PlayerForDraftList | undefined>>
}

const Draft: React.FC<Props> = ({ draft, draftList, setSelectedPlayer, selectedPlayer }) => {
    return (
        <Container>
            <Left></Left>
            <Center>
                <CenterConsole selectedPlayer={selectedPlayer} />
                <DraftList draftList={draftList} setSelectedPlayer={setSelectedPlayer}></DraftList>
            </Center>
            <Right></Right>
        </Container>
    )
}

export default Draft

const Left = styled.div`
    flex-grow: 1;
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
