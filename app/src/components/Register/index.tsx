import React from 'react'
import { Container, AuthContainer, Title, Input, Label, LabelAndInput } from '../styles'
import useRegister from './useRegister'
import Checkbox from './Checkbox'
import InputContainer from 'components/AuthInput'

const Auth: React.FC = () => {
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
    return (
        <Container>
            <Title>fty.gg</Title>
            <AuthContainer>
                <Label htmlFor="username">username</Label>
                <Checkbox data={username} fetching={usernameFetching} />
                <InputContainer
                    id="username"
                    inputvalue={username.str}
                    onvaluechange={setUsername}
                    isPassword={false}
                />
            </AuthContainer>
        </Container>
    )
}

export default Auth
