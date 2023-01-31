import React, { useState } from 'react'
import { styled, theme } from 'utils/theme'
import format from 'date-fns/format'

type Props = {
    gamestats: GameStatsJustScores[]
}

const BoxScores: React.FC<Props> = ({ gamestats }) => {
    const today = format(new Date(), 'MMM-dd')

    const [selectedDay, setSelected] = useState<GameStatsJustScores | undefined>(
        gamestats.find((g) => today === format(new Date(g.date), 'MMM-dd'))
    )

    return (
        <Container>
            <Header>
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
                                    <Final>
                                        {game.Status === 'Final'
                                            ? 'FINAL'
                                            : game.Status === 'F/OT'
                                            ? 'FINAL OT'
                                            : 'FINAL 2OT'}
                                    </Final>
                                ) : game.Status === 'InProgress' ? (
                                    <Live>
                                        <LiveTitle>LIVE</LiveTitle>
                                        <LiveDesc>{`Q${game.Quarter} ${game.TimeRemainingMinutes}:${game.TimeRemainingSeconds}`}</LiveDesc>
                                    </Live>
                                ) : null}
                            </TeamRight>
                        </TeamRow>
                    ))}
            </BoxScoresContainer>
        </Container>
    )
}

export default BoxScores

const Live = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LiveTitle = styled.div`
    color: ${({ theme }) => theme.colors.green1};
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
`

const LiveDesc = styled.div`
    font-size: 1.05rem;
    font-weight: 500;
`

const Final = styled.div`
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 700;
    font-size: 1.1rem;
`

const TeamRight = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TeamImgAndName = styled.div`
    display: flex;
    width: 4.4rem;
    align-items: center;
`

const BoxScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`

const TeamRow = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.dark3};
    margin-bottom: 0.3rem;
    height: 5.5rem;
    padding: 0.65rem;
`
const TeamNamesAndScores = styled.div`
    display: flex;
    width: 7.4rem;
    align-items: center;
    justify-content: space-between;
`

const TeamScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TeamScore = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
`

const TeamImg = styled.img`
    height: 28px;
`

const TeamKey = styled.div`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light3};
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
`

const Header = styled.div`
    display: flex;
`

type DateContainerProps = {
    selected: boolean
}
const DateContainer = styled.div<DateContainerProps>`
    display: flex;
    flex-direction: column;
    padding: 0.4rem 0.8rem;
    align-items: center;
    margin-right: 0.3rem;
    cursor: pointer;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark4)};
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
    border-radius: 4px;
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light25)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const DateNumber = styled.div`
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 1.1rem;
`
const DateMonth = styled.div`
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
`
