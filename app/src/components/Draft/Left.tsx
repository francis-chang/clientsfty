import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { startDraft } from 'utils/api/draft'
import { styled } from 'utils/theme'

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
                    <div>{pick.s_name}</div>
                    <div>{pick.info}</div>
                </PlayerContainer>
            ))}
        </Container>
    )
}

export default Left

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3rem;
`
