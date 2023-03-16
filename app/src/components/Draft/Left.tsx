import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { startDraft } from 'utils/api/draft'
import { Button, FontRubik, styled } from 'utils/theme'
import { motion, useScroll } from 'framer-motion'

type Props = {
    draft: DraftInformationType
    setSelectedDraftedPlayer: (PlayerID: number) => void
}

const RoundPickContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 2.2rem;
    align-items: center;
    padding: 0.2rem 0rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.dark4};
    &:first-child {
        margin-right: 0.3rem;
    }
`

const RoundPickNumber = styled(FontRubik)`
    color: ${({ theme }) => theme.colors.orange1};
    font-weight: 700;
    font-size: 0.88rem;
`

const RoundPickTitle = styled.div`
    font-size: 0.62rem;
    color: ${({ theme }) => theme.colors.light3};
    font-weight: 500;
`
const RoundPickWrapper = styled.div`
    display: flex;
`

function getDraftPick(current_pick: number, num_teams: number) {
    const current_round = Math.ceil(current_pick / num_teams) // Calculate the current round
    const current_pick_in_round = current_pick % num_teams || num_teams // Calculate the current pick number in the round

    return `Round ${current_round} Pick ${current_pick_in_round}`
}

const MAX_HEIGHT_PLAYER_ELEMENT = 50.362

const Left: React.FC<Props> = ({ draft, setSelectedDraftedPlayer }) => {
    const [timer, setTimer] = useState<null | number>(null)
    const [interval, setI] = useState<NodeJS.Timer>()

    const [pickViewToggle, setPickViewToggle] = useState(true)

    // number of picks per team is defaulted to 12 and currently not adjustable
    const number_of_total_picks = Math.max(...draft.pick_numbers)

    const ref = useRef<any>()

    useEffect(() => {
        const { clientHeight } = ref.current
        const half_height = clientHeight / 2
        const offset_height = Math.floor(half_height / MAX_HEIGHT_PLAYER_ELEMENT)
        if (MAX_HEIGHT_PLAYER_ELEMENT * draft.all_picks.length > half_height) {
            ref.current.scrollTo(
                0,
                MAX_HEIGHT_PLAYER_ELEMENT * draft.all_picks.length - offset_height * MAX_HEIGHT_PLAYER_ELEMENT
            )
        } else {
            ref.current.scrollTo(0, 0)
        }
    }, [draft.all_picks])

    useEffect(() => {
        if (pickViewToggle) {
            const { clientHeight } = ref.current
            const half_height = clientHeight / 2
            const offset_height = Math.floor(half_height / MAX_HEIGHT_PLAYER_ELEMENT)
            if (MAX_HEIGHT_PLAYER_ELEMENT * draft.all_picks.length > half_height) {
                ref.current.scrollTo(
                    0,
                    MAX_HEIGHT_PLAYER_ELEMENT * draft.all_picks.length - offset_height * MAX_HEIGHT_PLAYER_ELEMENT
                )
            } else {
                ref.current.scrollTo(0, 0)
            }
        }
    }, [pickViewToggle])

    const parseRoundPick = (str: string) => {
        const spl = str.split(' ')
        return (
            <RoundPickWrapper>
                <RoundPickContainer>
                    <RoundPickNumber>{spl[1]}</RoundPickNumber>
                    <RoundPickTitle>RD</RoundPickTitle>
                </RoundPickContainer>
                <RoundPickContainer>
                    <RoundPickNumber>{spl[3]}</RoundPickNumber>
                    <RoundPickTitle>PCK</RoundPickTitle>
                </RoundPickContainer>
            </RoundPickWrapper>
        )
    }

    useEffect(() => {
        if (interval) {
            clearInterval(interval)
            setI(undefined)
            setTimer(null)
        }
        if (draft.time_till_next_pick) {
            const i = setInterval(() => {
                const date = new Date()
                //@ts-ignore
                const future = new Date(draft.time_till_next_pick)
                const diff = differenceInSeconds(future, date)
                if (diff > draft.userforgame.game.draft_interval_time) {
                    setTimer(draft.userforgame.game.draft_interval_time)
                } else {
                    setTimer(diff)
                }
            }, 1000)

            setI(i)
        } else {
            clearInterval(interval)
            setI(undefined)
            setTimer(null)
        }

        return () => clearInterval(interval)
    }, [draft.time_till_next_pick])
    return (
        <Container>
            {draft.draft_ended ? (
                <DraftLeftInfo>
                    <DraftEndedInfo>
                        <BotInfo>DRAFT ENDED</BotInfo>
                    </DraftEndedInfo>
                </DraftLeftInfo>
            ) : draft.draft_started && draft.is_player_turn ? (
                <DraftLeftInfo>
                    <TimerWrapper>
                        <TimerInfo>YOU ARE PICKING</TimerInfo>
                        <Timer>{timer}</Timer>
                        <TimerIndicatorWrapper>
                            {draft.is_player_turn && (
                                <TimerIndicator
                                    initial={{ width: '0%' }}
                                    animate={{
                                        width: `${((timer ?? 0) / draft.userforgame.game.draft_interval_time) * 100}%`,
                                    }}
                                ></TimerIndicator>
                            )}
                        </TimerIndicatorWrapper>
                    </TimerWrapper>
                </DraftLeftInfo>
            ) : draft.draft_started && !draft.is_player_turn ? (
                <DraftLeftInfo>
                    <BotInfo>BOT IS PICKING</BotInfo>
                </DraftLeftInfo>
            ) : (
                <DraftLeftInfo>
                    <StartButton onClick={() => startDraft(draft.draft_id)}>Start</StartButton>
                </DraftLeftInfo>
            )}

            <PickViewWrapper>
                <PickViewButton selected={pickViewToggle} onClick={() => setPickViewToggle(true)}>
                    ALL PICKS
                </PickViewButton>
                <PickViewButton selected={!pickViewToggle} onClick={() => setPickViewToggle(false)}>
                    MY PICKS
                </PickViewButton>
            </PickViewWrapper>

            <PickWrapper ref={ref}>
                {pickViewToggle
                    ? Array.from({ length: number_of_total_picks }).map((_, i) => (
                          <PlayerContainer
                              key={draft.all_picks[i]?.PlayerID ?? i}
                              is_player_pick={draft.pick_numbers.includes(i + 1)}
                              onClick={() => setSelectedDraftedPlayer(draft.all_picks[i]?.PlayerID ?? -1)}
                          >
                              {/* there's a render here occuring every second */}
                              <NumberSpan is_player_pick={draft.pick_numbers.includes(i + 1)}>{i + 1}</NumberSpan>
                              <NameContainer>
                                  <Name>{draft.all_picks[i]?.s_name ?? ''}</Name>
                                  <PickedBy is_player_pick={draft.pick_numbers.includes(i + 1)}>
                                      {!draft.all_picks[i]?.type
                                          ? ''
                                          : draft.all_picks[i]?.type === 'COMPUTER_PICK'
                                          ? 'Picked By AndrewBot'
                                          : 'Picked By You'}
                                  </PickedBy>
                              </NameContainer>

                              {parseRoundPick(getDraftPick(i + 1, draft.userforgame.game.numberOfTeamsToSimul))}
                          </PlayerContainer>
                      ))
                    : Array.from({ length: draft.pick_numbers.length }).map((_, i) => (
                          <PlayerContainer
                              key={draft.picks[i]?.PlayerID ?? i}
                              is_player_pick={true}
                              onClick={() => setSelectedDraftedPlayer(draft.picks[i]?.PlayerID ?? -1)}
                          >
                              {/* there's a render here occuring every second */}
                              <NumberSpan is_player_pick={true}>{draft.pick_numbers[i]}</NumberSpan>
                              <NameContainer>
                                  <Name>{draft.picks[i]?.s_name ?? ''}</Name>
                                  <PickedBy is_player_pick={true}>
                                      {!draft.picks[i]?.type
                                          ? ''
                                          : draft.picks[i]?.type === 'COMPUTER_PICK'
                                          ? 'Picked By AndrewBot'
                                          : 'Picked By You'}
                                  </PickedBy>
                              </NameContainer>

                              {parseRoundPick(
                                  getDraftPick(draft.pick_numbers[i], draft.userforgame.game.numberOfTeamsToSimul)
                              )}
                          </PlayerContainer>
                      ))}
            </PickWrapper>
        </Container>
    )
}

export default Left

const DraftEndedInfo = styled.div`
    display: flex;
    flex-direction: column; ;
