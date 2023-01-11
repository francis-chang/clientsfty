import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'

type Props = {
    error: string | null
    setError: (error: string) => void
}

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
    return error && visible ? <Container>{error}</Container> : null
}

export default Error

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.red1};
    color: ${({ theme }) => theme.colors.light1};
`
