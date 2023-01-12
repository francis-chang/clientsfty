import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'
import useMockDraft from './useMockDraft'
import { FixedSizeList as List } from 'react-window'
import { useQuery } from 'react-query'
import { draft } from 'utils/api/redis_stats'

const MockDraft: React.FC = () => {
    const [state, onClick, draftListQuery, setPicked] = useMockDraft()

    const Row = ({ index, style }: any) => (
        <div onClick={() => setPicked(draftListQuery.data![index])} style={style}>
            {draftListQuery.data![index].player.s_name}
        </div>
    )

    return (
        <Container>
            {draftListQuery.data ? (
                <List height={1000} itemCount={draftListQuery.data.length} itemSize={35} width={200}>
                    {Row}
                </List>
            ) : null}

            <TeamContainer>
                {state.teams.map((t) => (
                    <div key={t.name}>
                        <div>{t.name}</div>
                        <ul>
                            {t.team.map((player: any) => (
                                <li style={{ paddingLeft: '3rem' }} key={player.PlayerID}>
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </TeamContainer>
            <button onClick={onClick}>draft</button>
        </Container>
    )
}

export default MockDraft

const TeamContainer = styled.div`
    margin-left: 3rem;
    margin-right: 5rem;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
`

const Div = styled.div``
