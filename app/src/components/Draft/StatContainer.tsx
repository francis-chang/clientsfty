import React from 'react'
import { styled } from 'utils/theme'

type Props = {
    selectedPlayer: PlayerForDraftList
}

const PlayerStatsCenterConsole: React.FC<Props> = ({ selectedPlayer }) => {
    return (
        <StatsContainer>
            <StatTitle>SEASON AVERAGES</StatTitle>
            <StatContainer>
                <TopStat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.Points}</StatNumber>
                        <StatDesc>PTS</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.Rebounds}</StatNumber>
                        <StatDesc>REB</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.Assists}</StatNumber>
                        <StatDesc>AST</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.Steals}</StatNumber>
                        <StatDesc>STL</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.BlockedShots}</StatNumber>
                        <StatDesc>BLK</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.Turnovers}</StatNumber>
                        <StatDesc>TOS</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.ThreePointersMade}</StatNumber>
                        <StatDesc>3PM</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.season_averages.FantasyPoints}</StatNumber>
                        <StatDesc>FAN</StatDesc>
                    </Stat>
                </TopStat>
                <BottomStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.season_averages.FieldGoalsMade}/${selectedPlayer.season_averages.FieldGoalsAttempted}`}</BottomStatNumber>
                        <StatDesc>FGM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.season_averages.FreeThrowsMade}/${selectedPlayer.season_averages.FreeThrowsAttempted}`}</BottomStatNumber>
                        <StatDesc>FTM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.season_averages.ThreePointersMade}/${selectedPlayer.season_averages.ThreePointersAttempted}`}</BottomStatNumber>
                        <StatDesc>3PM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{selectedPlayer.season_averages.pct}</BottomStatNumber>
                        <StatDesc>%</StatDesc>
                    </LongStat>
                </BottomStat>
            </StatContainer>
            <StatTitle>LAST 5 GAME AVERAGES</StatTitle>
            <StatContainer>
                <TopStat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.Points}</StatNumber>
                        <StatDesc>PTS</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.Rebounds}</StatNumber>
                        <StatDesc>REB</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.Assists}</StatNumber>
                        <StatDesc>AST</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.Steals}</StatNumber>
                        <StatDesc>STL</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.BlockedShots}</StatNumber>
                        <StatDesc>BLK</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.Turnovers}</StatNumber>
                        <StatDesc>TOS</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.ThreePointersMade}</StatNumber>
                        <StatDesc>3PM</StatDesc>
                    </Stat>
                    <Stat>
                        <StatNumber>{selectedPlayer.last_five_averages.FantasyPoints}</StatNumber>
                        <StatDesc>FAN</StatDesc>
                    </Stat>
                </TopStat>
                <BottomStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.last_five_averages.FieldGoalsMade}/${selectedPlayer.last_five_averages.FieldGoalsAttempted}`}</BottomStatNumber>
                        <StatDesc>FGM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.last_five_averages.FreeThrowsMade}/${selectedPlayer.last_five_averages.FreeThrowsAttempted}`}</BottomStatNumber>
                        <StatDesc>FTM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{`${selectedPlayer.last_five_averages.ThreePointersMade}/${selectedPlayer.last_five_averages.ThreePointersAttempted}`}</BottomStatNumber>
                        <StatDesc>3PM/A</StatDesc>
                    </LongStat>
                    <LongStat>
                        <BottomStatNumber>{selectedPlayer.last_five_averages.pct}</BottomStatNumber>
                        <StatDesc>%</StatDesc>
                    </LongStat>
                </BottomStat>
            </StatContainer>
        </StatsContainer>
    )
}

export default PlayerStatsCenterConsole

const StatTitle = styled.div`
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.orange0};
    margin-bottom: 0.5rem;
`

const TopStat = styled.div`
    flex-grow: 1;
    display: flex;

    margin-bottom: 1rem;
`

const BottomStat = styled.div`
    flex-grow: 1;
    display: flex;
`

const StatContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
    justify-content: center;
    align-items: center;
`

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    width: 3.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const LongStat = styled.div`
    display: flex;
    flex-direction: column;
    width: 6.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const StatNumber = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light2};
`

const BottomStatNumber = styled.div`
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light3};
`

const StatDesc = styled.div`
    font-size: 0.8rem;
`

const StatsContainer = styled.div`
    padding: 1rem 3.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
