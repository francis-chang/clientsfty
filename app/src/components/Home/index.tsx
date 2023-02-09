import React, { useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'utils/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'zustand/shallow'
import useAuthStore from 'utils/state/useAuthStore'
import { logout } from 'utils/api/auth'
import {
    faPegasus,
    faWand,
    faHouse,
    faSword,
    faChartColumn,
    faGear,
    faDoorClosed,
} from '@fortawesome/pro-light-svg-icons'

const Home: React.FC = () => {
    let location = useLocation()
    const { user, setUser } = useAuthStore((state) => ({ user: state.user, setUser: state.setUser }), shallow)

    const navigate = useNavigate()

    const onClickLogout = async () => {
        await logout()
        setUser(null)
        navigate('/login')
    }

    return (
        <Container>
            <Navigator>
                <Logo>fty.gg</Logo>
                <NavItems>
                    <NavTitle>NBA</NavTitle>
                    <NavSection>
                        <NavItem selected={location.pathname.indexOf('/nbafantasy') >= 0} to="/nbafantasy">
                            <NavTitleContainer>
                                <Icon>
                                    <FontAwesomeIcon icon={faSword} />
                                </Icon>
                                <NavItemTitle>Fantasy</NavItemTitle>
                            </NavTitleContainer>
                        </NavItem>
                        <NavItem selected={location.pathname === '/nbastats'} to="/nbastats">
                            <NavTitleContainer>
                                <Icon>
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </Icon>
                                <NavItemTitle>Stats</NavItemTitle>
                            </NavTitleContainer>
                        </NavItem>
                    </NavSection>
                    <NavTitle>NFL</NavTitle>
                    <NavSection>
                        <NavItem selected={location.pathname === '/nflfantasy'} to="/nflfantasy">
                            <NavTitleContainer>
                                <Icon>
                                    <FontAwesomeIcon icon={faSword} />
                                </Icon>
                                <NavItemTitle>Fantasy</NavItemTitle>
                            </NavTitleContainer>
                        </NavItem>
                        <NavItem selected={location.pathname === '/nflstats'} to="/nflstats">
                            <NavTitleContainer>
                                <Icon>
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </Icon>
                                <NavItemTitle>Stats</NavItemTitle>
                            </NavTitleContainer>
                        </NavItem>
                    </NavSection>
                    <NavTitle>GENERAL</NavTitle>
                    <NavItem selected={location.pathname === '/'} to="/">
                        <NavTitleContainer>
                            <Icon>
                                <FontAwesomeIcon icon={faHouse} />
                            </Icon>
                            <NavItemTitle>Home</NavItemTitle>
                        </NavTitleContainer>
                    </NavItem>
                    <NavItem selected={location.pathname === '/settings'} to="/settings">
                        <NavTitleContainer>
                            <Icon>
                                <FontAwesomeIcon icon={faGear} />
                            </Icon>
                            <NavItemTitle>Settings</NavItemTitle>
                        </NavTitleContainer>
                        {user?.settingsWarnings ? <Warning>{user?.settingsWarnings}</Warning> : null}
                    </NavItem>
                    <NavItemNonLink onClick={onClickLogout}>
                        <NavTitleContainer>
                            <Icon>
                                <FontAwesomeIcon icon={faDoorClosed} />
                            </Icon>
                            <NavItemTitle>Log Out</NavItemTitle>
                        </NavTitleContainer>
                    </NavItemNonLink>
                </NavItems>
            </Navigator>
            <Outlet />
        </Container>
    )
}

export default Home

const NavTitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const Warning = styled.div`
    border-radius: 20px;
    margin-left: 1rem;
    padding: 3px 0px;
    width: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.orange1};
    color: ${({ theme }) => theme.colors.dark4};
    font-size: 0.8rem;
    font-weight: 700;
`

type NavItemProps = {
    selected: boolean
}

const NavItemNonLink = styled.div`
    color: ${({ theme }) => theme.colors.light1};
    text-decoration: none;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.2rem 0rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;

    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        background-color: ${({ theme }) => theme.colors.dark25};
    }
`

const NavItem = styled(Link)<NavItemProps>`
    color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light3)};
    text-decoration: none;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.2rem 0rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : 'transparent')};
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light1 : theme.colors.light2)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
    font-weight: 600;
    text-transform: uppercase;
`

const Icon = styled.div`
    margin-right: 0.5rem;
    font-size: 1.1rem;
    width: 1.2rem;
`

const NavTitle = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark2}`};
    padding-bottom: 2px;
    user-select: none;
`

const NavSection = styled.div`
    overflow: hidden;
    margin-bottom: 1rem;
`

const NavItemTitle = styled.div`
    font-size: 0.87rem;
    letter-spacing: 0.02rem;
`

const Container = styled.div`
    display: flex;
    width: 1200px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    height: 100vh;
    overflow-y: hidden;
`

const Navigator = styled.div`
    width: 240px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: absolute;
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
