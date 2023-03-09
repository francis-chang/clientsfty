import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { startDraft } from 'utils/api/draft'
import { FontRubik, styled } from 'utils/theme'

type Props = {
    draft: DraftInformationType
}

const Left: React.FC<Props> = ({ draft }) => {
    const [timer, setTimer] = useState<null | number>(null)
    const [interval, setI] = useState<NodeJS.Timer>()

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
            <button onClick={() => startDraft(draft.draft_id)}>Start</button>
            <div style={{ fontSize: '2rem' }}>{timer}</div>
            {draft.all_picks.map((pick) => (
                <PlayerContainer key={pick.PlayerID}>
                    <DraftedNumber>{pick.picked_at}</DraftedNumber>
                    <PlayerElementLeft>
                        <Name>{pick.s_name}</Name>
                        <InfoText>{pick.info}</InfoText>
                    </PlayerElementLeft>
                </PlayerContainer>
            ))}
        </Container>
    )
}

export default Left

const Name = styled.div`
    font-weight: 700;
`

const InfoText = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.light4};
`

const PlayerElementLeft = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-right: 0.8rem;
`
const PlayerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;

    background-color: ${({ theme }) => theme.colors.dark25};
    border-radius: 4px;
    padding: 0.5rem;
`
const DraftedNumber = styled(FontRubik)`
    font-size: 1.3rem;
    font-weight: bold;
    width: 2.2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.orange1};
`
