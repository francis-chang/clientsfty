import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'

type Props = {
    data: UsernameCreateField | PasswordCreateField | EmailCreateField
    fetching: null | boolean
}

type DataStripped = {
    [key: string]: any
}

/** in the backend, make sure to add a new rule that a username can only contain only one of each - period and underscore */

const Checkbox: React.FC<Props> = ({ data, fetching }) => {
    const [valid, setValid] = useState(false)

    const [state, setState] = useState<DataStripped>()

    useEffect(() => {
        // type guard by using in
        if ('hasOnlyAllowedChars' in data) {
            setValid(
                data.hasOnlyAllowedChars.value &&
                    data.isBetweenLengthOf6and30.value &&
                    data.doesNotStartOrEndWithSpecialChars.value &&
                    data.usernameNotTaken.value
            )
        } else if ('hasAtLeastOneAlpha' in data) {
            setValid(
                data.hasAtLeastOneAlpha.value && data.hasAtLeastOneNumeric.value && data.isBetweenLengthOf8and100.value
            )
        } else if ('isValidEmail' in data) {
            setValid(data.isValidEmail.value && data.isUniqueEmail.value)
        }
        /**
         *
         * UsernameCreateField | PasswordCreateField | EmailCreateField
         *
         * has key values of str: string, and [string]: boolean
         * below strips the str: string kv out so that only [string]: boolean remains
         */
        const kv = { ...data }
        //@ts-ignore
        delete kv.str
        //@ts-ignore
        setState(kv)
    }, [data])

    return (
        <Container isValid={valid}>
            {state &&
                Object.entries(state).map(([k, v]) => {
                    if (v.description === 'Username must not be Taken') {
                        return (
                            <Element key={k} valid={v.value} fetching={fetching}>
                                {v.description}
                            </Element>
                        )
                    } else if (v.description === 'Email must not be Taken') {
                        return (
                            <Element key={k} valid={v.value} fetching={fetching}>
                                {v.description}
                            </Element>
                        )
                    }
                    return (
                        <Element key={k} valid={v.value} fetching={null}>
                            {v.description}
                        </Element>
                    )
                })}
        </Container>
    )
}
export default Checkbox

type ContainerProps = {
    isValid: boolean
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    border-radius: 4px;
    outline: ${({ theme, isValid }) =>
        isValid ? `1px solid ${theme.colors.green2}` : `1px solid ${theme.colors.light4}`};
    transition-duration: 125ms;
    transition-timing-function: ease;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
`
type ElementProps = {
    valid: boolean
    fetching: null | boolean
}
const Element = styled.div<ElementProps>`
    color: ${({ valid, theme }) => (valid ? theme.colors.green1 : theme.colors.light4)};
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    animation: ${({ fetching }) => (fetching ? `pulsate 1.5s alternate infinite` : '')};
    transition-duration: 125ms;
    transition-timing-function: ease;
`
