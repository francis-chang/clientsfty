import React, { useState } from 'react'
import { styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormElementElement, FormSubtitle } from '../FormElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faPause } from '@fortawesome/free-solid-svg-icons'

const Verify: React.FC = () => {
    const [waiting, setWaiting] = useState(false)
    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={true}>Verify Account</FormTitle>
                <FormSubtitle>Enter the code that was sent to your email to verify account</FormSubtitle>
            </FormDescription>
            <FormElementElement>
                <InputWrapper>
                    <IconContainer waiting={waiting}>
                        <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                    </IconContainer>
                    <Input spellCheck={false} />
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
    width: 14rem;
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
