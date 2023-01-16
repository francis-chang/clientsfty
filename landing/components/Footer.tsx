import React from 'react'
import { styled } from '../styles/theme'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Footer: React.FC = () => {
    return (
        <Container style={inter.style}>
            <EmailContainer>
                <EmailTitle>Contact Us</EmailTitle>
                <Email href="mailto:support@fty.gg">support@fty.gg</Email>
            </EmailContainer>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.dark25};
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const EmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`

const Email = styled.a`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.light1};
    text-decoration: none;
    &:active,
    &:visited {
        color: ${({ theme }) => theme.colors.light1};
    }
    &:hover {
        text-decoration: underline;
    }
`
const EmailTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
`
