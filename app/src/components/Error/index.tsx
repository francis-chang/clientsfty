import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'utils/theme'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
    error: string | null
    setError: (error: string | null) => void
}

// this should probably be a higher order component but w/e

const Error: React.FC<Props> = ({ error, setError }) => {
    const [visible, setVisible] = useState(false)
    const [to, setTo] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (error) {
            setVisible(true)
            const to = setTimeout(() => {
                setError(null)
                setVisible(false)
            }, 5000)
            setTo(to)
        }
    }, [error])

    useEffect(() => {
        return () => {
            if (to) {
                clearTimeout(to)
            }
        }
    }, [])

    const onAnimationComplete = () => {}

    return (
        <AnimatePresence>
            {error && visible && (
                <Container
                    initial={{ opacity: 0, top: -50 }}
                    onAnimationComplete={onAnimationComplete}
                    animate={{ opacity: 1, top: 0 }}
                    exit={{ opacity: 0, top: -50 }}
                >
                    {error}
                </Container>
            )}
        </AnimatePresence>
    )
}

export default Error

const Container = styled(motion.div)`
    position: fixed;
    left: 0;
    width: 100%;
    padding: 1.5rem 0rem;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.red1};
    color: ${({ theme }) => theme.colors.light1};
    font-weight: 800;
`
