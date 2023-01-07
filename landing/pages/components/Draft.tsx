import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/theme'

const Draft: React.FC = () => {
    const [seconds, setSeconds] = useState(0)
    const [pathLength, setPathLength] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevState) => prevState + 1)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const l = 1 - (seconds % 6) * 0.2
        if (l === 0) {
            setPathLength(0.01)
        } else {
            setPathLength(l)
        }
    }, [seconds])

    return (
        <Container>
            <InnerContainer initial="hidden" animate="visible">
                <Timer
                    animate={{ pathLength: pathLength }}
                    transition={{
                        default: { type: 'spring', duration: 0.5 },
                    }}
                    cx="10%"
                    cy="10%"
                    r="5%"
                />
            </InnerContainer>
        </Container>
    )
}

export default Draft

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.light4};
    padding: 0.8rem;
    height: 70vw;
    max-height: 550px;
    width: 90%;
    margin: 0 auto;
    border-radius: 4px;
`

const InnerContainer = styled(motion.svg)`
    background-color: ${({ theme }) => theme.colors.dark25};
    width: 100%;
    height: 100%;
    border-radius: 4px;
`

const Timer = styled(motion.circle)`
    fill: none;
    stroke: red;
    stroke-width: 1%;
`
