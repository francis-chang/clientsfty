import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { findGame } from 'utils/api/game'
import { styled } from 'utils/theme'
import Players from './Players'
import PlayersTwo from './PlayersTwo'

const FantasyGame: React.FC = () => {
    const params = useParams()
    const gameQuery = useQuery(`fantasyGame${params.gameId}`, () => findGame(params.gameId))

    return gameQuery.data ? (
        <Container>
            <BackButton to="/nbafantasy">
                <FontAwesomeIcon style={{ fontSize: '1rem' }} icon={faArrowLeft}></FontAwesomeIcon>
                <div>BACK TO GAMES</div>
            </BackButton>
            <Title>{gameQuery.data.name}</Title>

            <Navigation>
                <NavItem selected={location.pathname.indexOf('setting') < 0} to={`/nbafantasygame/${params.gameId}`}>
                    GENERAL
                </NavItem>
                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    SETTINGS
                </NavItem>

                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    MY ROSTER
                </NavItem>
                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    MATCHUP
                </NavItem>
            </Navigation>

            <Outlet context={gameQuery.data} />
            {/* <Players /> */}
            <PlayersTwo />
        </Container>
    ) : (
        <Container />
    )
}

export function useGame() {
    return useOutletContext<GameInterface>()
}

export default FantasyGame

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
