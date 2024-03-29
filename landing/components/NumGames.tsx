import React from 'react'
import { styled } from '../styles/theme'
import nbaData from './nbaData'

const NumGames: React.FC = () => {
    return (
        <Container>
            <Text>
                <UpperText>
                    Configure each <SpanBlueOne>draft interval</SpanBlueOne> to how many <SpanBlue>week(s)</SpanBlue> or{' '}
                    <SpanBlue>games</SpanBlue> to your liking.
                </UpperText>
                <BottomText>
                    Scavenging for players on the waiver wire because they play an extra game for the week is old news.
                </BottomText>
                <BottomText>
                    Configure a draft interval duration, and we&apos;ll programatically figure out which games are
                    scored and dates you need to draft.
                </BottomText>
                <BottomText>This way you and your opponent(s) get an evenly distributed number of games.</BottomText>
            </Text>
            <SideContainer>
                {nbaData.map((player) => (
                    <PlayerElement key={player.name}>
                        <NameAndJersey>
                            <Jersey inner_color={player.inner_color} outer_color={player.outer_color}>
                                {player.number}
                            </Jersey>
                            <NameAndTeam>
                                <Name>{player.name}</Name>
                                <Team>{player.team}</Team>
                            </NameAndTeam>
                        </NameAndJersey>
                        <Icons>
                            {player.teamsAgainst.map((team) => (
                                <IconAndDate key={team.img}>
                                    <TeamIcon src={`./images/${team.img}.png`} />

                                    <Date>{team.date}</Date>
                                </IconAndDate>
                            ))}
                        </Icons>
                    </PlayerElement>
                ))}
            </SideContainer>
        </Container>
    )
}

export default NumGames

const SpanBlueOne = styled.span`
    color: ${({ theme }) => theme.colors.lightblue0};
`

const SpanBlue = styled.span`
    color: ${({ theme }) => theme.colors.lightblue2};
`

const TeamIcon = styled.img`
    width: 2rem;
    margin-bottom: 0.3rem;
`

const Date = styled.div`
    font-weight: 600;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light2};
`

const Icons = styled.div`
    display: flex;
    /* justify-content: ; */
`

const IconAndDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 4.1rem;
    align-items: center;
`

const Name = styled.div`
    font-weight: 700;
`
const Team = styled.div`
    font-weight: 500;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light4};
`

const NameAndJersey = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const NameAndTeam = styled.div`
    display: flex;
    flex-direction: column;
`

const PlayerElement = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark25};
`

type JerseyProps = {
    inner_color: string
    outer_color: string
}

const Jersey = styled.div<JerseyProps>`
    background-color: ${({ outer_color }) => outer_color};
    color: ${({ inner_color }) => inner_color};
    padding: 0.3rem;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-right: 0.6rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1.5rem;
    @media (max-width: 675px) {
        margin-right: 0rem;
    }
`

const BottomText = styled.div`
    font-size: 1.18rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light3};
    line-height: 1.6rem;
    margin-bottom: 1rem;
    @media (max-width: 750px) {
        font-size: 1.1rem;
    }
    @media (max-width: 675px) {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 1.5rem;
    }
`

const UpperText = styled.div`
    font-size: 2.6rem;
    font-weight: 900;
    margin-bottom: 1rem;

    @media (max-width: 750px) {
        font-size: 2.3rem;
    }
    @media (max-width: 675px) {
        text-align: center;
    }
`

const Container = styled.div`
    display: flex;
    margin-bottom: 5rem;
    align-items: flex-start;
    @media (max-width: 675px) {
        flex-direction: column;
        align-items: center;
    }
`

const SideContainer = styled.div`
    /* padding: 1rem; */
    /* border-radius: 4px; */
    /* background-color: ${({ theme }) => theme.colors.dark25}; */
`
