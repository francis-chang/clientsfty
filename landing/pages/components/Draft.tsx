import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/theme'

import playerData from './playerData'

const Draft: React.FC = () => {
    const [top, setTop] = useState(0)
    const [myTurn, setMyTurn] = useState(false)
    const [to, setTo] = useState<NodeJS.Timeout | null>(null)
    const [secondsForTurn, setSecondsForTurn] = useState(-1)

    const [pickedPlayer, setPickedPlayer] = useState<any>()

    useEffect(() => {
        return () => {
            if (to) {
                clearTimeout(to)
            }
        }
    }, [])

    useEffect(() => {
        setPickedPlayer(playerData[(top % 43) - 1])
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

    const onAnimationComplete = () => {
        if (top % 6 === 1) {
            setSecondsForTurn(5)
        } else {
            const timeout = setTimeout(() => {
                setTop((prevState) => prevState + 1)
            }, 3000)
            setTo(timeout)
        }
    }

    return (
        <Container>
            <div>{secondsForTurn}</div>
            <Picked>{pickedPlayer && pickedPlayer.Name}</Picked>
            <InfinitieContainer>
                <InnerContainer>
                    <RowContainer animate={{ y: `-${(top % 43) * 5}rem` }} onAnimationComplete={onAnimationComplete}>
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
                                <ADP>{player.AverageDraftPosition}</ADP>
                            </NameAndJersey>
                        ))}
                    </RowContainer>
                </InnerContainer>
            </InfinitieContainer>
        </Container>
    )
}

export default Draft

const Picked = styled.div``

const Name = styled.div`
    font-weight: 700;
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
    margin-bottom: 1rem;
    padding: 0rem 1rem;
    min-height: 4rem;
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
    font-weight: 700;
    width: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light4};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
    height: 31rem;
    background-color: ${({ theme }) => theme.colors.dark2};
    margin: 0 auto;
    overflow: hidden;
    padding: 1rem;
    width: 20rem;
`

const RowContainer = styled(motion.div)`
    height: 100%;
    display: flex;
    flex-direction: column;
`
