import React, { useEffect, useRef, useState } from 'react'
import { styled } from '../styles/theme'
import { motion } from 'framer-motion'
import { weekOneData, weekFourData, weekEightData, weekTwelveData, NFLPlayerDataWeek } from './nflData'

const Schedule: React.FC = () => {
    const [stub, setStub] = useState(0)
    const svgRef = useRef<SVGCircleElement>(null)
    const [left, setLeft] = useState<number>(0)
    const [opacity, setOpacity] = useState(0)
    const [data, setData] = useState<NFLPlayerDataWeek>(weekOneData)
    const [initialAnimationComplete, setInitalAnimationComplete] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setStub((stub) => stub + 1)
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const onAnimationComplete = () => {
        setInitalAnimationComplete(true)
        setOpacity(1)
        if (svgRef.current?.cx.animVal.value) {
            setLeft(svgRef.current.cx.animVal.value - 105)
        }
        if (stub % 4 == 0) {
            setData(weekOneData)
        } else if (stub % 4 == 1) {
            setData(weekFourData)
        } else if (stub % 4 == 2) {
            setData(weekEightData)
        } else {
            setData(weekTwelveData)
        }
    }
    const onAnimationStart = () => {
        setOpacity(0)
    }

    return (
        <FullContainer>
            <Container>
                {initialAnimationComplete && (
                    <RosterContainer
                        top={svgRef.current?.cy.animVal.value}
                        x={left}
                        animate={{
                            width: opacity ? '210px' : '0px',
                            height: opacity ? '232px' : '0px',
                            opacity: opacity,
                        }}
                    >
                        <RosterContainerPositionRel>
                            <RosterTitle>{data.title}</RosterTitle>
                            {data.players.map(({ name, inner_color, outer_color, key, number, team }, n) => (
                                <RosterElement
                                    top={n * 46 + 38}
                                    key={key}
                                    initial={{ x: '-100%', opacity: 0 }}
                                    animate={{
                                        x: '0%',
                                        opacity: 1,
                                    }}
                                    transition={{ delay: n * 0.16 }}
                                >
                                    <Jersey inner_color={inner_color} outer_color={outer_color}>
                                        {number}
                                    </Jersey>
                                    <Name>
                                        <NameName>{name}</NameName>
                                        <NameTeam>{team}</NameTeam>
                                    </Name>
                                </RosterElement>
                            ))}
                        </RosterContainerPositionRel>
                    </RosterContainer>
                )}
                <SvgContainer initial="hidden" animate="visible">
                    <LongBar variants={draw} x1="5%" x2="95%" y1="50%" y2="50%" />
                    <Circle
                        ref={svgRef}
                        animate={{
                            cx: `${(stub % 4) * 20 + 20}%`,
                            cy: '50%',
                        }}
                        onAnimationStart={onAnimationStart}
                        onAnimationComplete={onAnimationComplete}
                        r="0.8rem"
                    />
                </SvgContainer>
            </Container>
        </FullContainer>
    )
}

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = 1 + i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

const FullContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default Schedule

const RosterTitle = styled.div`
    font-weight: 900;
    text-align: center;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    width: 194px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.dark3};
    margin-bottom: 4px;
    position: absolute;
    top: 0;
    left: 0;
`

const Name = styled.div`
    font-weight: 600;
    display: flex;
    flex-direction: column;
`

const NameName = styled.div``

const NameTeam = styled.div`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light4};
`

const Circle = styled(motion.circle)`
    stroke: ${({ theme }) => theme.colors.orange1};
    fill: ${({ theme }) => theme.colors.orange1};
`

const Container = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 20rem;
`

type RosterContainerProps = {
    x: number
    top: number | undefined
}

const RosterContainer = styled(motion.div)<RosterContainerProps>`
    position: absolute;
    top: ${({ top }) => (top ? `${top + 24}px` : '0px')};

    left: ${({ x }) => `${x}px`};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark25};
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.5rem;
    width: 210px;
    overflow: hidden;
`

const RosterContainerPositionRel = styled.div`
    position: relative;
`

type RosterElementProps = {
    top: number
}

const RosterElement = styled(motion.div)<RosterElementProps>`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: 0;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: 45px;

    min-width: 210px;
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
    margin-right: 0.5rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.text`
    stroke: ${({ theme }) => theme.colors.orange1};
    fill: ${({ theme }) => theme.colors.orange1};
    stroke-width: 0.01rem;
`

const LongBar = styled(motion.line)`
    stroke-linecap: round;
    stroke: ${({ theme }) => theme.colors.dark1};
    stroke-width: 0.5rem;
`

const Stubs = styled(motion.line)`
    stroke-linecap: round;
    stroke: ${({ theme }) => theme.colors.blue1};
    stroke-width: 0.5rem;
`

const SvgContainer = styled(motion.svg)`
    width: 100%;
    height: 5rem;
`
