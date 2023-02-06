import React from 'react'
import { FontRubik, styled } from 'utils/theme'
import format from 'date-fns/format'

type Props = {
    stats: StatlineForHome[]
}

type objectKeys = keyof StatlineForHome
const statsHelper = [
    { name: 'Points', value: 'PTS' },
    { name: 'Rebounds', value: 'REB' },
    { name: 'Assists', value: 'AST' },
    { name: 'Steals', value: 'STL' },
    { name: 'BlockedShots', value: 'BLK' },
    { name: 'Turnovers', value: 'TOS' },
    { name: 'ThreePointersMade', value: '3PM' },
] as { name: objectKeys; value: string }[]

const parseIntoPCT = (pctString: string) => {
    const index = pctString.indexOf('.')
    if (index < 0) {
        return pctString
    } else {
        const float = parseFloat(pctString)
        if (float) {
            return Math.round(float)
        }
        return pctString
    }
}

const Statlines: React.FC<Props> = ({ stats }) => {
    statsHelper.map((statHelp) => console.log(stats[0][statHelp.name]))
    return (
        <Container>
            <HeaderBar>
                <HeaderElement>Recent</HeaderElement>
            </HeaderBar>
            {stats.map((stat) => (
                <Statline key={stat.StatID}>
                    <Header>
                        <JerseyAndName>
                            <Jersey inner_color={stat.team.inner_color} outer_color={stat.team.outer_color}>
                                {stat.player.Jersey}
                            </Jersey>
                            <NameContainer>
                                <Name>{stat.player.s_name}</Name>
                                <Team>{`${stat.team.City} ${stat.team.Name}`}</Team>
                            </NameContainer>
                        </JerseyAndName>
                        <Vs>
                            <VerseText>
                                <Span>vs</Span>
                                {` ${stat.opponent_team.Key} `}
                                <Span>on</Span>
                                {`  ${format(new Date(stat.game.nba_day), 'MMM d')}`}{' '}
                            </VerseText>
                        </Vs>
                    </Header>
                    <StatsContainer>
                        <StatRow>
                            {statsHelper.map((statHelp) => (
                                <StatContainer>
                                    <Stat>
                                        {/**@ts-ignore */}
                                        {stat[statHelp.name]}
                                    </Stat>
                                    <StatDesc>{statHelp.value}</StatDesc>
                                </StatContainer>
                            ))}
                        </StatRow>

                        <LastStatRow>
                            <StatContainer>
                                <LongStat>{`${parseIntoPCT(stat.FieldGoalsPercentage)}/${parseIntoPCT(
                                    stat.ThreePointersPercentage
                                )}/${parseIntoPCT(stat.FreeThrowsPercentage)}`}</LongStat>
                                <StatDesc>%</StatDesc>
                            </StatContainer>
                            <StatContainer>
                                <LongStat>{`${stat.FieldGoalsMade}/${stat.FieldGoalsAttempted}`}</LongStat>
                                <StatDesc>FGM/A</StatDesc>
                            </StatContainer>
                            <StatContainer>
                                <LongStat>{`${stat.ThreePointersMade}/${stat.ThreePointersAttempted}`}</LongStat>
                                <StatDesc>3PM/A</StatDesc>
                            </StatContainer>
                            <StatContainer>
                                <LongStat>{`${stat.FreeThrowsMade}/${stat.FreeThrowsAttempted}`}</LongStat>
                                <StatDesc>FTM/A</StatDesc>
                            </StatContainer>
                            <StatContainer>
                                <LongStat>{`${stat.FantasyPoints}`}</LongStat>
                                <StatDesc>FAN</StatDesc>
                            </StatContainer>
                        </LastStatRow>
                    </StatsContainer>
                </Statline>
            ))}
        </Container>
    )
}

export default Statlines

const HeaderBar = styled.div`
    display: flex;
`

const HeaderElement = styled.div`
    padding: 0.4rem 0.7rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-transform: uppercase;
`

const LastStatRow = styled.div`
    display: flex;
    width: 305px;
    justify-content: space-between;
`

const LongStat = styled(FontRubik)`
    font-size: 0.85rem;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    color: ${({ theme }) => theme.colors.light25};
`

const Header = styled.div`
    display: flex;

    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex-grow: 1;
`

const Span = styled.span`
    font-weight: 400;
    font-size: 0.7rem;
`

const Vs = styled.div`
    font-size: 0.8rem;
    display: flex;
    margin-top: 0.5rem;

    font-weight: 600;
    letter-spacing: 0.04rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.light3};
`
const VerseText = styled.div``

const StatContainer = styled.div`
    display: flex;
    padding: 0rem 0.5rem 0.4rem 0.5rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`
const Stat = styled(FontRubik)`
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1rem; ;
`

const StatDesc = styled.div`
    font-size: 0.7rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light4};
    letter-spacing: 0.05rem;
`

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const StatRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
`

const Statline = styled.div`
    margin-bottom: 0.4rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark25}`};
    padding: 0.3rem 0.5rem;
    display: flex;
`

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Name = styled.div`
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.05rem;
`
const Team = styled.div`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light4};
`

const JerseyAndName = styled.div`
    display: flex;
    align-items: center;
`

type JerseyProps = {
    inner_color: string
    outer_color: string
}

const Jersey = styled.div<JerseyProps>`
    width: 2.1rem;
    padding: 0.4rem 0rem;
    font-weight: 700;
    border-radius: 4px;
    text-align: center;
    color: ${({ inner_color }) => inner_color};
    background-color: ${({ outer_color }) => outer_color};
    margin-right: 0.5rem;
`
