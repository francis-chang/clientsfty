import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { findGame } from 'utils/api/game'
import { styled } from 'utils/theme'
import MyGames from '../MyGames'

const FantasyGame: React.FC = () => {
    const params = useParams()
    const gameQuery = useQuery(`fantasyGame${params.gameId}`, () => findGame(params.gameId))
    console.log(location.pathname)

    return gameQuery.data ? (
        <Container>
            <TitleContainer>
                <Title>{gameQuery.data.name}</Title>
                <Navigation>
                    <NavItem
                        selected={location.pathname.indexOf('setting') < 0}
                        to={`/nbafantasy/game/${params.gameId}`}
                    >
                        General
                    </NavItem>
                    <NavItem
                        selected={location.pathname.indexOf('setting') >= 0}
                        to={`/nbafantasy/game/${params.gameId}/settings`}
                    >
                        Settings
                    </NavItem>
                </Navigation>
            </TitleContainer>

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
    font-size: 2rem;
    margin-right: 2rem;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: flex-end;

    align-self: stretch;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 800px;
`

{
    /* <BackButton to="/nbafantasy">
<FontAwesomeIcon style={{ marginRight: '0.7rem' }} icon={faArrowLeft}></FontAwesomeIcon>
<div>Go back to Games</div>
</BackButton>
const BackButton = styled(Link)`
    padding: 0.5rem 0.8rem;
    display: flex;
    text-decoration: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.light3};
    border: ${({ theme }) => `1px solid ${theme.colors.dark1}`};
    align-items: center;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    margin-bottom: 1rem;

    &:hover {
        color: ${({ theme }) => theme.colors.light2};
        border: ${({ theme }) => `1px solid ${theme.colors.light4}`};
    }
` */
}
