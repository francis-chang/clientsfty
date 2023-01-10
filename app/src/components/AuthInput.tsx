import React, { useState } from 'react'
import { styled } from 'utils/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type Props = {
    inputvalue: string
    onvaluechange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isPassword: boolean
    id: string
}

const InputContainer: React.FC<Props> = ({ inputvalue, onvaluechange, isPassword, id }) => {
    const [inputVisible, setInputVisible] = useState(true)

    return (
        <InputWrapper>
            {isPassword ? (
                <>
                    <Input
                        id={id}
                        type={inputVisible ? 'text' : 'password'}
                        value={inputvalue}
                        onChange={onvaluechange}
                        spellCheck={false}
                    />
                    <IconContainer onClick={() => setInputVisible(!inputVisible)}>
                        <FontAwesomeIcon icon={inputVisible ? faEye : faEyeSlash} />
                    </IconContainer>
                </>
            ) : (
                <Input value={inputvalue} onChange={onvaluechange} spellCheck={false} />
            )}
        </InputWrapper>
    )
}
export default InputContainer

const IconContainer = styled.div`
    position: absolute;
    right: 10px;
    top: 8.5px;
    margin: auto;
    font-size: 1.6rem;
    width: 34px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.dark25};
    transition-duration: 125ms;
    transition-timing-function: ease;
    &:hover {
        color: ${({ theme }) => theme.colors.light2};
    }
`

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.75rem;
    position: relative;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark4};
    outline: ${({ theme }) => `${theme.colors.dark1} solid 1px`};
    color: ${({ theme }) => theme.colors.light2};
    border: none;
    padding: 0rem 1rem;
    height: 2.8rem;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
`
