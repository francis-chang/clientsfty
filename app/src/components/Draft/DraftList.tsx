import React, { useEffect } from 'react'
import { FontRubik, styled } from 'utils/theme'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

type Props = {
    draftList: PlayerForDraftList[]
    setSelectedPlayer: (player: PlayerForDraftList) => void
    listView: 'SEASON' | 'FIVE'
    selectedPlayer: PlayerForDraftList | undefined
}

const ITEM_HEIGHT = 58

const DraftList: React.FC<Props> = ({ draftList, setSelectedPlayer, listView, selectedPlayer }) => {
    const Row = ({ index, style }: any) => {
        const player = draftList[index]
        const seasonAvg = draftList[index].season_averages
        const lf = draftList[index].last_five_averages

        return draftList ? (
            <Item style={style} onClick={() => setSelectedPlayer(player)}>
                <InnerItem selected={selectedPlayer?.season_averages.PlayerID === player.season_averages.PlayerID}>
                    <NameContainer>
                        <Jersey inner_color={player.team.inner_color} outer_color={player.team.outer_color}>
                            {player.Jersey}
                        </Jersey>
                        <NameAndTeam>
                            <Name>{player.s_name}</Name>
                            <Team>{player.team.City + ' ' + player.team.Name}</Team>
                        </NameAndTeam>
                    </NameContainer>
                    <StatContainer>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.Points : lf.Points}</StatNumber>
                            <StatDesc>PTS</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.Rebounds : lf.Rebounds}</StatNumber>
                            <StatDesc>REB</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.Assists : lf.Assists}</StatNumber>
                            <StatDesc>AST</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.Steals : lf.Steals}</StatNumber>
                            <StatDesc>STL</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.BlockedShots : lf.BlockedShots}</StatNumber>
                            <StatDesc>BLK</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.Turnovers : lf.Turnovers}</StatNumber>
                            <StatDesc>TOS</StatDesc>
                        </Stat>
                        <Stat>
                            <StatNumber>
                                {listView === 'SEASON' ? seasonAvg.ThreePointersMade : lf.ThreePointersMade}
                            </StatNumber>
                            <StatDesc>3PM</StatDesc>
                        </Stat>
                        <LongStat>
                            <StatNumber>{listView === 'SEASON' ? seasonAvg.pct : lf.pct}</StatNumber>
                            <StatDesc>%</StatDesc>
                        </LongStat>
                    </StatContainer>
                </InnerItem>
            </Item>
        ) : null
    }

    return (
        <Container>
            {draftList ? (
                <DraftListContainer>
                    <AutoSizer>
                        {({ height, width }) => (
                            <StyledList
                                className="list"
                                height={height}
                                itemCount={draftList.length}
                                itemSize={ITEM_HEIGHT}
                                width={width}
                            >
                                {Row}
                            </StyledList>
                        )}
                    </AutoSizer>
                </DraftListContainer>
            ) : null}
        </Container>
    )
}

export default DraftList

const StyledList = styled(List)`
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`

const StatContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
`

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    width: 3.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const LongStat = styled.div`
    display: flex;
    flex-direction: column;
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-self: flex-end; */
`

const StatNumber = styled(FontRubik)`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.light2};
`

const StatDesc = styled.div`
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.light3};
`

const NameContainer = styled.div`
    width: 15rem;
    min-width: 15rem;
    display: flex;
    align-items: center;
`

const Container = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const DraftListContainer = styled.div`
    flex-grow: 1;
    display: flex;
    width: 750px;
`

const Item = styled.div``

type InnerItemProps = {
    selected: boolean
}

const InnerItem = styled.div<InnerItemProps>`
    border-radius: 4px;
    background-color: ${({ theme, selected }) => (selected ? theme.colors.blue3 : theme.colors.dark3)};

    padding: 0rem 0.5rem;
    height: ${() => `${ITEM_HEIGHT - 6}px`};
    width: 100%;
    display: flex;
    transition-duration: 150ms;
    transition-timing-function: ease;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme, selected }) => (selected ? theme.colors.blue3 : theme.colors.dark2)};
    }
`

const InnerItemTop = styled.div`
    display: flex;
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
    font-size: 1.4rem;
    font-weight: 700;
    margin-right: 0.6rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Name = styled.div`
    font-weight: 600;
`

const Team = styled.div`
    font-size: 0.87rem;
    color: ${({ theme }) => theme.colors.light4};
`

const NameAndTeam = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
