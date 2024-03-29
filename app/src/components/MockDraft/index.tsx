import React, { useEffect, useRef, useState } from 'react'
import { Button, styled } from 'utils/theme'
import useMockDraft from './useMockDraft'
import { FixedSizeList as List } from 'react-window'

import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Finished from './Finished'

function getOrdinal(n: number) {
    let ordinal = ''
    const lastDigit = n % 10
    if (lastDigit === 1) {
        ordinal = 'st'
    } else if (lastDigit === 2) {
        ordinal = 'nd'
    } else if (lastDigit === 3) {
        ordinal = 'rd'
    } else {
        ordinal = 'th'
    }
    return n + ordinal
}

const MockDraft: React.FC = () => {
    const [
        state,
        onClick,
        draftListQuery,
        setPicked,
        draftList,
        pickedList,
        previousPickedLength,
        isOpen,
        setIsOpen,
        fin,
        setFin,
        scoreDraft,
    ] = useMockDraft()

    const draftBoardRef = useRef<HTMLDivElement>(null)

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [translateY, setTranslateY] = useState({ isOpen: 0, isNotOpen: window.innerHeight - 60 })

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: draftBoardRef.current!.clientWidth,
                height: draftBoardRef.current!.clientHeight,
            })
            setTranslateY({
                isOpen: 0,
                isNotOpen: window.innerHeight - 60,
            })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (draftBoardRef.current) {
            setDimensions({
                width: draftBoardRef.current.clientWidth,
                height: draftBoardRef.current.clientHeight,
            })
            setTranslateY({
                isOpen: 0,
                isNotOpen: window.innerHeight - 60,
            })
        }
    }, [draftBoardRef])

    const Row = ({ index, style }: any) => {
        const playerInfo = draftList[index]

        return (
            <RowElement onClick={() => setPicked(draftList[index])} style={style}>
                <RowInner selected={state.picked?.PlayerID === playerInfo.PlayerID}>
                    <NameAndJersey key={playerInfo.PlayerID}>
                        <NameContainer>
                            <Jersey
                                inner_color={playerInfo.player.team.inner_color}
                                outer_color={playerInfo.player.team.outer_color}
                            >
                                {playerInfo.player.Jersey}
                            </Jersey>
                            <NameAndTeam>
                                <Name>{playerInfo.player.s_name}</Name>
                                <Team>{playerInfo.player.team.City + ' ' + playerInfo.player.team.Name}</Team>
                            </NameAndTeam>
                        </NameContainer>
                        <StatsContainer>
                            <Stat>
                                <StatNumber>{playerInfo.Points}</StatNumber>
                                <StatDesc>PTS</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{playerInfo.Rebounds}</StatNumber>
                                <StatDesc>REB</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{playerInfo.Assists}</StatNumber>
                                <StatDesc>AST</StatDesc>
                            </Stat>
                        </StatsContainer>
                    </NameAndJersey>
                </RowInner>
            </RowElement>
        )
    }

    return fin ? (
        <Finished data={scoreDraft} />
    ) : (
        <Container>
            <SelectedPlayer>
                {state.picked ? (
                    <>
                        <NameContainer>
                            <Jersey
                                inner_color={state.picked.player.team.inner_color}
                                outer_color={state.picked.player.team.outer_color}
                            >
                                {state.picked.player.Jersey}
                            </Jersey>
                            <NameAndTeam>
                                <Name>{state.picked.player.s_name}</Name>
                                <Team>{state.picked.player.team.City + ' ' + state.picked.player.team.Name}</Team>
                            </NameAndTeam>
                            <DraftButton onClick={onClick}>Draft</DraftButton>
                        </NameContainer>
                        <SelectedStatsContainer>
                            <Stat>
                                <StatNumber>{state.picked.Points}</StatNumber>
                                <StatDesc>PTS</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.Rebounds}</StatNumber>
                                <StatDesc>REB</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.Assists}</StatNumber>
                                <StatDesc>AST</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.Steals}</StatNumber>
                                <StatDesc>STL</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.BlockedShots}</StatNumber>
                                <StatDesc>BLK</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.Turnovers}</StatNumber>
                                <StatDesc>TOS</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>{state.picked.FantasyPoints}</StatNumber>
                                <StatDesc>FAN</StatDesc>
                            </Stat>
                        </SelectedStatsContainer>
                    </>
                ) : (
                    <>
                        <NameContainer>
                            <Jersey inner_color={'darkslategray'} outer_color={'lightslategray'}>
                                00
                            </Jersey>
                            <NameAndTeam>
                                <Name>Select A Player</Name>
                            </NameAndTeam>
                        </NameContainer>
                        <SelectedStatsContainer>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>PTS</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>REB</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>AST</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>STL</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>BLK</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>TOS</StatDesc>
                            </Stat>
                            <Stat>
                                <StatNumber>~</StatNumber>
                                <StatDesc>FAN</StatDesc>
                            </Stat>
                        </SelectedStatsContainer>
                    </>
                )}
            </SelectedPlayer>
            <DraftBoard ref={draftBoardRef}>
                <StyledList
                    height={dimensions.height}
                    itemCount={draftList.length}
                    itemSize={67}
                    width={dimensions.width}
                >
                    {Row}
                </StyledList>
            </DraftBoard>

            <AbsoluteContainer
                initial={{ transform: `translateY(${0}px)` }}
                animate={{
                    transform: isOpen ? `translateY(${translateY.isOpen}px)` : `translateY(${translateY.isNotOpen}px)`,
                }}
            >
                <TopBorder onClick={() => setIsOpen(!isOpen)}>
                    <IconContainer>
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                    </IconContainer>
                </TopBorder>
                <Drafted>
                    <AnimatePresence>
                        {state.round === 0 ? (
                            <StartContainer initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <StartButton onClick={onClick}>Start Draft</StartButton>

                                <StartInfo>
                                    <TeamElementForInfo>
                                        <InfoTitle>number of picks</InfoTitle>

                                        <StartName>12</StartName>
                                    </TeamElementForInfo>
                                    <TeamElementForInfo>
                                        <InfoTitle>you are Drafting at</InfoTitle>

                                        <StartName>
                                            {getOrdinal(state.teams.findIndex((t) => t.name === 'YOU') + 1)}
                                        </StartName>
                                    </TeamElementForInfo>
                                    <TeamElementForInfo>
                                        <InfoTitle>SCORING</InfoTitle>

                                        <StartName>3GM 9CAT</StartName>
                                    </TeamElementForInfo>
                                </StartInfo>
                                {/* <StartTitle>draft order</StartTitle> */}
                                {state.teams.map((t, n) => (
                                    <TeamElementForStart highlight={t.name === 'YOU'} key={t.name}>
                                        <StartNumber>{n + 1}</StartNumber>

                                        <StartName>{t.name}</StartName>
                                    </TeamElementForStart>
                                ))}
                            </StartContainer>
                        ) : (
                            pickedList.map((picked) => (
                                <DraftedElement
                                    onAnimationComplete={() => {
                                        if (picked.pickedAt === state.currentPick - 1) {
                                            if (state.draftFinished) {
                                                setTimeout(() => setFin(true), 800)
                                            } else {
                                                setTimeout(() => setIsOpen(false), 800)
                                            }
                                        }
                                    }}
                                    highlight={picked.owner === 'YOU'}
                                    key={picked.pickedAt}
                                    initial={{
                                        transform: 'translateX(-20rem)',
                                        opacity: 0,
                                        height: '0px',
                                        minHeight: '0px',
                                        marginBottom: '0px',
                                    }}
                                    animate={{
                                        transform: 'translateX(0rem)',
                                        opacity: 1,
                                        height: '65px',
                                        minHeight: '65px',
                                        marginBottom: '10px',
                                    }}
                                    transition={{
                                        delay: (picked.pickedAt - previousPickedLength) / 1.5 + 0.2,
                                        type: 'ease',
                                    }}
                                >
                                    <Number highlight={picked.owner === 'YOU'}>{picked.pickedAt}</Number>
                                    <DraftElementNameAndPick>
                                        <DraftName highlight={picked.owner === 'YOU'}>{picked.name}</DraftName>
                                        <DraftPickString highlight={picked.owner === 'YOU'}>
                                            {picked.pickedString}
                                        </DraftPickString>
                                    </DraftElementNameAndPick>
                                    <PickedByContainer>
                                        <DraftPickString highlight={picked.owner === 'YOU'}>PICKED BY</DraftPickString>
                                        <OwnerName highlight={picked.owner === 'YOU'}>{picked.owner}</OwnerName>
                                    </PickedByContainer>
                                </DraftedElement>
                            ))
                        )}
                    </AnimatePresence>
                </Drafted>
            </AbsoluteContainer>
        </Container>
    )
}

