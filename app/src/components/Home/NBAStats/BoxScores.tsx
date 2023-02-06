import React, { useState } from 'react'
import { FontRubik, styled, theme } from 'utils/theme'
import format from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons'

type Props = {
    gamestats: GameStatsJustScores[]
}

const IANA = Intl.DateTimeFormat().resolvedOptions().timeZone

const BoxScores: React.FC<Props> = ({ gamestats }) => {
    const today = format(new Date(), 'MMM-dd')

    const [selectedDay, setSelected] = useState<GameStatsJustScores | undefined>(
        gamestats.find((g) => today === format(new Date(g.date), 'MMM-dd'))
    )

    const getTzHour = (d: string) => {
        return formatInTimeZone(new Date(d), IANA, 'h:mm a')
    }

    const renderTime = (quarter: string | null, minutes: string | null, seconds: string | null) => {
        let realSeconds = seconds && parseInt(seconds) < 10 ? `0${seconds}` : seconds

        if (quarter === '1') {
            return `1ST ${minutes ? minutes : 'END'}:${realSeconds ? realSeconds : ''}`
        } else if (quarter === '2') {
            return `2ND ${minutes ? minutes : 'END'}:${realSeconds ? realSeconds : ''}`
        } else if (quarter === '3') {
            return `3RD ${minutes ? minutes : 'END'}:${realSeconds ? realSeconds : ''}`
        } else if (quarter === '4') {
            return `4TH ${minutes ? minutes : 'END'}:${realSeconds ? realSeconds : ''}`
        }
    }

    return (
        <Container>
            <Header>
                <InnerHeader>
                    {gamestats.map((dayStat) => (
                        <DateContainer
                            onClick={() => setSelected(dayStat)}
                            selected={selectedDay?.date === dayStat.date}
                            key={dayStat.date}
                        >
                            <DateNumber>{new Date(dayStat.date).getDate()}</DateNumber>

                            <DateMonth>{format(new Date(dayStat.date), 'MMM')}</DateMonth>
                        </DateContainer>
                    ))}
                </InnerHeader>
                <DateContainerButton>
                    <Icon>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                    </Icon>
                    <DateMonth>ALL</DateMonth>
                </DateContainerButton>
            </Header>

            <BoxScoresContainer>
                {selectedDay &&
                    selectedDay.games.map((game) => (
                        <TeamRow key={game.GameID}>
                            <TeamLeft>
                                <TeamNamesAndScores>
                                    <TeamImg src={`./images/${game.home_team.Key}.png`} />
                                    <TeamKey>{game.home_team.Key}</TeamKey>

                                    <TeamScore>{game.HomeTeamScore}</TeamScore>
                                </TeamNamesAndScores>
                                <TeamNamesAndScores>
                                    <TeamImg src={`./images/${game.away_team.Key}.png`} />
                                    <TeamKey>{game.away_team.Key}</TeamKey>

                                    <TeamScore>{game.AwayTeamScore}</TeamScore>
                                </TeamNamesAndScores>
                            </TeamLeft>
                            <TeamRight>
                                {game.Status === 'Final' || game.Status === 'F/OT' ? (
                                    <Live>
                                        <Final>{'FINAL' + ` @ ${game.home_team.Key}`}</Final>
                                        {game.Status === 'F/OT' && <Overtime>OVERTIME</Overtime>}
                                    </Live>
                                ) : game.Status === 'InProgress' ? (
                                    game.Quarter === 'Half' ? (
                                        <Live>
                                            <LiveTitle isHalf={true}>{`HALF @ ${game.home_team.Key}`}</LiveTitle>
                                        </Live>
                                    ) : (
                                        <Live>
                                            <LiveTitle isHalf={false}>{`LIVE @ ${game.home_team.Key}`}</LiveTitle>
                                            <LiveDesc>
                                                {renderTime(
                                                    game.Quarter,
                                                    game.TimeRemainingMinutes,
                                                    game.TimeRemainingSeconds
                                                )}
                                            </LiveDesc>
                                        </Live>
                                    )
                                ) : game.Status === 'Scheduled' ? (
                                    <Scheduled>{`${getTzHour(game.DateTime)} @ ${game.home_team.Key}`} </Scheduled>
                                ) : null}
                            </TeamRight>
                        </TeamRow>
                    ))}
            </BoxScoresContainer>
        </Container>
    )
}

export default BoxScores

const Overtime = styled.div`
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.light5};
`

const Scheduled = styled.div`
    font-weight: 600;
    margin-bottom: 0.3rem;
    letter-spacing: 0.05rem;
`

const Live = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`

type LiveTitleProps = {
    isHalf: boolean
}

const LiveTitle = styled.div<LiveTitleProps>`
    color: ${({ theme, isHalf }) => (isHalf ? theme.colors.orange1 : theme.colors.green1)};
    font-weight: 600;
    font-size: ${({ theme, isHalf }) => (isHalf ? '0.9rem' : '0.8rem')};
    margin-bottom: 0.3rem;
`

const LiveDesc = styled.div`
    font-weight: 600;
`

const Final = styled.div`
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 700;
`

const TeamRight = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TeamRow = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.dark3};
    margin-bottom: 0.4rem;
    height: 4.5rem;
    padding: 0.5rem;
`
const TeamNamesAndScores = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const TeamScore = styled(FontRubik)`
    font-size: 1.23rem;
    letter-spacing: 0.08rem;
    font-weight: 700;
    width: 2.5rem;
`

const TeamImg = styled.img`
    height: 23px;
    width: 23px;
    margin-right: 0.5rem;
`

const TeamKey = styled.div`
    font-weight: 700;

    letter-spacing: 0.05rem;
    font-size: 0.9rem;
    width: 3.1rem;
`

const TeamLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 400;
`

const BoxScoresContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-right: 1rem;
`

const Header = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
`

const InnerHeader = styled.div`
    display: flex;
`

type DateContainerProps = {
    selected: boolean
}
const DateContainer = styled.div<DateContainerProps>`
    display: flex;
    flex-direction: column;
    padding: 0rem 0.8rem;
    height: 46px;
    justify-content: center;
    align-items: center;
    margin-right: 0.3rem;
    cursor: pointer;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark4)};
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
    border-radius: 4px;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light25)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const DateContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0rem 0.8rem;
    height: 46px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.dark3};
    color: ${({ theme }) => theme.colors.light3};
    border-radius: 4px;
    transition-duration: 100ms;
    transition-timing-function: ease-in;

    &:hover {
        color: ${({ theme }) => theme.colors.light2};
        background-color: ${({ theme }) => theme.colors.dark25};
    }
`

const DateNumber = styled.div`
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 1.1rem;
`

const Icon = styled.div`
    margin-bottom: 2px;
    font-size: 1.2rem;
`

const DateMonth = styled.div`
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
`
