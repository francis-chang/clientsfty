import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Settings from './Settings'
import React from 'react'

import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'

import { Button, styled } from 'utils/theme'

import PlayersTwo from './PlayersTwo'
import { joinGame, startGame } from 'utils/api/game'

type Props = {
    game: GameDetails
    user: UserType
    startGameHandler: () => Promise<void>
}

const Lobby: React.FC<Props> = ({ game, user, startGameHandler }) => {
    const joinGameHandler = async () => {
        await joinGame(game.game_id)
    }

    return game ? (
        <Container>
            <BackButton to="/nbafantasy">
                <FontAwesomeIcon style={{ fontSize: '1rem' }} icon={faArrowLeft}></FontAwesomeIcon>
                <div>BACK TO GAMES</div>
            </BackButton>
            <HeaderContainer>
                <Title>{game.name}</Title>

                {game.commissioner_id === user?.user_id && game.players.length > 1 ? (
                    <StartButton onClick={startGameHandler}>Start Game</StartButton>
                ) : game.commissioner_id === user?.user_id ? (
                    <NoticeTitle>Need at least 2 Players to Start Game</NoticeTitle>
                ) : game.players.find((p) => p.user_id === user?.user_id) ? (
                    <NoticeTitle>Waiting on Commissioner to Start Game</NoticeTitle>
                ) : (
                    <StartButton onClick={joinGameHandler}>Join Game</StartButton>
                )}
            </HeaderContainer>
            <InfoContainer>
                <PlayersTwo
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

export default Lobby

const InfoContainer = styled.div`
    display: flex;
`

const NoticeTitle = styled.div`
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.orange0}; ;
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
