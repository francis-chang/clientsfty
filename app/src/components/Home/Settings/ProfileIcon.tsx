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
import { changeProfileIcon, changeProfileIconColor } from 'utils/api/auth'
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

const Colors = [
    { color: '#ffe7b8', name: 'Off White' },
    { color: '#c5fbfc', name: 'Frost' },
    { color: '#6bbcf2', name: 'Baby Blue' },
]

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
    const onClickColor = async (co: string) => {
        const response = await changeProfileIconColor(co)
        if (response && user) {
            setUser({ ...user, profile_icon_color: response.profile_icon_color })
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
                </SelectedIconContainer>
                <SelectIconContainer>
                    {Icons.map((i) => (
                        <IconContainer selected={profile_icon === i.name} onClick={() => onClick(i.name)} key={i.name}>
                            <FontAwesomeIcon icon={i.icon}></FontAwesomeIcon>
                        </IconContainer>
                    ))}
                </SelectIconContainer>
                <ColorContainer>
                    {Colors.map((c) => (
                        <ColorButton
                            onClick={() => onClickColor(c.color)}
                            key={c.color}
                            selected={c.color === user?.profile_icon_color}
                        >
                            <Color color={c.color}></Color>
                            <div>{c.name}</div>
                        </ColorButton>
                    ))}
                </ColorContainer>
            </Container>
        </FormElement>
    )
}

export default ProfileIcon

type ColorButtonProps = {
    selected: boolean
}

const ColorButton = styled.div<ColorButtonProps>`
    padding: 0.5rem 0.8rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    &:not(:last-child) {
        margin-right: 1rem;
    }
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light4)};
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
`

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
}

const Color = styled.div<ColorProps>`
    background-color: ${({ color }) => color};
    width: 20px;
    height: 20px;
    border-radius: 4px;
    &:not(:last-child) {
        margin-right: 1rem;
    }
`

const SelectedIconDescription = styled.div``

type SelectedIconProps = {
    color: string
}

const SelectedIcon = styled.div<SelectedIconProps>`
    font-size: 3rem;
    color: ${({ color }) => color};
`

const SelectIconContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
`

const IconContainer = styled.div<ColorButtonProps>`
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 50px;
    border-radius: 4px;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light4)};
    background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
    &:hover {
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
        background-color: ${({ theme, selected }) => (selected ? theme.colors.dark2 : theme.colors.dark25)};
    }
    cursor: pointer;
    transition-timing-function: ease-out;
    transition-duration: 100ms;
`
