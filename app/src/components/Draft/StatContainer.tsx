import React from 'react'
import { styled } from 'utils/theme'
import format from 'date-fns/format'

type Props = {
    selectedPlayer: PlayerForDraftList
}

const SmallSpanLeft = styled.span`
    width: 1.4rem;
    font-weight: 300;

    text-align: left;
`
const SmallSpanRight = styled.span`
    width: 1.5rem;
    font-weight: 300;

    text-align: right;
`

const TeamSpan = styled.span`
    font-weight: 600;
    width: 2.6rem;

    text-align: center;
`

const DateSpan = styled.span`
    flex-grow: 1;
`

const PlayerStatsCenterConsole: React.FC<Props> = ({ selectedPlayer }) => {
    const parseVsAndDate = (date: string, vs: string) => {
        return (
            <>
                <SmallSpanRight>vs</SmallSpanRight>
                <TeamSpan>{vs}</TeamSpan>
                <SmallSpanLeft>on</SmallSpanLeft>
                <DateSpan>{format(new Date(date), 'MMM d').toUpperCase()}</DateSpan>
            </>
        )
    }

    return (
        <StatsTable>
            <thead>
                <Tr>
                    <StatsTitle colSpan={12}> AVERAGES</StatsTitle>
                </Tr>
                <Tr>
                    <Th></Th>
                    <Th>PTS</Th>
                    <Th>REB</Th>
                    <Th>AST</Th>
                    <Th>STL</Th>
                    <Th>BLK</Th>
                    <Th>TOS</Th>
                    <Th>3PM</Th>
                    <Th>FGM/A</Th>
                    <Th>3PM/A</Th>
                    <Th>FTM/A</Th>
                    <Th>FAN</Th>
                </Tr>
            </thead>
            <tbody>
                <Tr>
                    <BoldTd>
                        <Spacer />
                        SEASON AVG
                    </BoldTd>
                    <Td>{selectedPlayer.season_averages.Points}</Td>
                    <Td>{selectedPlayer.season_averages.Rebounds}</Td>
                    <Td>{selectedPlayer.season_averages.Assists}</Td>
                    <Td>{selectedPlayer.season_averages.Steals}</Td>
                    <Td>{selectedPlayer.season_averages.BlockedShots}</Td>
                    <Td>{selectedPlayer.season_averages.Turnovers}</Td>
                    <Td>{selectedPlayer.season_averages.ThreePointersMade}</Td>
                    <Td>{`${selectedPlayer.season_averages.FieldGoalsMade}/${selectedPlayer.season_averages.FieldGoalsAttempted}`}</Td>
                    <Td>{`${selectedPlayer.season_averages.ThreePointersMade}/${selectedPlayer.season_averages.ThreePointersAttempted}`}</Td>
                    <Td>{`${selectedPlayer.season_averages.FreeThrowsMade}/${selectedPlayer.season_averages.FreeThrowsAttempted}`}</Td>
                    <Td>{selectedPlayer.season_averages.FantasyPoints}</Td>
                </Tr>
                <Tr>
                    <BoldTd>
                        <Spacer />
                        LAST 5 AVG
                    </BoldTd>
                    <Td>{selectedPlayer.last_five_averages.Points}</Td>
                    <Td>{selectedPlayer.last_five_averages.Rebounds}</Td>
                    <Td>{selectedPlayer.last_five_averages.Assists}</Td>
                    <Td>{selectedPlayer.last_five_averages.Steals}</Td>
                    <Td>{selectedPlayer.last_five_averages.BlockedShots}</Td>
                    <Td>{selectedPlayer.last_five_averages.Turnovers}</Td>
                    <Td>{selectedPlayer.last_five_averages.ThreePointersMade}</Td>
                    <Td>{`${selectedPlayer.last_five_averages.FieldGoalsMade}/${selectedPlayer.last_five_averages.FieldGoalsAttempted}`}</Td>
                    <Td>{`${selectedPlayer.last_five_averages.ThreePointersMade}/${selectedPlayer.last_five_averages.ThreePointersAttempted}`}</Td>
                    <Td>{`${selectedPlayer.last_five_averages.FreeThrowsMade}/${selectedPlayer.last_five_averages.FreeThrowsAttempted}`}</Td>
                    <Td>{selectedPlayer.last_five_averages.FantasyPoints}</Td>
                </Tr>
            </tbody>
            <thead>
                <tr>
                    <StatsTitle colSpan={12}>LAST 7 GAMES</StatsTitle>
                </tr>
                <tr>
                    <Th></Th>
                    <Th>PTS</Th>
                    <Th>REB</Th>
                    <Th>AST</Th>
                    <Th>STL</Th>
                    <Th>BLK</Th>
                    <Th>TOS</Th>
                    <Th>3PM</Th>
                    <Th>FGM/A</Th>
                    <Th>3PM/A</Th>
                    <Th>FTM/A</Th>
                    <Th>FAN</Th>
                </tr>
            </thead>
            <tbody>
                {selectedPlayer.statlines.map((statline) =>
                    statline.InjuryStatus === 'Out' ? (
                        <Tr key={statline.game.nba_day}>
                            <BoldTd>{parseVsAndDate(statline.game.nba_day, statline.opponent_team.Key)}</BoldTd>
                            <DNP colSpan={11}>DNP</DNP>
                        </Tr>
                    ) : (
                        <Tr key={statline.game.nba_day}>
                            <BoldTd>{parseVsAndDate(statline.game.nba_day, statline.opponent_team.Key)}</BoldTd>
                            <Td>{statline.Points}</Td>
                            <Td>{statline.Rebounds}</Td>
                            <Td>{statline.Assists}</Td>
                            <Td>{statline.Steals}</Td>
                            <Td>{statline.BlockedShots}</Td>
                            <Td>{statline.Turnovers}</Td>
                            <Td>{statline.ThreePointersMade}</Td>
                            <Td>{`${statline.FieldGoalsMade}/${statline.FieldGoalsAttempted}`}</Td>
                            <Td>{`${statline.ThreePointersMade}/${statline.ThreePointersAttempted}`}</Td>
                            <Td>{`${statline.FreeThrowsMade}/${statline.FreeThrowsAttempted}`}</Td>
                            <Td>{statline.FantasyPoints}</Td>
                        </Tr>
                    )
                )}
            </tbody>
        </StatsTable>
    )
}

