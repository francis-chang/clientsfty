type ValueAndDescription = {
    value: boolean
    description: string
}

type UsernameCreateField = {
    str: string
    isBetweenLengthOf6and30: ValueAndDescription
    hasOnlyAllowedChars: ValueAndDescription
    doesNotStartOrEndWithSpecialChars: ValueAndDescription
    usernameNotTaken: ValueAndDescription
}

type PasswordCreateField = {
    str: string
    hasAtLeastOneAlpha: ValueAndDescription
    hasAtLeastOneNumeric: ValueAndDescription
    isBetweenLengthOf8and100: ValueAndDescription
    hasSpecialCharacter: ValueAndDescription
}

type EmailCreateField = {
    str: string
    isValidEmail: ValueAndDescription
    isUniqueEmail: ValueAndDescription
}