import { useEffect, useState } from 'react'
import useAuthStore from 'utils/state/useAuthStore'

import { findUsernameAvailable, findEmailAvailable, createUser } from 'utils/api/auth'

/**
 * VALIDATIONS FOR USERNAME / PASSWORD ARE SUBJECT TO CHANGE
 *
 * VALIDATIONS THAT ARE QUESTIONABLE
 * STARTING STRING WITH A SPECIAL CHARACTER SHOULDN'T BE PERMISSIBLE
 * BUT IS ENDING WITH A SPECIAL CHARACTER OKAY? IE 'FOO_' OR 'FOO$'
 *
 * USERNAME VALIDATIONS CURRENTLY ACCEPT A USERNAME LIKE 'FOOBAR._FF._FOO'
 * WHICH MAY BE TOO AWKWARD OF A USERNAME, CONSIDER LIMITATIONS
 *
 * PASSWORD VALIDATION CURRENTLY CHECKS FOR AT LEAST ONE ALPHA, ONE NUMERIC AND LENGTH
 * WHILE ACCEPTING ALL SORTS OF CHARACTERS
 * CONSIDER LIMITING WHICH SPECIAL CHARACTERS ARE ACCEPTABLE.
 *
 * PASSWORD VALIDATION ALSO CURRENTLY ACCEPTS CHAR LENGTH OF 8-100
 * 100 MIGHT BE TOO BIG OF A LENGTH
 *
 * REGULAR EXPRESSIONS SHOULD BE USED SPARINGLY, AND SUCCINCTLY
 * PYTHON AND JAVASCRIPT HANDLES REGEXES DIFFERENTLY
 */
const defaultUsernameState: UsernameCreateField = {
    str: '',
    isBetweenLengthOf6and30: { value: false, description: 'Must be Between 6-30 Characters' },
    hasOnlyAllowedChars: {
        value: false,
        description: 'May only contain Letters, Numbers, Underscores and Periods',
    },
    doesNotStartOrEndWithSpecialChars: {
        value: false,
        description: 'Cannot Start or End with Underscores or Periods',
    },
    usernameNotTaken: { value: false, description: 'Username must not be Taken' },
}

const defaultPasswordState: PasswordCreateField = {
    str: '',
    hasAtLeastOneAlpha: { value: false, description: 'Must contain At Least One Letter' },
    hasAtLeastOneNumeric: { value: false, description: 'Must contain At Least One Number' },
    isBetweenLengthOf8and100: { value: false, description: 'Must be Between 8-100 Characters' },
    hasSpecialCharacter: {
        value: false,
        description: `Must have a Special Character\n@ $ ! % * # ?  or & are Valid.`,
    },

    // TODO: find out which characters are acceptable for password, regex match against that
    // hasOnlyAllowedChars: {value: false, description: ''}
}

const defaultEmailState: EmailCreateField = {
    str: '',
    isValidEmail: { value: false, description: 'Must be Valid Email Address' },
    isUniqueEmail: { value: false, description: 'Email must not be Taken' },
    // TODO: find out which characters are acceptable for password, regex match against that
    // hasOnlyAllowedChars: false
}

