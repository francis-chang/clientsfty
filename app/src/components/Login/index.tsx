import React from 'react'
import { Container, AuthContainer, ContainerTitle, Input, Label, LabelAndInput } from '../styles'
import { Link } from 'react-router-dom'

import InputContainer from 'components/AuthInput'
import { styled, Button } from 'utils/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons'
import useLogin from './useLogin'

const Login: React.FC = () => {
    const [username, password, setUsername, setPassword, submitLogin] = useLogin()

    return (
        <Container>
            <ContainerTitle>fty.gg</ContainerTitle>
            <AuthContainer onSubmit={submitLogin}>
                <Label htmlFor="username">username</Label>
                <InputContainer id="username" inputvalue={username} onvaluechange={setUsername} isPassword={false} />
                <Label htmlFor="password">password</Label>
                <InputContainer id="password" inputvalue={password} onvaluechange={setPassword} isPassword={true} />
                <SubmitButton>Log in</SubmitButton>
                <OrContainer>
                    <Border />
                    <div>OR</div>
                    <Border />
                </OrContainer>
                <OauthButton isDiscord={true}>
                    <OauthText>Log in with Discord</OauthText>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
                    </IconWrapper>
                </OauthButton>
                <OauthButton isDiscord={false}>
                    <OauthText>Log in with Google</OauthText>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                    </IconWrapper>
                </OauthButton>
            </AuthContainer>

            <AlreadyContainer to="/register">
                Not Signed Up? <Span>Register here</Span>
            </AlreadyContainer>
        </Container>
    )
}

export default Login

const OauthText = styled.div`
    flex-grow: 1;
    text-align: center;
`

export const BareLink = styled(Link)`
    color: ${({ theme }) => theme.colors.light2};
    text-decoration: none;
`
const AlreadyContainer = styled(BareLink)`
    font-size: 0.95rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.7rem;
    margin: 0.5rem 0rem;
    cursor: pointer;
`

const Span = styled.span`
    text-decoration: underline;
    padding-left: 0.5rem;
`
const IconWrapper = styled.div`
    display: flex;
    width: 5rem;
    font-size: 2rem;
    justify-content: center;
`

const OrContainer = styled.div`
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light25};
`

const Border = styled.div`
    height: 1px;
    width: 75px;
    margin: 10px 0px;
    background-color: ${({ theme }) => theme.colors.light25};
`

type OauthButtonProps = {
    isDiscord: boolean
}

const OauthButton = styled(Button)<OauthButtonProps>`
    font-weight: 800;
    background-color: ${({ theme, isDiscord }) => (isDiscord ? theme.colors.discordhover : theme.colors.light2)};
    color: ${({ theme, isDiscord }) => (isDiscord ? theme.colors.discordcolor : theme.colors.dark4)};
    cursor: pointer;
    border-radius: 4px;
    padding: 0rem 1rem;
    height: 4.5rem;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    &:hover {
        background-color: ${({ theme, isDiscord }) =>
            isDiscord ? theme.colors.discordbackground : theme.colors.light1};
    }
`

const SubmitButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.light25};
    font-size: 1.1rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.dark4};
    border-radius: 4px;
    padding: 1.3rem 2.2rem;
    display: flex;
    justify-content: center;
    width: 100%;
    transition-duration: 175ms;
    transition-timing-function: ease;
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    &:disabled {
        background-color: ${({ theme }) => theme.colors.dark25};
        color: ${({ theme }) => theme.colors.light4};
    }
    &:hover {
        background-color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.light1)};
    }
`