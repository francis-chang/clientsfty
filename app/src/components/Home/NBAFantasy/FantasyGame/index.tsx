import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { findGame } from 'utils/api/game'
import { styled } from 'utils/theme'

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
                    General
                </NavItem>
                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    Settings
                </NavItem>

                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    My Roster
                </NavItem>
                <NavItem
                    selected={location.pathname.indexOf('setting') >= 0}
                    to={`/nbafantasygame/${params.gameId}/settings`}
                >
                    Matchup
                </NavItem>
            </Navigation>

            <Outlet context={gameQuery.data} />
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
    padding: 0.5rem 0rem;
    /* border-bottom: ${({ theme }) => `1px solid ${theme.colors.light4}`}; */
`
type NavItemProps = {
    selected: boolean
}

const NavItem = styled(Link)<NavItemProps>`
    color: ${({ theme }) => theme.colors.light1};
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.2rem;
    margin-right: 0.3rem;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const Title = styled.div`
    font-weight: 700;
    font-size: 1.8rem;
    margin: 0rem 0rem 0.5rem 0rem;
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
    border: ${({ theme }) => `2px solid ${theme.colors.dark1}`};
    align-items: center;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    margin: 1rem 0rem;

    &:hover {
        color: ${({ theme }) => theme.colors.light2};
        border: ${({ theme }) => `2px solid ${theme.colors.light4}`};
    }
`
