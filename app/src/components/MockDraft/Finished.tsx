import React, { useEffect } from 'react'
import { styled } from 'utils/theme'

type Props = {
    data: TeamElement[] | undefined
}

const Finished: React.FC<Props> = ({ data }) => {
    return data ? (
        <Container>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Total</Th>
                        <Th>PTS</Th>
                        <Th>REB</Th>
                        <Th>AST</Th>
                        <Th>STL</Th>
                        <Th>BLK</Th>
                        <Th>TOS</Th>
                        <Th>FG%</Th>
                        <Th>FT%</Th>
                        <Th>3PM</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((team) => (
                        <Tr key={team.name}>
                            <Th>{team.name}</Th>
                            <Th>{team.rankings.total}</Th>
                            <Th>{team.rankings.Points}</Th>
                            <Th>{team.rankings.Rebounds}</Th>
                            <Th>{team.rankings.Assists}</Th>
                            <Th>{team.rankings.Steals}</Th>
                            <Th>{team.rankings.BlockedShots}</Th>
                            <Th>{team.rankings.Turnovers}</Th>
                            <Th>{team.rankings.fgp}</Th>
                            <Th>{team.rankings.ftp}</Th>
                            <Th>{team.rankings.ThreePointersMade}</Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    ) : (
        <Container />
    )
}

export default Finished

const Container = styled.div`
    margin: 0 auto;
`
const Table = styled.table``

const Tr = styled.tr``

const Th = styled.th``
const Td = styled.td``

const Thead = styled.thead``

const Tbody = styled.tbody``
