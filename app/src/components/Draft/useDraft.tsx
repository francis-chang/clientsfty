import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDraftList } from 'utils/api/draft'
import { findDraft } from 'utils/api/game'

const { VITE_PUSHER_CLIENT_KEY } = import.meta.env

if (!VITE_PUSHER_CLIENT_KEY) {
    console.log('PUSHER KEY NOT AVAILABLE')
}

export default (draft_id: number) => {
    const draftQuery = useQuery(`draft${draft_id}`, () => findDraft(draft_id))
    const draftListQuery = useQuery('draftlist', getDraftList)

    const [listView, setListView] = useState<'SEASON' | 'FIVE'>('SEASON')
    const [catView, setCatView] = useState<keyof PlayerForDraftListAvgs>('FantasyPoints')

    const [draft, setDraft] = useState<DraftInformationTypeWithoutUserforgame>({
        draft_id: 0,
        userforgame_id: 0,
        all_picks: [],
        picks: [],
        current_pick: 0,
        draft_ended: null,
        draft_started: null,
        is_player_turn: false,
        pick_numbers: [],
        pick_position: 0,
        status: 'NO_GAME',
        time_till_next_pick: null,
    })
    const [loaded, setLoaded] = useState(false)
    const [filteredDraftList, setFilteredDraftList] = useState<PlayerForDraftList[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerForDraftList>()

    useEffect(() => {
        const mappedIds = draft.all_picks.map((p) => p.PlayerID)
        const list = filteredDraftList.filter((element) => {
            if (mappedIds.includes(element.last_five_averages.PlayerID)) {
                return false
            } else {
                return true
            }
        })
        setFilteredDraftList(list)
    }, [draft.all_picks])

    useEffect(() => {
        const slicedView = filteredDraftList.slice()
        if (listView === 'SEASON') {
            slicedView.sort((a, b) => {
                //@ts-ignore
                return parseFloat(b.season_averages[catView]) - parseFloat(a.season_averages[catView])
            })
        } else {
            slicedView.sort((a, b) => {
                //@ts-ignore
                return parseFloat(b.last_five_averages[catView]) - parseFloat(a.last_five_averages[catView])
            })
        }

        setFilteredDraftList(slicedView)
    }, [catView])

    useEffect(() => {
        Pusher.logToConsole = true
        const pusher = new Pusher(VITE_PUSHER_CLIENT_KEY, {
            cluster: 'us2',
        })
        const channel = pusher.subscribe(`draft_${draft_id}`)
        channel.bind(
            'draft_init',
            ({
                is_player_turn,
                time_till_next_pick,
                current_pick,
            }: {
                is_player_turn: boolean
                time_till_next_pick: null | string
                current_pick: number
            }) => {
                setDraft((d) => ({ ...d, time_till_next_pick, current_pick, is_player_turn }))
            }
        )

        interface DraftPickWs {
            is_player_turn: boolean
            time_till_next_pick: null | string
            current_pick: number
            picked_player: DraftPick
        }
        channel.bind(
            'draft_player_pick',
            ({ is_player_turn, time_till_next_pick, current_pick, picked_player }: DraftPickWs) => {
                setDraft((d) => ({
                    ...d,
                    all_picks: [...d.all_picks, picked_player],
                    picks: [...d.picks, picked_player],
                    current_pick,
                    time_till_next_pick,
                    is_player_turn,
                }))
            }
        )

        channel.bind(
            'draft_computer_pick',
            ({ is_player_turn, time_till_next_pick, current_pick, picked_player }: DraftPickWs) => {
                setDraft((d) => ({
                    ...d,
                    all_picks: [...d.all_picks, picked_player],
                    current_pick,
                    time_till_next_pick,
                    is_player_turn,
                }))
            }
        )

        console.log(pusher.allChannels())

        return () => {
            channel.unsubscribe()
            pusher.unsubscribe(`draft_${draft_id}`)
        }
    }, [])

    useEffect(() => {
        if (draftQuery.data) {
            console.log(draftQuery.data)
            setDraft(draftQuery.data)
            setLoaded(true)
        }
    }, [draftQuery.data])

    useEffect(() => {
        if (draftListQuery.data) {
            const mappedIds = draft.all_picks.map((p) => p.PlayerID)

            const list = draftListQuery.data.filter((element) => {
                if (mappedIds.includes(element.last_five_averages.PlayerID)) {
                    return false
                } else {
                    return true
                }
            })

            setFilteredDraftList(list)
            if (!selectedPlayer) {
                setSelectedPlayer(draftListQuery.data[0])
            }
        }
    }, [draftListQuery.data])

    // const gameQuery = useQuery(`fantasyGame${gameId}`, () => findGame(gameId), { refetchOnWindowFocus: false })
    return [
        draft,
        loaded,
        filteredDraftList,
        selectedPlayer,
        setSelectedPlayer,
        listView,
        setListView,
        catView,
        setCatView,
    ] as const
}
