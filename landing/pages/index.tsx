import Head from 'next/head'
import { Button, styled } from '../styles/theme'
import Schedule from './components/Schedule'
import NumGames from './components/NumGames'
import { Inter } from '@next/font/google'
import No from './components/No'
import Draft from './components/Draft'
import Try from './components/Try'
import Signup from './components/Signup'
import Footer from './components/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>FTY Fantasy Sports</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container style={inter.style}>
                <Header>
                    <Logo>fty.gg</Logo>
                    <ButtonContainer>
                        <AuthButton style={inter.style}>Log In</AuthButton>
                        <AuthButton style={inter.style}>Sign Up</AuthButton>
                    </ButtonContainer>
                </Header>
                <Title>
                    <TitleTop>A better way to play</TitleTop>
                    <TitleBottom>fantasy sports</TitleBottom>
                    <SubSubTitle>
                        <SubtitleDivider>
                            <Span>No Waiver Wires.</Span> <Span>No Trades.</Span> <Span>No Bench.</Span>{' '}
                        </SubtitleDivider>
                        <SpanGreen>Only Drafts.</SpanGreen>
                    </SubSubTitle>
                </Title>
                <Schedule />
                <NumGames />
                <No />
                <Draft />
                <Try />
                <Signup />
            </Container>
            <Footer />
        </>
    )
}

const SpanGreen = styled.span`
    color: white;
    font-weight: 700;
    /* color: ${({ theme }) => theme.colors.orange2}; */
    /* text-decoration: underline; */
`
const Span = styled.span`
    margin-right: 0.3rem;
    color: ${({ theme }) => theme.colors.light3};
    font-weight: 500;
`

const SubSubTitle = styled.div`
    font-size: 1.1rem;
    display: flex;
    text-transform: uppercase;
    @media (max-width: 675px) {
        font-size: 1rem;
        text-align: center;
        flex-direction: column;
    }
`

const SubtitleDivider = styled.div`
    display: flex;
    @media (max-width: 675px) {
        margin-bottom: 0.5rem;
    }
`

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 850px;
    //left right padding media query when smaller screen
    @media (max-width: 910px) {
        padding: 0rem 1rem;
    }
`

const ButtonContainer = styled.div`
    display: flex;

    & > button:first-child {
        margin-right: 1rem;
    }
`

const AuthButton = styled(Button)`
    font-weight: 800;
`

const Logo = styled.div`
    font-weight: 700;
    font-size: 1.5rem;
`

const Header = styled.div`
    display: flex;
    padding-top: 1rem;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
`

const Subtitle = styled.div`
    font-size: 0.29em;
    font-weight: 500;
    padding-top: 1.5rem;
`

const Title = styled.div`
    padding: 5rem 0rem;
    width: 100%;
    font-size: 4.4rem;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 800px) {
        font-size: 3.5rem;
    }

    @media (max-width: 620px) {
        font-size: 3rem;
    }
    @media (max-width: 520px) {
        font-size: 2.5rem;
    }
    @media (max-width: 450px) {
        font-size: 2.3rem;
    }
`

const TitleTop = styled.div``

const TitleBottom = styled.div`
    color: ${({ theme }) => theme.colors.orange1};
    margin-bottom: 1.5rem;
`
