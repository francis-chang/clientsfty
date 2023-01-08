import React from 'react'
import { styled } from '../../styles/theme'

// don't want to spend every day setting lineup
//

const No: React.FC = () => {
    return (
        <Container>
            <Title>
                No <Span>trades</Span>. No <Span>bench</Span>.
            </Title>
            <Subtitle>
                <Div>
                    Fantasy veterans have found that manging rosters through standard fantasy leagues require a lot of
                    effort and energy with minimal enjoyment in return.
                </Div>
                <Div>Some teams forget to set their lineups; Other teams stop playing altogether.</Div>
                <Div>So instead, all drafted players will play.</Div>
                <Div>
                    We want our teams to focus only on one thing. <BoldSpan>Drafts.</BoldSpan>{' '}
                </Div>
            </Subtitle>
        </Container>
    )
}

export default No

const BoldSpan = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light1};
`

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
    align-items: flex-start;
    width: 70%;
    min-width: 400px;
`
const Div = styled.div`
    margin-bottom: 0.7rem;
`
