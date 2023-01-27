import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { styled } from 'utils/theme'
import MyGames from './MyGames'

const NBAFantasy: React.FC = () => {
    const location = useLocation()
    return (
        <Container>
            <Navigation>
                <NavItem
                    selected={location.pathname === '/nbafantasy' || location.pathname.indexOf('/nbafantasy/game') >= 0}
                    to="/nbafantasy"
                >
                    My Games
                </NavItem>
                <NavItem selected={location.pathname === '/nbafantasy/bar'} to="/nbafantasy">
                    Find Games
                </NavItem>
                <NavItem selected={location.pathname === '/nbafantasy/create'} to="/nbafantasy/create">
                    Create Game
                </NavItem>
            </Navigation>
            {location.pathname === '/nbafantasy' ? <MyGames /> : <Outlet />}
        </Container>
    )
}

export default NBAFantasy

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0rem 5rem 240px;
    position: relative;
    height: 100vh;
    max-height: 100vh;
    overflow-y: hidden;
`

const Navigation = styled.div`
    margin: 0.8rem 0rem;
    display: flex;
    position: sticky;
    top: 0;
    height: 34px;
    min-height: 34px;
    background-color: ${({ theme }) => theme.colors.dark4};
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
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`