export default MockDraft

const StartContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    background-color: ${({ theme }) => theme.colors.dark4};
    padding: 0rem 1rem;
    padding-top: 1rem;
    height: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`

const StartButton = styled(Button)`
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.8rem 1.7rem;
`

type DraftedElementProps = {
    highlight: boolean
}

const PickedByContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`

const InfoTitle = styled.div`
    font-weight: 700;
    text-transform: uppercase;

    padding-left: 0.3rem;
`

const StartNumber = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    width: 1.8rem;
    margin-right: 0.5rem;
    text-align: center;
`

const StartTitle = styled.div`
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 0.8rem;
    text-align: center;
`

const StartInfo = styled.div`
    margin: 3rem 0rem;
`

const Number = styled.div<DraftedElementProps>`
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme, highlight }) => (highlight ? theme.colors.blue1 : theme.colors.orange1)};
    font-variant-numeric: tabular-nums;
    width: 4.4rem;
    text-align: center;
`

const DraftElementNameAndPick = styled.div`
    display: flex;
    flex-direction: column;
`

const OwnerName = styled.div<DraftedElementProps>`
    font-weight: 500;
    font-size: 1rem;
    color: ${({ theme, highlight }) => (highlight ? theme.colors.dark2 : theme.colors.light2)};
