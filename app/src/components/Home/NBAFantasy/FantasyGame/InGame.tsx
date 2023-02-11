import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Settings from './Settings'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { Button, FontRubik, styled } from 'utils/theme'
import Players from './Players'
import { format } from 'date-fns'
import { startDraft } from 'utils/api/game'
import CurrentlyDrafting from './CurrentlyDrafting'

type Props = {
    game: GameDetails
    user: UserType
    startDraftHandler: (game_id: number, user_id: number) => Promise<void>
}

function parseMilliseconds(ms: number) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const d = days === 1 ? 'Day' : 'Days'
    const h = hours === 1 ? 'Hour' : 'Hours'
    const m = minutes === 1 ? 'Minute' : 'Minutes'
    const s = seconds === 1 ? 'Second' : 'Seconds'

    if (days === 0 && hours === 0) {
        return `${minutes % 60} ${m} ${seconds % 60} ${s}`
    } else if (days === 0) {
        return `${hours % 24} ${h} ${minutes % 60} ${m} ${seconds % 60} ${s}`
    }
    return `${days} ${d} ${hours % 24} ${h} ${minutes % 60} ${m} ${seconds % 60} ${s}`
}

const InGame: React.FC<Props> = ({ game, user, startDraftHandler }) => {
    const [timer, setTimer] = useState('')

    const [playerInfo, setPlayerInfo] = useState<PlayersForGameDetails>()

    useEffect(() => {
        const pInfo = game.players.find((p) => p.user_id === user!.user_id)
        console.log(pInfo)
        if (pInfo) {
            setPlayerInfo(pInfo)
        }
    }, [game, user])

    useEffect(() => {
        const now = new Date()
        const then = new Date(game.draftIntervalInformation!.game_start)
        //@ts-ignore
        const timeDiff = then - now
        setTimer(parseMilliseconds(timeDiff))

        const interval = setInterval(() => {
            const now = new Date()
            const then = new Date(game.draftIntervalInformation!.game_start)
            //@ts-ignore
            const timeDiff = then - now
            setTimer(parseMilliseconds(timeDiff))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return game ? (
        <Container>
            <BackButton to="/nbafantasy">
                <FontAwesomeIcon style={{ fontSize: '1rem' }} icon={faArrowLeft}></FontAwesomeIcon>
                <div>BACK TO GAMES</div>
            </BackButton>
            <HeaderContainer>
                <Title>{game.name}</Title>
            </HeaderContainer>
            {playerInfo?.draft ? (
                <CurrentlyDrafting draft_id={playerInfo.draft.draft_id} />
            ) : (
                <DraftNow>
                    <YouCanNow>DRAFT AVAILABLE</YouCanNow>
                    <DraftInformationContainer>
                        <DraftTextContainer>
                            <DraftGameContainer>
                                <GameDetails>
                                    <TeamInfoText>FIRST GAME</TeamInfoText>
                                    <Teams>
                                        <Team>
                                            <TeamImg
                                                src={`../images/${game.draftIntervalInformation?.first_game.home_team.Key}.png`}
                                            />
                                            <TeamKey>{game.draftIntervalInformation?.first_game.home_team.Key}</TeamKey>
                                        </Team>
                                        <Vs>VS</Vs>
                                        <Team>
                                            <TeamImg
                                                src={`../images/${game.draftIntervalInformation?.first_game.away_team.Key}.png`}
                                            />
                                            <TeamKey>{game.draftIntervalInformation?.first_game.away_team.Key}</TeamKey>
                                        </Team>
                                    </Teams>
                                    <TeamDate>
                                        {format(
                                            new Date(game.draftIntervalInformation!.first_game.DateTime),
                                            'MMM d h:mm a'
                                        )}
                                    </TeamDate>
                                </GameDetails>
                                <GameDetails>
                                    <TeamInfoText>LAST GAME</TeamInfoText>
                                    <Teams>
                                        <Team>
                                            <TeamImg
                                                src={`../images/${game.draftIntervalInformation?.last_game.home_team.Key}.png`}
                                            />
                                            <TeamKey>{game.draftIntervalInformation?.last_game.home_team.Key}</TeamKey>
                                        </Team>
                                        <Vs>VS</Vs>
                                        <Team>
                                            <TeamImg
                                                src={`../images/${game.draftIntervalInformation?.last_game.away_team.Key}.png`}
                                            />
                                            <TeamKey>{game.draftIntervalInformation?.last_game.away_team.Key}</TeamKey>
                                        </Team>
                                    </Teams>
                                    <TeamDate>
                                        {format(
                                            new Date(game.draftIntervalInformation!.last_game.DateTime),
                                            'MMM d h:mm a'
                                        )}
                                    </TeamDate>
                                </GameDetails>
                            </DraftGameContainer>
                            <DraftText>Time To Draft Ends 30 Minutes Before the First Game</DraftText>
                        </DraftTextContainer>
                        <DraftNowContainer>
                            <DraftIntervalEndsText>TIME TO DRAFT ENDS IN</DraftIntervalEndsText>
                            <Timer>{timer}</Timer>
                            <DraftButton onClick={() => startDraftHandler(game.game_id, user.user_id)}>
                                Draft now
                            </DraftButton>
                        </DraftNowContainer>
                    </DraftInformationContainer>
                </DraftNow>
            )}
            <InfoContainer>
                <Players
                    commissioner_id={game.commissioner_id}
                    players={game.players}
                    user_id={user?.user_id}
                    game_id={game.game_id}
                />
                <Settings game={game} />
            </InfoContainer>
        </Container>
    ) : (
        <Container />
    )
}

export default InGame

const YouCanNow = styled.div`
    text-align: center;
    padding: 0.5rem 0rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.orange0};
    color: ${({ theme }) => theme.colors.dark4};
`

const DraftInformationContainer = styled.div`
    display: flex;
    padding: 1rem;

    justify-content: space-between;
    align-items: center;
`

const DraftIntervalEndsText = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 600;
    margin-bottom: 0.5rem;
`

const Timer = styled.div`
    margin-bottom: 1rem;
    font-weight: 500;
`

const DraftNowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
`

const TeamDate = styled.div`
    color: ${({ theme }) => theme.colors.light25};
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
`

const Vs = styled.div`
    color: ${({ theme }) => theme.colors.light4};
    font-size: 0.85rem;
    padding: 0rem 0.5rem;
`

const TeamInfoText = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
`

const Team = styled.div`
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
    font-size: 1rem;
`

const GameTimeInfo = styled.div`
    display: flex;
`

const DraftNow = styled.div`
    border-radius: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.orange0}`};

    flex-direction: column;
    margin-bottom: 1rem;
`

const DraftTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: 500;
`

const DraftText = styled.div`
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.light3};
    font-style: italic;
    font-weight: 400;
`

const DraftGameContainer = styled.div`
    display: flex;
`

const GameDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 4rem;
    align-items: center;
`

const Teams = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
`

const DraftButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.orange0};
    color: ${({ theme }) => theme.colors.dark4};
    font-weight: 700;
    font-size: 1.1rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.orange1};
    }
`

const InfoContainer = styled.div`
    display: flex;
`

const HeaderContainer = styled.div`
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark2}`};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
`

const NavigationAndTitle = styled.div`
    display: flex;
    flex-direction: column;
`

const StartButton = styled(Button)`
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.8rem 2rem;
`

const Navigation = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.dark4};
    padding-top: 0.5rem;
`
type NavItemProps = {
    selected: boolean
}

const NavItem = styled(Link)<NavItemProps>`
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light4)};
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.2rem;
    margin-right: 0.3rem;
    font-size: 0.9rem;
    font-weight: 600;

    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    user-select: none;
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light25)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const Title = styled.div`
    font-weight: 700;
    font-size: 1.8rem;
    margin: 1rem 0rem 0rem 0rem;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 240px;
    width: 800px;
`

const BackButton = styled(Link)`
    padding: 0.5rem;
    justify-content: space-around;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    width: 12rem;
    text-decoration: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.light3};
    background-color: ${({ theme }) => theme.colors.dark25};
    /* border: ${({ theme }) => `2px solid ${theme.colors.dark4}`}; */
    align-items: center;
    transition-duration: 150ms;
    transition-timing-function: ease-out;

    margin: 1rem 0rem;

    &:hover {
        color: ${({ theme }) => theme.colors.light2};
        background-color: ${({ theme }) => theme.colors.dark2};
    }
`
