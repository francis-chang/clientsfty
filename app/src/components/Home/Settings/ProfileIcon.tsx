import React from 'react'
import { styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormSubtitle } from '../FormElements'
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
import { changeProfileIcon } from 'utils/api/auth'
import useAuthStore from 'utils/state/useAuthStore'
import { shallow } from 'zustand/shallow'

const Icons = [
    { name: 'user', icon: faUser },
    { name: 'bird', icon: faBird },
    { name: 'truck', icon: faTruckPickup },
    { name: 'basketball', icon: faBasketballHoop },
    { name: 'icecream', icon: faSoftServe },
    { name: 'fire', icon: faFire },
    { name: 'vihara', icon: faVihara },
]

const Colors = ['#c5fbfc', '#ffe7b8', '#6bbcf2']

const findIcon = (icon: string) => {
    const foundIcon = Icons.find((i) => i.name === icon)
    return foundIcon ? foundIcon.icon : Icons[0].icon
}

type Props = {
    profile_icon: string
    username: string
}

const ProfileIcon: React.FC<Props> = ({ profile_icon, username }) => {
    const { setUser, user } = useAuthStore((state) => ({ setUser: state.setUser, user: state.user }), shallow)

    const onClick = async (pi: string) => {
        const response = await changeProfileIcon(pi)
        if (response && user) {
            setUser({ ...user, profile_icon: response.profile_icon })
        }
    }

    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={false}>Choose an Avatar</FormTitle>
                <FormSubtitle>Select an Icon to be displayed next to your username around the site</FormSubtitle>
            </FormDescription>
            <Container>
                <SelectedIconContainer>
                    {user && (
                        <SelectedIcon color={user.profile_icon_color}>
                            <FontAwesomeIcon icon={findIcon(profile_icon)} />
                        </SelectedIcon>
                    )}
                    <ColorContainer>
                        {Colors.map((c) => (
                            <Color key={c} color={c} selected={c === user?.profile_icon_color}></Color>
                        ))}
                    </ColorContainer>
                </SelectedIconContainer>
                <SelectIconContainer>
                    {Icons.map((i) => (
                        <IconContainer onClick={() => onClick(i.name)} key={i.name}>
                            <FontAwesomeIcon icon={i.icon}></FontAwesomeIcon>
                        </IconContainer>
                    ))}
                </SelectIconContainer>
            </Container>
        </FormElement>
    )
}

export default ProfileIcon

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
`

const SelectedIconContainer = styled.div`
    display: flex;
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
    align-items: center;
`

const ColorContainer = styled.div`
    display: flex;
`

type ColorProps = {
    color: string
    selected: boolean
}

const Color = styled.div<ColorProps>`
    background-color: ${({ color }) => color};
    outline: ${({ selected, theme }) => (selected ? `2px solid ${theme.colors.light2}` : 'none')};
    width: 33px;
    height: 33px;
    border-radius: 4px;
    &:not(:last-child) {
        margin-right: 1.8rem;
    }
`

const SelectedIconDescription = styled.div``

type SelectedIconProps = {
    color: string
}

const SelectedIcon = styled.div<SelectedIconProps>`
    font-size: 3rem;
    margin-right: 4rem;
    color: ${({ color }) => color};
`

const SelectIconContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const IconContainer = styled.div`
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 50px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark3};
    cursor: pointer;
    transition-timing-function: ease-out;
    transition-duration: 100ms;
    &:hover {
        background-color: ${({ theme }) => theme.colors.dark25};
    }
`
