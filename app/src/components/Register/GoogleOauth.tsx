import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLoaderData } from 'react-router-dom'
import { gAuth } from 'utils/api/auth'
import { styled } from 'utils/theme'

type LoaderType = {
    code: string
    scope: string
}

const GoogleOauth: React.FC = () => {
    const { code, scope } = useLoaderData() as LoaderType
    const gAuthQuery = useQuery('gauth', () => gAuth(code, scope))

    useEffect(() => {
        //@ts-ignore

        console.log(gAuthQuery)
    }, [])
    return (
        <Container>
            <div>hi</div>
        </Container>
    )
}

export default GoogleOauth

const Container = styled.div``
