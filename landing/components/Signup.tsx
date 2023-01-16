import React, { useEffect, useRef, useState } from 'react'
import { styled, Button } from '../styles/theme'

const Signup: React.FC = () => {
    return (
        <>
            <Container>
                <Title>
                    Or start drafting<Span> for real</Span>.
                </Title>
                <ButtonExtended>register</ButtonExtended>
            </Container>
        </>
    )
}

export default Signup

const ButtonExtended = styled(Button)`
    background-color: ${({ theme }) => theme.colors.lightblue2};
    color: ${({ theme }) => theme.colors.dark4};
    font-weight: 900;
    font-size: 1.3rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.lightblue3};
    }
    margin-bottom: 1rem;
    @media (max-width: 750px) {
        font-size: 1.1rem;
    }
`

const Container = styled.div`
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    align-items: center;
    margin-bottom: 6rem;
`

const Span = styled.span`
    color: ${({ theme }) => theme.colors.lightblue2};
`

const Title = styled.div`
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0.6rem;
    @media (max-width: 750px) {
        font-size: 2.2rem;
    }
    @media (max-width: 675px) {
        text-align: center;
    }
`

const Subtitle = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 500;
    text-align: center;
`
