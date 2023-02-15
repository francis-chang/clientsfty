import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDraftList } from 'utils/api/draft'
import { findDraft } from 'utils/api/game'

export default (draft_id: number) => {
    const draftQuery = useQuery(`draft${draft_id}`, () => findDraft(draft_id))
    const draftListQuery = useQuery('draftlist', getDraftList)

    const [draft, setDraft] = useState<DraftInformationType>()
    const [loaded, setLoaded] = useState(false)
    const [filteredDraftList, setFilteredDraftList] = useState<PlayerForDraftList[]>([])

    const [selectedPlayer, setSelectedPlayer] = useState<PlayerForDraftList>()

    useEffect(() => {
        if (draftQuery.data) {
            setDraft(draftQuery.data)
            setLoaded(true)
        }
    }, [draftQuery.data])

    useEffect(() => {
        if (draftListQuery.data) {
            setFilteredDraftList(draftListQuery.data)
            if (!selectedPlayer) {
                setSelectedPlayer(draftListQuery.data[0])
            }
        }
    }, [draftListQuery.data])

    // const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })
    return [draft, loaded, filteredDraftList, selectedPlayer, setSelectedPlayer] as const
}
