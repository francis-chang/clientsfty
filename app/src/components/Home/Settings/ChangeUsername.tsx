import React, { useState, useEffect } from 'react'
import { findUsernameAvailable } from 'utils/api/auth'
import { Button, styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormElementElement, FormSubtitle } from '../FormElements'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faPause } from '@fortawesome/free-solid-svg-icons'

const ChangeUsername: React.FC = () => {
    const regex = /^[a-zA-Z0-9]*$/
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [usernameValid, setUsernameValid] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [timeout, setT] = useState<NodeJS.Timeout>()

    const [username, setUsername] = useState('')

    useEffect(() => {
        console.log(waiting, usernameAvailable)
        console.log(!usernameAvailable === true)
    }, [waiting, usernameAvailable])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        setUsernameAvailable(null)
        setWaiting(true)
        if (e.target.value.length <= 5) {
            setUsernameValid(false)
        } else {
            if (regex.test(e.target.value)) {
                setUsernameValid(true)
                setT(
                    setTimeout(async () => {
                        const response = await findUsernameAvailable(e.target.value)
                        setUsernameAvailable(response)
                        setWaiting(false)
                    }, 500)
                )
            }
        }
        setUsername(e.target.value)
    }
    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={true}>Set a Username</FormTitle>
                <FormSubtitle>
                    Username must only contain letters and numbers, and must have at least 6 characters
                </FormSubtitle>
            </FormDescription>
            <FormElementElement>
                <InputWrapper>
                    <IconContainer
                        usernameValid={usernameValid}
                        usernameAvailable={usernameAvailable}
                        waiting={waiting}
                    >
                        <FontAwesomeIcon
                            icon={waiting ? faPause : usernameAvailable ? faCheck : faXmark}
                        ></FontAwesomeIcon>
                    </IconContainer>
                    <Input value={username} onChange={onChange} />
                </InputWrapper>
                <Submit disabled={waiting || !usernameAvailable === true}>make username</Submit>
            </FormElementElement>
        </FormElement>
    )
}

export default ChangeUsername
const InputWrapper = styled.div`
    position: relative;
`

type IconContainerProps = {
    usernameAvailable: boolean | null
    usernameValid: boolean
    waiting: boolean
}

const IconContainer = styled.div<IconContainerProps>`
    display: ${({ usernameValid }) => (usernameValid ? 'flex' : 'none')};
    position: absolute;
    right: 25px;
    top: 0;
    height: 100%;
    align-items: center;
    color: ${({ theme, usernameAvailable, waiting }) =>
        waiting ? theme.colors.orange1 : usernameAvailable ? theme.colors.green1 : theme.colors.red1};
`

type SubmitProps = {
    disabled: boolean
}

const Submit = styled(Button)<SubmitProps>`
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.blue2)};
    color: ${({ theme, disabled }) => (disabled ? theme.colors.light5 : theme.colors.light2)};
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    &:hover {
        background-color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.blue1)};
    }
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
    width: 14rem;
    margin-right: 1rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`

const Container = styled.div``
