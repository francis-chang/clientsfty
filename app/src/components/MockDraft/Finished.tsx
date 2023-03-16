import React, { useEffect, useState } from 'react'
import { styled } from 'utils/theme'

type Props = {
    data: TeamElement[] | undefined
}

function getOrdinal(n: number) {
    let ordinal = ''
    const lastDigit = n % 10
    if (n > 10) {
        ordinal = 'th'
    } else if (lastDigit === 1) {
        ordinal = 'st'
    } else if (lastDigit === 2) {
        ordinal = 'nd'
    } else if (lastDigit === 3) {
        ordinal = 'rd'
    } else {
        ordinal = 'th'
    }
    return n + ordinal
}

function justOrdinal(n: number) {
    const lastDigit = n % 10
    if (n > 10) {
        return 'th'
    } else if (lastDigit === 1) {
        return 'st'
    } else if (lastDigit === 2) {
        return 'nd'
    } else if (lastDigit === 3) {
        return 'rd'
    } else {
        return 'th'
    }
}

const Finished: React.FC<Props> = ({ data }) => {
    const [selected, setSelected] = useState<TeamElement>()

    useEffect(() => {
        if (data) {
            console.log(data)
            setSelected(data.find((p) => p.name === 'YOU'))
        }
    }, [data])

    return data ? (
        <Container>
            <Title>
                You came in <Span>{getOrdinal(data.findIndex((p) => p.name === 'YOU') + 1)}</Span>
            </Title>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <NameTh>Name</NameTh>
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
                                <NameTd>{team.name}</NameTd>
                                <Td>{team.rankings.total}</Td>
                                <Td>{team.rankings.Points} </Td>
                                <Td>{team.rankings.Rebounds} </Td>
                                <Td>{team.rankings.Assists} </Td>
                                <Td>{team.rankings.Steals} </Td>
                                <Td>{team.rankings.BlockedShots} </Td>
                                <Td>{team.rankings.Turnovers} </Td>
                                <Td>{team.rankings.fgp} </Td>
                                <Td>{team.rankings.ftp} </Td>
                                <Td>{team.rankings.ThreePointersMade} </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Select
                onChange={(e) => setSelected(data.find((p) => p.name === e.target.value))}
                name="whatever"
                id="name"
            >
                {data.map((d) =>
                    d.name === 'YOU' ? (
                        <option value={d.name} selected>
                            {d.name}
                        </option>
                    ) : (
                        <option value={d.name}>{d.name}</option>
                    )
                )}
            </Select>

            <SelectedContainer>
                {/* {selected && {selected.totals.Points}} */}
                {selected &&
                    selected.team.map((player) => (
                        <PlayerContainer key={player.PlayerID}>
                            <PlayerName>{player.name}</PlayerName>
                            <PlayerStatlineContainer>
                                {player.statlines.map((statline) => (
                                    // @ts-ignore
                                    <PlayerStatAndVs key={statline.StatID}>
                                        <Vs>
                                            <VsText
                                                style={{ marginRight: '5px' }}
                                                // @ts-ignore
                                            >{`${statline.game.formattedDate} vs ${statline.opponent_team.Key}`}</VsText>
                                            <Img src={`./images/${statline.opponent_team.Key}.png`}></Img>
                                        </Vs>
                                        <PlayerStatline>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.Points}</PlayerStatNumber>
                                                <PlayerStatDesc>PTS</PlayerStatDesc>
                                            </PlayerStatContainer>

                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.Rebounds}</PlayerStatNumber>
                                                <PlayerStatDesc>REB</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.Assists}</PlayerStatNumber>
                                                <PlayerStatDesc>AST</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.Steals}</PlayerStatNumber>
                                                <PlayerStatDesc>STL</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.BlockedShots}</PlayerStatNumber>
                                                <PlayerStatDesc>BLK</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.Turnovers}</PlayerStatNumber>
                                                <PlayerStatDesc>TOS</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{`${statline.FieldGoalsMade}/${statline.FieldGoalsAttempted}`}</PlayerStatNumber>
                                                <PlayerStatDesc>FGM/A</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{`${statline.FreeThrowsMade}/${statline.FreeThrowsAttempted}`}</PlayerStatNumber>
                                                <PlayerStatDesc>FTM/A</PlayerStatDesc>
                                            </PlayerStatContainer>
                                            <PlayerStatContainer>
                                                <PlayerStatNumber>{statline.ThreePointersMade}</PlayerStatNumber>
                                                <PlayerStatDesc>TPM</PlayerStatDesc>
                                            </PlayerStatContainer>
                                        </PlayerStatline>
                                    </PlayerStatAndVs>
                                ))}
                            </PlayerStatlineContainer>
                        </PlayerContainer>
                    ))}
            </SelectedContainer>
        </Container>
    ) : (
        <Container />
    )
}

