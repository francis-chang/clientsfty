import React, { useEffect } from 'react'
import { kickPlayer } from 'utils/api/game'
import { styled } from 'utils/theme'
import {
    faUser,
    faBasketballHoop,
    faBird,
    faSoftServe,
    faTruckPickup,
    faVihara,
    faFire,
} from '@fortawesome/pro-duotone-svg-icons'
import { faXmark } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    players: PlayersForGameDetails[]
    commissioner_id: number
    user_id: number | undefined
    game_id: number
}

// got from Settings/ProfileIcon.tsx
const Icons = [
    { name: 'user', icon: faUser },
    { name: 'bird', icon: faBird },
    { name: 'truck', icon: faTruckPickup },
    { name: 'basketball', icon: faBasketballHoop },
    { name: 'icecream', icon: faSoftServe },
    { name: 'fire', icon: faFire },
    { name: 'vihara', icon: faVihara },
]

const Colors = [
    { color: '#ffe7b8', name: 'Off White' },
    { color: '#c5fbfc', name: 'Frost' },
    { color: '#6bbcf2', name: 'Baby Blue' },
]

const findIcon = (icon: string) => {
    const foundIcon = Icons.find((i) => i.name === icon)
    return foundIcon ? foundIcon.icon : Icons[0].icon
}

const sliceUsername = (username: string) => {
    if (username.length > 15) {
        return `${username.slice(0, 15)}...`
    }
    return username
}

const sliceUsernameCommish = (username: string) => {
    if (username.length > 11) {
        return `${username.slice(0, 11)}...`
    }
    return username
}

const PlayersTwo: React.FC<Props> = ({ players, commissioner_id, user_id, game_id }) => {
    const isCommish = commissioner_id === user_id

    return (
        <TotalContainer>
            <PlayersTitle>{`${players.length} Players`}</PlayersTitle>
            <Container>
                {players.map((p) => (
                    <UserContainer key={p.user.user_id}>
                        <Icon color={p.user.profile_icon_color}>
                            <FontAwesomeIcon icon={findIcon(p.user.profile_icon)} />
                        </Icon>
                        <Name>
                            {isCommish ? sliceUsernameCommish(p.user.username) : sliceUsername(p.user.username)}
                        </Name>
                        {isCommish && p.user_id !== commissioner_id && (
                            <KickIcon onClick={() => kickPlayer(game_id, p.userforgame_id)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </KickIcon>
                        )}
                    </UserContainer>
                ))}
            </Container>
        </TotalContainer>
    )
}

export default PlayersTwo

const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-right: 1.5rem;
`

const PlayersTitle = styled.div`
    margin-bottom: 0.5rem;

    color: ${({ theme }) => theme.colors.light25};
    font-weight: 500;
    font-size: 1.3rem;
`

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light25};
    margin-bottom: 0.5rem;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.4rem;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark25};
`

const Name = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    flex-grow: 1;
`

type IconProps = {
    color: string
}

const Icon = styled.div<IconProps>`
    width: 2rem;
    display: flex;

    font-size: 1.35rem;
    color: ${({ color }) => color};
`

const KickIcon = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.2rem;

    color: ${({ theme }) => theme.colors.red0};
    transition-duration: 100ms;
    transition-timing-function: ease;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.red1};
        transform: rotate(90deg);
    }
`
