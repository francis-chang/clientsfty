import React, { useEffect } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    players: PlayersForGameDetails[]
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

const PlayersTwo: React.FC<Props> = ({ players }) => {
    return (
        <>
            <Notice>
                <NoticeTitle>Waiting on Commissioner</NoticeTitle>
            </Notice>
            <Container>
                {players.map((p) => (
                    <UserContainer key={p.user.user_id}>
                        <Icon color={p.user.profile_icon_color}>
                            <FontAwesomeIcon icon={findIcon(p.user.profile_icon)} />
                        </Icon>
                        <Name>{p.user.username}</Name>
                    </UserContainer>
                ))}
            </Container>
        </>
    )
}

export default PlayersTwo

const Notice = styled.div`
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const NoticeTitle = styled.div`
    font-weight: 500;

    padding: 0.6rem 0.7rem;
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.light2}; ;
`

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light25};
    margin-bottom: 0.5rem;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 0.5rem;
    padding-bottom: 0.5rem;
`

const UserContainer = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
    margin-bottom: 0.4rem;
    padding: 0.5rem 0rem;

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
    width: 3rem;
    display: flex;
    justify-content: center;
    font-size: 1.35rem;
    color: ${({ color }) => color};
`