export default PlayerStatsCenterConsole

const Spacer = styled.span`
    width: 0.5rem;
`
const DNP = styled.td`
    border: ${({ theme }) => `0.5px solid ${theme.colors.dark25}`};
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.colors.dark3};
    padding: 0.5rem 0.3rem;
    text-align: center;
    font-weight: 600;
`

/**
 * DO LATER:
 * Currently there are column layout shifts with the table when switching players
 * this is because numbers are not always the same width (eg 11.2 vs 9)
 * to fix this, you must add arrange the columns with a fixed width
 * this is possible because CenterConsole itself is a fixed width
 */

const StatsTitle = styled.td`
    border-collapse: collapse;
    color: ${({ theme }) => theme.colors.orange0};
    padding: 0.47rem 0rem;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
`

const StatsTable = styled.table`
    border: ${({ theme }) => `0.5px solid ${theme.colors.dark25}`};
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem auto 0.5rem;
    width: 100%;
`
const Th = styled.th`
    border: ${({ theme }) => `0.5px solid ${theme.colors.dark25}`};
    border-collapse: collapse;
    padding: 0.5rem 0.3rem;
`

const BoldTd = styled.td`
    font-weight: 700;
    border: ${({ theme }) => `0.5px solid ${theme.colors.dark25}`};
    border-collapse: collapse;
    display: flex;
    padding: 0.5rem 0rem;
`

const Tr = styled.tr``

const Td = styled.td`
    padding: 0.5rem 0.3rem;
    border: ${({ theme }) => `0.5px solid ${theme.colors.dark25}`};
    border-collapse: collapse;
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
        'Helvetica Neue', sans-serif;
    text-align: center;
`
