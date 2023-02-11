import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { findDraft } from 'utils/api/game'

export default (draft_id: number) => {
    const [draft, setDraft] = useState<DraftInformationType>()

    const [loaded, setLoaded] = useState(false)

    const draftQuery = useQuery(`draft${draft_id}`, () => findDraft(draft_id))

    useEffect(() => {
        if (draftQuery.data) {
            setDraft(draftQuery.data)
            setTimeout(() => {
                setLoaded(true)
            }, 3000)
        }
    }, [draftQuery.data])

    // const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })
    return [draft, loaded] as const
}
