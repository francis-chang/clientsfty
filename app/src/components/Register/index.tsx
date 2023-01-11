import React from 'react'
import { Container, AuthContainer, ContainerTitle, Label } from '../styles'
import { Link } from 'react-router-dom'
import useRegister from './useRegister'
import Checkbox from './Checkbox'
import InputContainer from 'components/AuthInput'
import { styled, Button } from 'utils/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons'
import useAuthStore from 'utils/state/useAuthStore'
import { shallow } from 'zustand/shallow'
import Error from 'components/Error'

const Register: React.FC = () => {
    const [
        username,
        password,
        setUsername,
        setPassword,
        email,
        setEmail,
        ableToSubmit,
        submitCreate,
        usernameFetching,
        emailFetching,
    ] = useRegister()

    const { user, error, setError } = useAuthStore(
        (state) => ({ user: state.user, error: state.error, setError: state.setError }),
        shallow
    )

    return (
        <>
            <Error error={error} setError={setError} />
            <Container>
                <ContainerTitle>fty.gg</ContainerTitle>
                <AuthContainer onSubmit={submitCreate}>
                    <Label htmlFor="username">username</Label>
                    <Checkbox data={username} fetching={usernameFetching} />
                    <InputContainer
                        id="username"
                        inputvalue={username.str}
                        onvaluechange={setUsername}
                        isPassword={false}
                    />
                    <Label htmlFor="password">password</Label>
                    <Checkbox data={password} fetching={null} />
                    <InputContainer
                        id="password"
                        inputvalue={password.str}
                        onvaluechange={setPassword}
                        isPassword={true}
                    />
                    <Label htmlFor="email">email</Label>
                    <Checkbox data={email} fetching={emailFetching} />
                    <InputContainer id="email" inputvalue={email.str} onvaluechange={setEmail} isPassword={false} />
                    <SubmitButton
                        // title={ableToSubmit ? 'Create User' : 'Fill Inpt Requirements'}
                        disabled={!ableToSubmit}
                    >
                        {ableToSubmit ? 'register' : 'Fill Requirements'}
                    </SubmitButton>
                    <OrContainer>
                        <Border />
                        <div>OR</div>
                        <Border />
                    </OrContainer>
                    <OauthButton isDiscord={true}>
                        <OauthText>Sign up with Discord</OauthText>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
                        </IconWrapper>
                    </OauthButton>
                    <OauthButton isDiscord={false}>
                        <OauthText>Sign up with Google</OauthText>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                        </IconWrapper>
                    </OauthButton>
                </AuthContainer>
                <AlreadyContainer to="/login">
                    Already signed up? <Span>Log in here</Span>
                </AlreadyContainer>
            </Container>
        </>
    )
}

export default Register

const OauthText = styled.div`
    flex-grow: 1;
    text-align: center;
`
const Span = styled.span`
    text-decoration: underline;
    padding-left: 0.5rem;
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
    background-color: ${({ theme, isDiscord }) => (isDiscord ? theme.colors.discordhover : theme.colors.light25)};
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
