import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/theme'
import { motion } from 'framer-motion'

const Schedule: React.FC = () => {
    const [stub, setStub] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setStub((stub) => stub + 1)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Container>
            <SvgContainer initial="hidden" animate="visible">
                <LongBar variants={draw} x1="5%" x2="95%" y1="50%" y2="50%" />
                <Stubs variants={draw} x1="20%" x2="20%" y1="45%" y2="55%" />
                <Stubs variants={draw} x1="40%" x2="40%" y1="45%" y2="55%" />
                <Stubs variants={draw} x1="60%" x2="60%" y1="45%" y2="55%" />
                <Stubs variants={draw} x1="80%" x2="80%" y1="45%" y2="55%" />
                <Text x="0%" y="40%">
                    SEASON START
                </Text>
                <Text x="85%" y="40%">
                    SEASON END
                </Text>
                <Circle
                    animate={{
                        cx: `${(stub % 4) * 20 + 20}%`,
                        cy: '50%',
                    }}
                    r="0.3rem"
                />
            </SvgContainer>
        </Container>
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

export default Schedule

const Circle = styled(motion.circle)`
    stroke: red;
`

const Container = styled.div`
    margin: 3rem 0rem;
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
