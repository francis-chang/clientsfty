import React, { useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { styled } from 'utils/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faChartBar, faChessKnight, faUser } from '@fortawesome/free-regular-svg-icons'

const Home: React.FC = () => {
    let location = useLocation()

    return (
        <Container>
            <Navigator>
                <Logo>fty.gg</Logo>
                <NavItems>
                    <NavTitle>NBA</NavTitle>
                    <NavSection>
                        <NavItem selected={location.pathname.indexOf('/nbafantasy') >= 0} to="/nbafantasy">
                            <Icon>
                                <FontAwesomeIcon icon={faChessKnight} />
                            </Icon>
                            <NavItemTitle>Fantasy</NavItemTitle>
                        </NavItem>
                        <NavItem selected={location.pathname === '/nbastats'} to="/nbastats">
                            <Icon>
                                <FontAwesomeIcon icon={faChartBar} />
                            </Icon>
                            <NavItemTitle>Stats</NavItemTitle>
                        </NavItem>
                    </NavSection>
                    <NavTitle>NFL</NavTitle>
                    <NavSection>
                        <NavItem selected={location.pathname === '/nflfantasy'} to="/nflfantasy">
                            <Icon>
                                <FontAwesomeIcon icon={faChessKnight} />
                            </Icon>
                            <NavItemTitle>Fantasy</NavItemTitle>
                        </NavItem>
                        <NavItem selected={location.pathname === '/nflstats'} to="/nflstats">
                            <Icon>
                                <FontAwesomeIcon icon={faChartBar} />
                            </Icon>
                            <NavItemTitle>Stats</NavItemTitle>
                        </NavItem>
                    </NavSection>
                    <NavItem selected={location.pathname === '/'} to="/">
                        <Icon>
                            <FontAwesomeIcon icon={faUser} />
                        </Icon>
                        <NavItemTitle>Home</NavItemTitle>
                    </NavItem>
                    <NavItem selected={location.pathname === '/settings'} to="/settings">
                        <Icon>
                            <FontAwesomeIcon icon={faSliders} />
                        </Icon>
                        <NavItemTitle>Settings</NavItemTitle>
                    </NavItem>
                </NavItems>
            </Navigator>
            <Outlet />
        </Container>
    )
}

export default Home

type NavItemProps = {
    selected: boolean
}

const NavItem = styled(Link)<NavItemProps>`
    color: ${({ theme }) => theme.colors.light1};
    text-decoration: none;
    display: flex;
    margin: 0 auto;
    align-items: center;
    width: 100%;
    margin: 0.2rem 0rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
`

const Icon = styled.div`
    margin-right: 0.5rem;
    font-size: 1.1rem;
    width: 1.2rem;
`

const NavTitle = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
    user-select: none;
`

const NavSection = styled.div`
    overflow: hidden;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
`

const NavItemTitle = styled.div``

const Container = styled.div`
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
`

const Navigator = styled.div`
    width: 240px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    padding: 0rem 1.8rem;
`

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    width: 100%;
    padding: 1.3rem 0rem;
    text-align: center;
`

const NavItems = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`
