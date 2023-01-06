import React from 'react'
import { styled } from '../../styles/theme'

const No: React.FC = () => {
    return (
        <Container>
            <Title>
                No <Span>Trades</Span>. No <Span>Bench</Span>.
            </Title>
            <Subtitle>
                <Div>But, drafting is so much more fun.</Div>
                <Div>Do you still really want to?</Div>
                <Div>Alright, we'll provide standard fantasy leagues as well.</Div>
            </Subtitle>
        </Container>
    )
}

export default No

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5rem;
`

const Title = styled.div`
    font-size: 2.6rem;
    font-weight: 900;
    margin-bottom: 1rem;
`

const Span = styled.span`
    color: ${({ theme }) => theme.colors.red1};
`

const Subtitle = styled.div`
    font-size: 1.18rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light3};
    line-height: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Div = styled.div`
    margin-bottom: 0.7rem;
`
