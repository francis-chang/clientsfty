import React from 'react'
import { styled } from 'utils/theme'
import * as Icons from '@fortawesome/pro-duotone-svg-icons'
import * as RegularIcons from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fonfts = [Icons.faCampfire, Icons.faMoon, Icons.faPlanetMoon, Icons.faVolcano, Icons.faSunHaze]

const asdf = [
    Icons.faVolcano,
    Icons.faSkull,
    Icons.faChess,
    Icons.faFire,
    Icons.faBird,
    Icons.faBasketballHoop,
    Icons.faSoftServe,
    Icons.faVihara,
    Icons.faTurtle,
    Icons.faTruckPickup,
    Icons.faTowerObservation,
    Icons.faRabbitRunning,
    Icons.faSwords,
]

const Players: React.FC = () => {
    return (
        <Container>
            {asdf.map((f) => (
                <UserContainer key={f.iconName}>
                    <Icon>
                        <FontAwesomeIcon icon={f} />
                    </Icon>
                    <Name>{f.iconName.slice(0, 10)}</Name>
                </UserContainer>
            ))}

            {fonfts.map((f) => (
                <UserContainer key={f.iconName}>
                    <Icon>
                        <FontAwesomeIcon icon={f} />
                    </Icon>
                    <Name>{f.iconName.slice(0, 10)}</Name>
                </UserContainer>
            ))}
        </Container>
    )
}

export default Players

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-gap: 10px;
    grid-auto-flow: row dense;
`

const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 6rem;
    width: 7.5rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark3};
`

const Name = styled.div`
    font-size: 0.9rem;
    font-weight: 600;
`

const Icon = styled.div`
    font-size: 1.7rem;
    color: ${({ theme }) => {
        const randomIndex = Math.floor(Math.random() * theme.list.length)
        return theme.list[randomIndex]
    }};
`
