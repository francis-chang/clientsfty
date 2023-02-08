import React from 'react'
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

const Players: React.FC = () => {
    return <Container></Container>
}

export default Players

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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
    height: 5rem;
    width: 6.5rem;
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
