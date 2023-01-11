import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'
import useMockDraft from './useMockDraft'
import { FixedSizeList as List } from 'react-window'

const MockDraft: React.FC = () => {
    const [data, isLoading, state] = useMockDraft()

    const Row = ({ index, style }: any) => <div style={style}>{data![index].player.s_name}</div>

    return (
        <Container>
            {data ? (
                <List height={1000} itemCount={data.length} itemSize={35} width={200}>
                    {Row}
                </List>
            ) : null}
            <Div>{state.pick}</Div>
            <ul>
                {state.teams.map((t) => (
                    <li>{t.name}</li>
                ))}
            </ul>
        </Container>
    )
}

export default MockDraft

const Container = styled.div`
    display: flex;
`

const Div = styled.div``
