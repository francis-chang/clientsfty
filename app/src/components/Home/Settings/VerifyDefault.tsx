import React from 'react'
import { styled } from 'utils/theme'
import { FormTitle, FormDescription, FormElement, FormElementElement, FormSubtitle } from '../FormElements'

const VerifyDefault: React.FC = () => {
    return (
        <FormElement>
            <FormDescription>
                <FormTitle important={false}>Verify Account</FormTitle>
            </FormDescription>
            <FormElementElement>
                <Title>Your account is verified</Title>
            </FormElementElement>
        </FormElement>
    )
}

export default VerifyDefault

const Title = styled.div`
    font-size: 1.1rem;
`

type IconContainerProps = {
    waiting: boolean
}
