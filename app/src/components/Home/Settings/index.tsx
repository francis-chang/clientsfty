import React, { useState } from 'react'
import useAuthStore from 'utils/state/useAuthStore'
import { Button, styled } from 'utils/theme'
import { shallow } from 'zustand/shallow'
import ChangeUsername from './ChangeUsername'
import UsernameDefault from './UsernameDefault'
import Verify from './Verify'

const Settings: React.FC = () => {
    const { user } = useAuthStore((state) => ({ user: state.user }), shallow)

    return (
        <Container>
            <Title>User Settings</Title>
            {!user?.verified && <Verify />}
            {!user?.username ? <ChangeUsername /> : <UsernameDefault username={user.username} />}
        </Container>
    )
}

export default Settings

const Submit = styled(Button)`
    font-weight: 700;
`

const Title = styled.div`
    margin-top: 2rem;
    font-weight: 700;
    font-size: 2rem;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark4};
    outline: ${({ theme }) => `${theme.colors.dark1} solid 1px`};
    color: ${({ theme }) => theme.colors.light1};
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    width: 17rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`

const Container = styled.div`
    margin-left: 240px;
    display: flex;
    flex-direction: column;
    width: 800px;
`