`

const StartName = styled.div`
    font-size: 1rem;
`

const DraftName = styled.div<DraftedElementProps>`
    margin-bottom: 0.2rem;
    font-size: 1.1rem;
    font-weight: 700;
    width: 10rem;
    color: ${({ theme, highlight }) => (highlight ? theme.colors.dark4 : theme.colors.light1)};
`

const DraftPickString = styled.div<DraftedElementProps>`
    margin-bottom: 0.2rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: ${({ theme, highlight }) => (highlight ? theme.colors.dark2 : theme.colors.light4)}; ;
`

const DraftedElement = styled(motion.div)<DraftedElementProps>`
    font-size: 1.1rem;
    background-color: ${({ theme, highlight }) => (highlight ? theme.colors.light1 : theme.colors.dark3)};
    border-radius: 4px;
    display: flex;
    align-items: center;
`

const TeamElementForInfo = styled.div`
    margin: 0 auto;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark1}`};

    padding: 0.5rem;
`

const TeamElementForStart = styled.div<DraftedElementProps>`
    width: 100%;

    font-size: 1rem;
    display: flex;
    align-items: center;
    font-weight: ${({ highlight }) => (highlight ? 700 : 400)};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark1}`};
    color: ${({ theme, highlight }) => (highlight ? theme.colors.lightblue2 : theme.colors.light1)};
    padding: 0.4rem 0rem;
`

const Drafted = styled(motion.div)`
    flex-grow: 1;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    display: flex;
    flex-direction: column;
`

const AbsoluteContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 110vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: ${({ theme }) => theme.colors.dark1};
    z-index: 2;
    padding: 0rem 0.5rem;
    padding-bottom: 10vh;
`

const DraftedContainer = styled.div`
    flex-grow: 1;
    width: 100%;
`

const IconContainer = styled.div`
    color: ${({ theme }) => theme.colors.dark4};
    font-size: 2rem;
`

const TopBorder = styled.div`
    height: 60px;
    min-height: 60px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DraftButton = styled(Button)`
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.5rem 1.5rem;
`

const SelectedPlayer = styled.div`
    width: 100%;
    margin: 1rem 0rem;
    display: flex;
    flex-direction: column;
    z-index: 1;
`

const StatsContainer = styled.div`
    display: flex;
`

const SelectedStatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 0.75rem;
`

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    width: 3.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const StatNumber = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light2};
`

const StatDesc = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light4};
`

const Name = styled.div`
    font-weight: 600;
`

const Team = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light3};
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

const NameAndJersey = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
`

const NameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NameAndTeam = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const ADP = styled.div`
    font-size: 1.3rem;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    width: 5.3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light4};
`

type RowInnerProps = {
    selected: boolean
}

const RowInner = styled.div<RowInnerProps>`
    padding: 0.7rem;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.blue3 : theme.colors.dark25)};
    border-radius: 4px;
    /* margin-bottom: 0.5rem; */

    cursor: pointer;
    transition-duration: 75ms;
    transition-timing-function: ease;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.blue3 : theme.colors.dark2)};
    }
`

const RowElement = styled.div``

const StyledList = styled(List)`
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    /* overflow: hidden; */
`

const DraftBoard = styled.div`
    width: 100%;
    flex-grow: 1;
    z-index: 1;
`

// const DraftBoardInner = styled.div`
//     width: 100%;
//     height: 100%;
// `

const TeamContainer = styled.div`
    margin-left: 3rem;
    margin-right: 5rem;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    position: relative;

    @media (max-width: 650px) {
        padding: 0rem 1rem;
    }
    /* overflow: hidden; */
`

const Div = styled.div``