`

const BotInfo = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.light25};
`

const TimerIndicatorWrapper = styled(motion.div)`
    height: 0.3rem;
    width: 100%;
`

const TimerIndicator = styled(motion.div)`
    height: 0.3rem;
    background-color: ${({ theme }) => theme.colors.orange1};
    border-radius: 4px;
`

const Timer = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    height: 1.8rem;
`

const TimerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const TimerInfo = styled.div`
    flex-grow: 1;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.light4};
    margin-bottom: 0.2rem;
`

const PickViewWrapper = styled.div`
    display: flex;
    padding: 0.5rem 0rem;
`

type PickViewButtonProps = {
    selected: boolean
}

const PickViewButton = styled.div<PickViewButtonProps>`
    padding: 0.5rem 1rem;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark4)};
    color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light3)};
    cursor: pointer;
    margin-right: 0.5rem;
    border-radius: 4px;
    font-weight: 700;
    transition-duration: 200ms;
    transition-timing-function: ease;
    font-size: 0.9rem;
    user-select: none;
    user-select: none;
    user-select: none;

    &:hover {
        background-color: ${({ selected, theme }) => (selected ? theme.colors.dark2 : theme.colors.dark3)};
        color: ${({ theme, selected }) => (selected ? theme.colors.light2 : theme.colors.light25)};
    }