export default Finished

const Select = styled.select`
    max-width: 10rem;
    padding: 0.5rem;
    font-size: 1.1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
        sans-serif;
    background-color: ${({ theme }) => theme.colors.dark25};
    color: ${({ theme }) => theme.colors.light1};
    border-radius: 4px;
    margin-bottom: 0.5rem;
    outline: none;
`

const TableContainer = styled.div`
    overflow: auto;
    position: relative;

    &::-webkit-scrollbar {
        height: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 20px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.light4};
        border-radius: 20px;
    }

    /* Handle on hover */
    @media (max-width: 520px) {
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    margin-bottom: 1.5rem;
`

const PlayerContainer = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
`

const Img = styled.img`
    width: 18px;
    margin-right: 0.2rem;
`

const PlayerName = styled.div`
    font-weight: 700;
    font-size: 1.1rem;
`

const PlayerStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const PlayerStatAndVs = styled.div`
    background-color: ${({ theme }) => theme.colors.dark25};
    border-radius: 4px;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const PlayerStatDesc = styled.div`
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light4};
`

const PlayerStatNumber = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
`

const Vs = styled.div`
    width: 100%;
    padding: 0.5rem 0rem;
    background-color: ${({ theme }) => theme.colors.dark4};
    justify-content: center;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.light3};
    font-size: 0.9rem;
`

const VsText = styled.div``

const PlayerStatlineContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
`

const PlayerStatline = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
`

const SelectedContainer = styled.div``

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    @media (max-width: 520px) {
        padding: 0rem 0.5rem;
    }
`
const Table = styled.table`
    margin-bottom: 0.3rem;
    table-layout: fixed;
    max-width: 100%;
    position: relative;
    overflow-x: auto;
`

const Tr = styled.tr`
    padding: 0px;
    margin: 0px;
    &:nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.dark25};
    }
`

const Title = styled.div`
    padding: 1rem 0rem;
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 700;
`

const SubTitle = styled.div`
    margin: 0 auto;
    margin-bottom: 0.3rem;
    font-size: 1.3rem;
    font-weight: 700;
`

const Span = styled.span`
    color: ${({ theme }) => theme.colors.orange1};
`

const Th = styled.th``

const NameTh = styled.th`
    position: sticky;
    /* left: 0px; */
    left: 2px;
    background-color: ${({ theme }) => theme.colors.dark4};
    min-width: 6rem;
    width: 6rem;
`

const NameTd = styled.td`
    position: sticky;
    /* left: 0px; */
    // left 2px solves the layout shift when scrolling x
    // however 2px of overflow occurs
    left: 2px;
    background-color: ${({ theme }) => theme.colors.dark4};
    min-width: 6rem;
    width: 6rem;
    z-index: 2;
`

const Td = styled.td`
    text-align: center;
    left: 6.1rem;
    min-width: 2.8rem;
    padding: 0.25rem 0rem;
`

const Thead = styled.thead``

const Tbody = styled.tbody``