const useRegister = () => {
    // REGULAR EXPRESSIONS

    const [finalLogin, setFinalLogin] = useState(false)
    const [username, setU] = useState<UsernameCreateField>(defaultUsernameState)
    const [password, setP] = useState<PasswordCreateField>(defaultPasswordState)
    const [email, setE] = useState(defaultEmailState)
    const [ableToSubmit, setAbleToSubmit] = useState(false)

    useEffect(() => {
        setAbleToSubmit(
            username.isBetweenLengthOf6and30.value &&
                username.usernameNotTaken &&
                username.hasOnlyAllowedChars.value &&
                password.hasAtLeastOneAlpha.value &&
                password.hasAtLeastOneNumeric.value &&
                password.isBetweenLengthOf8and100.value &&
                email.isValidEmail.value &&
                email.isUniqueEmail.value
        )
    }, [username, password, email])

    const [timeout, setT] = useState<NodeJS.Timeout | null>(null)
    const [usernameFetching, setUsernameFetching] = useState(false)

    //debounce time for input when fetching if username is unique
    const TIMEOUT_VALUE = 500

    const generate_username_timeout = (name: string): NodeJS.Timeout => {
        setUsernameFetching(true)
        if (timeout) {
            clearTimeout(timeout)
        }
        const t = setTimeout(async () => {
            const response = await findUsernameAvailable(name)
            if (response) {
                setU((user) =>
                    user.isBetweenLengthOf6and30.value
                        ? { ...user, usernameNotTaken: { ...user.usernameNotTaken, value: true } }
                        : { ...user, usernameNotTaken: { ...user.usernameNotTaken, value: false } }
                )
                setUsernameFetching(false)
            } else {
                setU((user) => ({ ...user, usernameNotTaken: { ...user.usernameNotTaken, value: false } }))
                setUsernameFetching(false)
            }
        }, TIMEOUT_VALUE)
        setT(t)
        return t
    }

    const [emailFetching, setEmailFetching] = useState(false)

    const generate_email_timeout = (email: string): NodeJS.Timeout => {
        setEmailFetching(true)
        if (timeout) {
            clearTimeout(timeout)
        }
        const t = setTimeout(async () => {
            //response is boolean
            const response = await findEmailAvailable(email)
            if (response) {
                setE((email) =>
                    email.str.length > 0
                        ? { ...email, isUniqueEmail: { ...email.isUniqueEmail, value: true } }
                        : { ...email, isUniqueEmail: { ...email.isUniqueEmail, value: false } }
                )
                setEmailFetching(false)
            } else {
                setE((email) => ({ ...email, isUniqueEmail: { ...email.isUniqueEmail, value: false } }))
                setEmailFetching(false)
            }
        }, TIMEOUT_VALUE)
        setT(t)
        return t
    }

    const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const em = e.target.value
        const regex =
            //eslint-disable-next-line
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        const state = { ...defaultEmailState, str: em }
        if (regex.test(em)) {
            state.isValidEmail = { ...email.isValidEmail, value: true }
        } else {
            state.isValidEmail = { ...email.isValidEmail, value: false }
        }

        setE(state)
        if (state.isValidEmail.value) {
            generate_email_timeout(em)
        }
    }

    const setUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const usrname = e.target.value

        if (usrname.length === 0) {
            setU(defaultUsernameState)
            return
        }

        const state = { ...defaultUsernameState, str: usrname }
        if (usrname.length <= 30 && usrname.length >= 6) {
            state.isBetweenLengthOf6and30 = { ...username.isBetweenLengthOf6and30, value: true }
        } else {
            state.isBetweenLengthOf6and30 = { ...username.isBetweenLengthOf6and30, value: false }
        }

        const regex = new RegExp('^[a-zA-Z0-9_.]*$')
        if (regex.test(usrname)) {
            state.hasOnlyAllowedChars = { ...username.hasOnlyAllowedChars, value: true }
        } else {
            state.hasOnlyAllowedChars = { ...username.hasOnlyAllowedChars, value: false }
        }

        const alphanumericregex = new RegExp('[a-zA-Z0-9]')
        if (alphanumericregex.test(usrname[0]) && alphanumericregex.test(usrname[usrname.length - 1])) {
            state.doesNotStartOrEndWithSpecialChars = {
                ...username.doesNotStartOrEndWithSpecialChars,
                value: true,
            }
        } else {
            state.doesNotStartOrEndWithSpecialChars = {
                ...username.doesNotStartOrEndWithSpecialChars,
                value: false,
            }
        }
        setU(state)
        if (
            state.doesNotStartOrEndWithSpecialChars.value &&
            state.hasOnlyAllowedChars.value &&
            state.isBetweenLengthOf6and30.value
        ) {
            generate_username_timeout(usrname)
        }
    }

    const testSpecialChar = (pass: string) => {
        const specialChars = ['@', '$', '!', '%', '*', '#', '?', '&']
        let hasSpecialChar = false
        specialChars.forEach((char) => {
            if (pass.indexOf(char) >= 0) {
                hasSpecialChar = true
            }
        })
        return hasSpecialChar
    }

    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pswd = e.target.value
        if (pswd.length === 0) {
            setP(defaultPasswordState)
            return
        }
        const state = { ...defaultPasswordState, str: pswd }
        if (pswd.length <= 100 && pswd.length >= 8) {
            state.isBetweenLengthOf8and100 = { ...password.isBetweenLengthOf8and100, value: true }
        } else {
            state.isBetweenLengthOf8and100 = { ...password.isBetweenLengthOf8and100, value: false }
        }
        const alphaRegex = new RegExp('[a-zA-Z]')
        const numericRegex = new RegExp('.*[0-9].*')

        if (alphaRegex.test(pswd)) {
            state.hasAtLeastOneAlpha = { ...password.hasAtLeastOneAlpha, value: true }
        } else {
            state.hasAtLeastOneAlpha = { ...password.hasAtLeastOneAlpha, value: false }
        }

        if (numericRegex.test(pswd)) {
            state.hasAtLeastOneNumeric = { ...password.hasAtLeastOneNumeric, value: true }
        } else {
            state.hasAtLeastOneNumeric = { ...password.hasAtLeastOneNumeric, value: false }
        }

        if (testSpecialChar(pswd)) {
            state.hasSpecialCharacter = { ...password.hasSpecialCharacter, value: true }
        } else {
            state.hasSpecialCharacter = { ...password.hasSpecialCharacter, value: false }
        }
        setP(state)
    }

    const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await createUser(username.str, password.str, email.str)
        if (response) {
            useAuthStore.setState({ user: response })
            setFinalLogin(true)
        }
    }

    return [
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
        finalLogin,
    ] as const
}

export default useRegister
