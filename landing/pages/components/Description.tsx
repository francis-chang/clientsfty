import React from 'react'
import { Button, styled } from '../../styles/theme'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies dolor ut tortor vehicula ultrices. Proin maximus turpis a suscipit scelerisque. Donec condimentum nunc sed est luctus volutpat eget at nisi. Cras hendrerit finibus sapien, sed laoreet lectus scelerisque quis. Maecenas vulputate

const Description: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <Title>
                    <Span>No Waiver Wires.</Span> <Span>No Trades.</Span> <Span>No Bench.</Span>{' '}
                    <SpanGreen>Only Drafts.</SpanGreen>
                </Title>
            </TitleContainer>
        </Container>
    )
}

export default Description

const B = styled(Button)`
    align-self: flex-start;
    font-weight: 800;

    /* padding: 1.2rem 2rem; */
    font-size: 1rem;
`

const D = styled.div`
    color: ${({ theme }) => theme.colors.light3};
    margin-bottom: 1rem;
`

const TitleContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const SpanGreen = styled.span`
    color: ${({ theme }) => theme.colors.orange1};
    /* text-decoration: underline; */
`
const Span = styled.span`
    margin-right: 0.6rem;
`

const Title = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1rem;
`
