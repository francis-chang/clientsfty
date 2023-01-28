import React, { useState } from 'react'
import { styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormElementElement, FormSubtitle } from '../FormElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faPause } from '@fortawesome/free-solid-svg-icons'
import useAuthStore from 'utils/state/useAuthStore'
import { verify } from 'utils/api/auth'

const Verify: React.FC = () => {
    const [waiting, setWaiting] = useState(false)

    const setUser = useAuthStore((state) => state.setUser)
    const [code, setCode] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            setIncorrect(false)
            setCode(e.target.value)
        }
        if (e.target.value.length === 5) {
            setWaiting(true)
            const response = await verify(e.target.value)

            if (response) {
                setUser(response)
            }
            if (!response) {
                setIncorrect(true)
            }
            setWaiting(false)
        }
    }
    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={true}>Verify Account</FormTitle>
                <FormSubtitle>Enter the code that was sent to your email to verify account</FormSubtitle>
            </FormDescription>
            <FormElementElement>
                <InputWrapper>
                    {code.length >= 5 && (
                        <IconContainer waiting={waiting}>
                            <FontAwesomeIcon icon={incorrect ? faXmark : faPause}></FontAwesomeIcon>
                        </IconContainer>
                    )}
                    <Input value={code} onChange={onChange} spellCheck={false} />
                </InputWrapper>
            </FormElementElement>
        </FormElement>
    )
}

export default Verify

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark4};
    outline: ${({ theme }) => `${theme.colors.dark1} solid 1px`};
    color: ${({ theme }) => theme.colors.light1};
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    width: 10rem;
    margin-right: 1rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`

const InputWrapper = styled.div`
    position: relative;
`

type IconContainerProps = {
    waiting: boolean
}

const IconContainer = styled.div<IconContainerProps>`
    display: flex;
    position: absolute;
    right: 25px;
    top: 0;
    height: 100%;
    align-items: center;
    color: ${({ theme, waiting }) => (waiting ? theme.colors.orange1 : theme.colors.red1)};
`
