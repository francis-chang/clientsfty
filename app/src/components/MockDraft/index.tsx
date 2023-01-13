import React, { useEffect, useRef, useState } from 'react'
import { Button, styled } from 'utils/theme'
import useMockDraft from './useMockDraft'
import { FixedSizeList as List } from 'react-window'
import { useQuery } from 'react-query'
import { draft } from 'utils/api/redis_stats'
import { motion } from 'framer-motion'

const MockDraft: React.FC = () => {
    const [state, onClick, draftListQuery, setPicked, draftList] = useMockDraft()

    const draftBoardRef = useRef<HTMLDivElement>(null)

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [translateY, setTranslateY] = useState({ isOpen: 0, isNotOpen: 0 })

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: draftBoardRef.current!.clientWidth,
                height: draftBoardRef.current!.clientHeight,
            })
            setTranslateY({
                isOpen: window.innerHeight - draftBoardRef.current!.clientHeight + 100,
                isNotOpen: window.innerHeight - 40,
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
                isOpen: window.innerHeight - draftBoardRef.current.clientHeight + 100,
                isNotOpen: window.innerHeight - 40,
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

    return (
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
                animate={{
                    transform: isOpen ? `translateY(${translateY.isOpen}px)` : `translateY(${translateY.isNotOpen}px)`,
                }}
                height={dimensions.height}
            >
                <TopBorder onClick={() => setIsOpen(!isOpen)}></TopBorder>
                <DraftedContainer />
            </AbsoluteContainer>

            {/* <TeamContainer>
                {state.teams.map((t) => (
                    <div key={t.name}>
                        <div>{t.name}</div>
                        <ul>
                            {t.team.map((player: any) => (
                                <li style={{ paddingLeft: '3rem' }} key={player.PlayerID}>
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </TeamContainer>
            <button onClick={onClick}>draft</button> */}
        </Container>
    )
}

export default MockDraft
type AbsoluteContainerProps = {
    height: number
}

const AbsoluteContainer = styled(motion.div)<AbsoluteContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ height }) => `${height}px`};
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: ${({ theme }) => theme.colors.blue4};
    z-index: 2;
`

const DraftedContainer = styled.div`
    flex-grow: 1;
    width: 100%;
`

const TopBorder = styled.div`
    height: 40px;
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
