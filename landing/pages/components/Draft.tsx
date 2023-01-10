import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/theme'
import DraftText from './DraftTest'

import playerData from './playerData'

const Bots = ['JasonAI', 'You', 'MariAI', 'CarsonAI', 'BlakeAI', 'AmyAI', 'HunterAI']

const Draft: React.FC = () => {
    const [top, setTop] = useState(0)

    const [secondsForTurn, setSecondsForTurn] = useState(-1)

    const [aiSecondsForTurn, setAiSeconds] = useState(3)

    const [pickedPlayer, setPickedPlayer] = useState<any>()

    useEffect(() => {
        setPickedPlayer(playerData[(top % 42) - 1])
    }, [top])

    useEffect(() => {
        if (secondsForTurn >= 0) {
            setTimeout(() => {
                setSecondsForTurn(secondsForTurn - 1)
            }, 1000)
        } else if (top > 0) {
            setTop((prevState) => prevState + 1)
        }
    }, [secondsForTurn])

    useEffect(() => {
        if (aiSecondsForTurn >= 0) {
            setTimeout(() => {
                setAiSeconds(aiSecondsForTurn - 1)
            }, 1000)
        } else {
            setTop((prevState) => prevState + 1)
        }
    }, [aiSecondsForTurn])

    const onAnimationComplete = () => {
        if (top % 7 === 1) {
            setSecondsForTurn(5)
        } else {
            setAiSeconds(3)
        }
    }

    return (
        <Container>
            <DraftContainer>
                <Header>
                    <ChosenContainer>
                        {pickedPlayer ? (
                            <>
                                <PickedNumberContainer>
                                    <PickedSubtitle>PICK</PickedSubtitle>
                                    <PickedNumber>{top % 42}</PickedNumber>
                                </PickedNumberContainer>
                                <ChosenHeader>
                                    <ChosenSubTitle>
                                        {Bots[(top - 1) % Bots.length] === 'You'
                                            ? ` ${Bots[(top - 1) % Bots.length]} picked`
                                            : ` ${Bots[(top - 1) % Bots.length]} has picked`}{' '}
                                    </ChosenSubTitle>

                                    <SmallerName>{pickedPlayer.Name}</SmallerName>
                                </ChosenHeader>
                            </>
                        ) : (
                            <>
                                <Starting>Draft Starting!</Starting>
                            </>
                        )}
                    </ChosenContainer>
                </Header>
                <PickingContainer>
                    <ChoosingContainer>
                        {Bots[top % Bots.length] === 'You' ? 'YOUR TURN ' : `${Bots[top % Bots.length]} IS THINKING`}
                    </ChoosingContainer>
                    <TimerBar>
                        {secondsForTurn > -1 && (
                            <ActualTimer color="orange" animate={{ width: `${20 * secondsForTurn}%` }} />
                        )}
                        {aiSecondsForTurn > -1 && (
                            <ActualTimer color="blue" animate={{ width: `${33 * aiSecondsForTurn}%` }} />
                        )}
                    </TimerBar>
                </PickingContainer>
                <InfinitieContainer>
                    <InnerContainer>
                        <RowContainer
                            animate={{ y: `-${(top % 42) * 4.2}rem` }}
                            onAnimationComplete={onAnimationComplete}
                        >
                            {playerData.map((player: any) => (
                                <NameAndJersey>
                                    <NameContainer>
                                        <Jersey inner_color={player.inner_color} outer_color={player.outer_color}>
                                            {player.Number}
                                        </Jersey>
                                        <NameAndTeam>
                                            <Name>{player.Name}</Name>
                                            <Team>{player.team_name}</Team>
                                        </NameAndTeam>
                                    </NameContainer>
                                    <ADP>{player.FantasyPoints}</ADP>
                                </NameAndJersey>
                            ))}
                        </RowContainer>
                    </InnerContainer>
                </InfinitieContainer>
            </DraftContainer>
            <DraftText />
        </Container>
    )
}

export default Draft

const PickingContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.light3};
    color: ${({ theme }) => theme.colors.dark4};
    margin-bottom: 0.6em;

    flex-direction: column;
    width: 100%;
    align-items: center;
`

const TimerBar = styled.div`
    height: 12px;
    background-color: ${({ theme }) => theme.colors.dark4};
    border-radius: 10px;
    width: 100%;
    padding: 0px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
`

type TimerProps = {
    color: string
}

const ActualTimer = styled(motion.div)<TimerProps>`
    height: 4px;
    background-color: ${({ theme, color }) => (color === 'blue' ? theme.colors.light3 : theme.colors.testgreen1)};
    border-radius: 10px;
`

const ChoosingContainer = styled.div`
    flex-grow: 1;
    display: flex;
    font-size: 1rem;
    align-items: center;
    font-weight: 900;
    margin-bottom: 0.2rem;
`

const Starting = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;
`

const PickedSubtitle = styled.div`
    color: ${({ theme }) => theme.colors.light4};
    font-size: 0.8rem;
    font-weight: 900;
`

const PickedNumberContainer = styled.div`
    width: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PickedNumber = styled.div`
    font-size: 1.8rem;
    line-height: 1.8rem;
    font-weight: 700;
    display: flex;
`

const SmallerName = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
`

const Name = styled.div`
    font-weight: 700;
`

const ChosenContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark25};
    margin-bottom: 0.6em;
    justify-content: center;
    align-items: center;
    min-height: 60px;

    width: 100%;
`

const ChosenHeader = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
`

const ChosenSubTitle = styled.div`
    font-weight: 400;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light3};
`

const DraftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1.5rem;
    user-select: none;
    @media (max-width: 675px) {
        margin-bottom: 6rem;
        margin-right: 0rem;
    }
`

const Timer = styled.div`
    width: 3rem;
    font-size: 1.6rem;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: 900;
`
const Header = styled.div`
    display: flex;
    width: 100%;
`

const Team = styled.div`
    font-weight: 500;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light4};
`

const NameAndJersey = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.dark4};
    border-radius: 4px;
    margin-bottom: 0.6rem;
    padding: 0rem 0.6rem;
    min-height: 3.6rem;
`

const NameContainer = styled.div`
    display: flex;
    align-items: center;
`

const NameAndTeam = styled.div`
    display: flex;
    flex-direction: column;
`

const ADP = styled.div`
    font-size: 1.3rem;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    width: 5.3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light4};
`

const Container = styled.div`
    display: flex;
    @media (max-width: 675px) {
        flex-direction: column-reverse;
        align-items: center;
    }
`

const InnerContainer = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
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
    font-size: 1.2rem;
    font-weight: 700;
    margin-right: 0.6rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Row = styled.div`
    background-color: ${({ theme }) => theme.colors.dark4};
    border-radius: 4px;
    margin-bottom: 1rem;

    min-height: 4rem;
    box-sizing: border-box;
`

const InfinitieContainer = styled.div`
    height: 34rem;
    background-color: ${({ theme }) => theme.colors.dark2};
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem;
    width: 22rem;
`

const RowContainer = styled(motion.div)`
    height: 100%;
    display: flex;
    flex-direction: column;
`
