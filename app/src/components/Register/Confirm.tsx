import { Container, ContainerTitle } from 'components/styles'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { verify } from 'utils/api/auth'
import { styled } from 'utils/theme'

type Props = {
    user: UserType | null
}

const Confirm: React.FC<Props> = ({ user }) => {
    const [code, setCode] = useState('')

    const verifyQuery = useQuery('verify', async () => await verify(code), { enabled: false })

    useEffect(() => {
        if (code.length === 5) {
            verifyQuery.refetch()
        }
    }, [code])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            setCode(e.target.value.toUpperCase())
        }
    }

    return (
        <Container>
            <ContainerTitle>fty.gg</ContainerTitle>
            {verifyQuery.isRefetching || verifyQuery.isFetching ? (
                <div>Loading</div>
            ) : (
                <Form>
                    <Label htmlFor="confirmation">Enter Confirmation Code</Label>
                    <Input spellCheck={false} value={code} onChange={onChange} id="confirmation" />
                </Form>
            )}
        </Container>
    )
}

export default Confirm

const Subtitle = styled.div``

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Label = styled.label`
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
    font-weight: 700;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.dark3};
    outline: ${({ theme }) => `${theme.colors.light4} solid 1px`};
    color: ${({ theme }) => theme.colors.light1};
    border: none;
    padding: 0.5rem 1rem;

    border-radius: 4px;
    font-size: 2rem;
    &:focus {
        outline: ${({ theme }) => `${theme.colors.lightblue3} solid 2px`};
    }
    text-align: center;
    max-width: 200px;
    align-self: center;
`
