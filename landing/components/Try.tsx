import React from 'react'
import { styled, Button } from '../styles/theme'

const Try: React.FC = () => {
    return (
        <>
            <Container>
                <a href="https://app.fty.gg/mockdraft" target="_blank" rel="noreferrer">
                    <Title>
                        Try an <Span>NBA mock draft</Span>.
                    </Title>
                </a>
                <ButtonExtended>Start</ButtonExtended>
                <Subtitle>NFL fantasy expected for 2023 season</Subtitle>
            </Container>
        </>
    )
}

export default Try

const ButtonExtended = styled(Button)`
    background-color: ${({ theme }) => theme.colors.orange1};
    color: ${({ theme }) => theme.colors.dark4};
    font-weight: 900;
    font-size: 1.3rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.orange2};
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
    color: ${({ theme }) => theme.colors.orange1};
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
