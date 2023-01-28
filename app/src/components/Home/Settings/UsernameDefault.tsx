import React, { useState, useEffect } from 'react'
import { changeUsername, findUsernameAvailable } from 'utils/api/auth'
import { Button, styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormSubtitle } from '../FormElements'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faPause } from '@fortawesome/free-solid-svg-icons'
import useAuthStore from 'utils/state/useAuthStore'

type Props = {
    username: string
}

const UsernameDefault: React.FC<Props> = ({ username }) => {
    const [changeView, setChangeView] = useState(false)
    const regex = /^[a-zA-Z0-9]*$/
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [usernameValid, setUsernameValid] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [timeout, setT] = useState<NodeJS.Timeout>()

    const [usernameToChange, setUsername] = useState('')
    const setUser = useAuthStore((state) => state.setUser)

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

    // make sure to do error handling
    const onClick = async () => {
        const response = await changeUsername(usernameToChange)
        if (response) {
            setUser(response)
            setUsername('')
            setUsernameValid(false)
            setUsernameAvailable(false)
            setChangeView(false)
        }
    }

    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={false}>Username</FormTitle>
                {changeView && (
                    <FormSubtitle>
                        Username must only contain letters and numbers, and must have at least 6 characters
                    </FormSubtitle>
                )}
            </FormDescription>
            {changeView ? (
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
                        <Input spellCheck={false} value={usernameToChange} onChange={onChange} />
                    </InputWrapper>
                    <Submit onClick={onClick} disabled={waiting || !usernameAvailable === true}>
                        change username
                    </Submit>
                    <CancelButton onClick={() => setChangeView(false)}>Cancel</CancelButton>
                </FormElementElement>
            ) : (
                <FormElementElement>
                    <Title>{username}</Title>
                    <Submit onClick={() => setChangeView(true)} disabled={false}>
                        Change Username
                    </Submit>
                </FormElementElement>
            )}
        </FormElement>
    )
}

export default UsernameDefault

const CancelButton = styled.div`
    height: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.light4};
`

const FormElementElement = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    position: relative;
`

const InputWrapper = styled.div`
    position: relative;
`

const Title = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    margin-right: 2rem;
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
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.dark4)};
    color: ${({ theme, disabled }) => (disabled ? theme.colors.light5 : theme.colors.light2)};
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    border: ${({ theme, disabled }) =>
        disabled ? `1px solid ${theme.colors.dark25}` : `1px solid ${theme.colors.dark1}`};
    &:hover {
        background-color: ${({ theme, disabled }) => (disabled ? theme.colors.dark25 : theme.colors.dark3)};
    }
    height: 2.2rem;
    padding: 0rem 0.7rem;
    font-weight: 700;
`
// const Submit = styled(Button)`
//     background-color: ${({ theme }) => theme.colors.dark4};
//     color: ${({ theme }) => theme.colors.light2};
//     cursor: pointer;
//     &:hover {
//         background-color: ${({ theme }) => theme.colors.dark25};
//     }
//     font-size: 0.8rem;
//     border: ${({ theme }) => `1px solid ${theme.colors.dark1}`};
//     padding: 0rem 0.7rem;
//     font-weight: 700;

// `

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark4};
    outline: ${({ theme }) => `${theme.colors.dark1} solid 1px`};
    color: ${({ theme }) => theme.colors.light1};
    border: none;
    padding: 0rem 1rem;
    height: 2.2rem;
    border-radius: 4px;
    font-size: 1rem;
    width: 14rem;
    margin-right: 1rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`

const Container = styled.div``
