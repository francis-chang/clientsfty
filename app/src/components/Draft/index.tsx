import React from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'utils/theme'
import useDraft from './useDraft'
import { AnimatePresence, motion } from 'framer-motion'
import Draft from './Draft'

const DraftIndex: React.FC = () => {
    const { draftId } = useParams()
    const [
        draft,
        loaded,
        draftList,
        selectedPlayer,
        setSelectedPlayer,
        listView,
        setListView,
        catView,
        setCatView,
        setSelectedDraftedPlayer,
    ] = useDraft(parseInt(draftId ? draftId : '-1'))

    return (
        <AnimatePresenceDiv>
            {loaded ? (
                <Draft
                    draft={draft}
                    selectedPlayer={selectedPlayer}
                    draftList={draftList}
                    setSelectedPlayer={setSelectedPlayer}
                    listView={listView}
                    setListView={setListView}
                    catView={catView}
                    setCatView={setCatView}
                    setSelectedDraftedPlayer={setSelectedDraftedPlayer}
                />
            ) : (
                <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Title>fty.gg</Title>
                    <Subtitle>LOADING DRAFT...</Subtitle>
                </Container>
            )}
        </AnimatePresenceDiv>
    )
}

export default DraftIndex

const AnimatePresenceDiv = styled(AnimatePresence)`
    position: relative;
`
const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 25%;
`

const Title = styled.div`
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: 0.08rem;
`

const Subtitle = styled.div`
    color: ${({ theme }) => theme.colors.dark1};
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
`