`

const StartButton = styled(Button)`
    font-weight: 600;
    font-size: 1.1rem;
`

const DraftLeftInfo = styled.div`
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PickWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    overflow-x: visible;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    padding-bottom: 30rem;
    position: relative;
`

const CurrentPickIndicator = styled(motion.div)`
    position: absolute;
    width: 3rem;
    left: -3rem;
`

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`

const PickedBy = styled.div<PlayerContainerProps>`
    font-size: 0.88rem;
    font-weight: 400;
    color: ${({ theme, is_player_pick }) => (is_player_pick ? theme.colors.dark1 : theme.colors.light4)};
`

const NumberSpan = styled.div<PlayerContainerProps>`
    color: ${({ theme, is_player_pick }) => (is_player_pick ? theme.colors.blue1 : theme.colors.orange1)};
    font-size: 1.1rem;
    font-weight: 600;
`

const Name = styled.div``

const InfoText = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
`

const PlayerElementLeft = styled.div`
    display: flex;
    font-weight: 600;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 0.8rem;
    height: 100%;
`

type PlayerContainerProps = {
    is_player_pick: boolean
}

const PlayerContainer = styled.div<PlayerContainerProps>`
    max-height: ${() => `${MAX_HEIGHT_PLAYER_ELEMENT}px`};
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
    font-weight: 500;
    background-color: ${({ theme, is_player_pick }) => (is_player_pick ? theme.colors.light25 : theme.colors.dark3)};
    color: ${({ theme, is_player_pick }) => (is_player_pick ? theme.colors.dark4 : theme.colors.light2)};
    border-radius: 4px;
    padding: 0.35rem 0.5rem;
    font-size: 1rem;
    justify-content: space-between;
    width: 20rem;
    transition-timing-function: ease;
    transition-duration: 100ms;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme, is_player_pick }) =>
            is_player_pick ? theme.colors.light1 : theme.colors.dark25};
    }
`
const DraftedNumber = styled(FontRubik)`
    font-size: 1.3rem;
    font-weight: bold;
    width: 2.2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.orange1};
`
