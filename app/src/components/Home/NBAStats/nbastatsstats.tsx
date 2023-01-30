import React, { useEffect, useState } from 'react'
import { getMockDraftList } from 'utils/api/redis_stats'
import { styled } from 'utils/theme'

const NBAStats: React.FC = () => {
    const [draftList, setDraftList] = useState<MockDraftPlayer[]>()
    useEffect(() => {
        ;(async () => {
            const response = await getMockDraftList()
            if (response) {
                setDraftList(response)
            }
        })()
    }, [])
    return (
        <Container>
            <PlayerContainer>
                {draftList &&
                    draftList.slice(0, 10).map((player) => (
                        <PlayerElement key={player.PlayerID}>
                            <PlayerTitleContainer>
                                <Jersey
                                    inner_color={player.player.team.inner_color}
                                    outer_color={player.player.team.outer_color}
                                >
                                    {player.player.Jersey}
                                </Jersey>
                                <PlayerNameContainer>
                                    <PlayerName>{`${player.player.FirstName} ${player.player.LastName}`}</PlayerName>
                                    <PlayerTeamName>{`${player.player.team.City} ${player.player.team.Name}`}</PlayerTeamName>
                                </PlayerNameContainer>
                            </PlayerTitleContainer>
                            <StatsContainer>
                                <Stat>
                                    <StatNumber>{player.Points}</StatNumber>
                                    <StatDesc>PTS</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.Rebounds}</StatNumber>
                                    <StatDesc>REB</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.Assists}</StatNumber>
                                    <StatDesc>AST</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.Steals}</StatNumber>
                                    <StatDesc>STL</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.BlockedShots}</StatNumber>
                                    <StatDesc>BLK</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.Turnovers}</StatNumber>
                                    <StatDesc>TOS</StatDesc>
                                </Stat>
                                <Stat>
                                    <StatNumber>{player.FantasyPoints}</StatNumber>
                                    <StatDesc>FAN</StatDesc>
                                </Stat>
                            </StatsContainer>
                        </PlayerElement>
                    ))}
            </PlayerContainer>
        </Container>
    )
}

export default NBAStats

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    width: 3.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const StatNumber = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light2};
`

const StatDesc = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light4};
`

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1.5rem 0rem 0.8rem 0rem;
`

const PlayerTitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const PlayerNameContainer = styled.div``

const PlayerTeamName = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light4};
`
const PlayerName = styled.div`
    margin-bottom: 0.3rem;
`

type JerseyProps = {
    inner_color: string
    outer_color: string
}

const Jersey = styled.div<JerseyProps>`
    background-color: ${({ outer_color }) => outer_color};
    color: ${({ inner_color }) => inner_color};
    padding: 0.3rem;
    border-radius: 4px;
    font-size: 1.3rem;
    font-weight: 700;
    margin-right: 0.8rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    margin-left: 240px;
    display: flex;
    flex-direction: column;
`

const PlayerContainer = styled.div`
    width: 600px;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
`

const PlayerElement = styled.div`
    padding: 1rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.dark2}`};
`
